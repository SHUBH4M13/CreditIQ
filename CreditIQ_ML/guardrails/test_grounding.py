import os
import json

from dotenv import load_dotenv
from groq import Groq

load_dotenv()

groq = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


from guardrails.grounding_guardrails import validate_grounding


def test_grounding():

    question = "What is the annual milestone benefit?"

    context = """
    HDFC Regalia Gold cardholders receive one
    complimentary flight ticket worth Rs. 5,000
    after achieving net retail spends of Rs. 7,50,000
    during the card anniversary year.
    """

    # Test 1: Correct answer
    correct_answer = """
    You receive one complimentary flight ticket
    worth Rs. 5,000 after spending Rs. 7,50,000
    during your card anniversary year.
    """

    result = validate_grounding(
        question, context, correct_answer
    )

    assert result is True, "Correct answer was rejected"

    print("Test 1 passed: Correct answer accepted")

    # Test 2: Incorrect monetary amount
    wrong_amount = """
    You receive one complimentary flight ticket
    worth Rs. 10,000 after spending Rs. 7,50,000.
    """

    result = validate_grounding(
        question, context, wrong_amount
    )

    assert result is False, "Incorrect amount was accepted"

    print("Test 2 passed: Incorrect amount rejected")

    # Test 3: Invented benefit
    invented_benefit = """
    You receive two complimentary international
    flight tickets every year without any spending
    requirements.
    """

    result = validate_grounding(
        question, context, invented_benefit
    )

    assert result is False, "Invented benefit was accepted"

    print("Test 3 passed: Invented benefit rejected")


if __name__ == "__main__":
    test_grounding()
    print("\nAll grounding tests passed!")
