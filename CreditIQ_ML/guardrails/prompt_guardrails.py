import re

INJECTION_PATTERNS = [
    r"ignore\s+(all\s+)?previous\s+instructions",
    r"ignore\s+(all\s+)?prior\s+instructions",
    r"ignore\s+your\s+(previous|prior)\s+(prompt|instructions)",
    r"ignore\s+(the\s+)?(system\s+)?prompt",
    r"reveal\s+(your\s+)?system\s+prompt",
    r"show\s+(your\s+)?system\s+prompt",
    r"act\s+as\s+an?\s+unrestricted",
    r"bypass\s+(your\s+)?(rules|restrictions|guardrails)",
    r"disregard\s+(all\s+)?(rules|instructions)",
]


def check_prompt_injection(message):

    for pattern in INJECTION_PATTERNS:
        if re.search(pattern, message, re.IGNORECASE):
            return False

    return True