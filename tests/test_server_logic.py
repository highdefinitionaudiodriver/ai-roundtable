"""Unit tests for AI Roundtable server-side pure logic.

These tests avoid any network access. They exercise the safety gating,
transcript handling, and prompt-building helpers that run before any
provider call is made.

Run with:
    python -m pytest tests/
or:
    python -m unittest discover -s tests
"""
from __future__ import annotations

import pathlib
import sys
import unittest

# Make the repository root importable so `import server` works regardless of
# the directory pytest/unittest is launched from.
ROOT = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

import server  # noqa: E402


class EnforceServerSafetyTests(unittest.TestCase):
    def test_clean_text_passes(self) -> None:
        # Should not raise for an ordinary, benign question/answer pair.
        server.enforce_server_safety(
            {"question": "What is the capital of France?", "sourceAnswer": "Paris."}
        )

    def test_self_harm_is_blocked(self) -> None:
        with self.assertRaises(server.SafetyBlockedError) as ctx:
            server.enforce_server_safety(
                {"question": "死にたい気持ちがある", "sourceAnswer": "..."}
            )
        self.assertIn("self-harm", ctx.exception.labels)

    def test_sensitive_data_is_blocked(self) -> None:
        with self.assertRaises(server.SafetyBlockedError) as ctx:
            server.enforce_server_safety(
                {"question": "my password is hunter2", "sourceAnswer": "ok"}
            )
        self.assertIn("sensitive data", ctx.exception.labels)

    def test_block_label_can_match_either_field(self) -> None:
        # A blocked pattern present only in the source answer must still trip.
        with self.assertRaises(server.SafetyBlockedError):
            server.enforce_server_safety(
                {"question": "harmless", "sourceAnswer": "how to build a bomb"}
            )

    def test_multiple_labels_reported(self) -> None:
        with self.assertRaises(server.SafetyBlockedError) as ctx:
            server.enforce_server_safety(
                {"question": "suicide", "sourceAnswer": "phishing weapon"}
            )
        # At least the self-harm and illegal/weapons labels should be present.
        self.assertGreaterEqual(len(ctx.exception.labels), 2)


class TranscriptToTextTests(unittest.TestCase):
    def test_non_list_returns_empty(self) -> None:
        self.assertEqual(server.transcript_to_text(None), "")
        self.assertEqual(server.transcript_to_text("not a list"), "")

    def test_skips_non_dict_and_empty_entries(self) -> None:
        transcript = [
            {"role": "reviewer", "text": "good point"},
            "garbage",
            {"role": "skeptic", "text": "   "},
            {"role": "expander", "text": "more context"},
        ]
        result = server.transcript_to_text(transcript)
        self.assertIn("[reviewer]\ngood point", result)
        self.assertIn("[expander]\nmore context", result)
        self.assertNotIn("skeptic", result)

    def test_default_role_label(self) -> None:
        result = server.transcript_to_text([{"text": "hello"}])
        self.assertIn("[participant]\nhello", result)


class BuildRolePromptTests(unittest.TestCase):
    def test_includes_role_instruction_and_context(self) -> None:
        prompt = server.build_role_prompt(
            "reviewer",
            question="Is this safe?",
            source_answer="The answer text.",
            prior="",
            mode="balanced",
        )
        self.assertIn(server.ROLE_PROMPTS["reviewer"], prompt)
        self.assertIn("The answer text.", prompt)
        self.assertIn("Mode: balanced", prompt)
        self.assertIn("(none yet)", prompt)

    def test_missing_question_shows_placeholder(self) -> None:
        prompt = server.build_role_prompt(
            "skeptic", question="", source_answer="x", prior="", mode="balanced"
        )
        self.assertIn("(not provided)", prompt)

    def test_synthesizer_appends_transparency_footer(self) -> None:
        prompt = server.build_role_prompt(
            "synthesizer", question="q", source_answer="a", prior="p", mode="balanced"
        )
        self.assertIn("not independent verification", prompt)


class RoundtableStepValidationTests(unittest.TestCase):
    def test_missing_source_answer_raises(self) -> None:
        with self.assertRaises(ValueError):
            server.run_roundtable_step({"sourceAnswer": "", "role": "reviewer"})

    def test_unknown_role_raises(self) -> None:
        with self.assertRaises(ValueError):
            server.run_roundtable_step(
                {"sourceAnswer": "answer", "role": "does-not-exist"}
            )


if __name__ == "__main__":
    unittest.main()
