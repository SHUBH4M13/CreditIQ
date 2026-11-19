
import time

from deepeval.metrics import (
    FaithfulnessMetric,
    AnswerRelevancyMetric
)
from deepeval.test_case import LLMTestCase

from evaluations.eval_dataset import evaluation_dataset
from evaluations.groq_evaluator import groq_evaluator

from rag_service import generate_chat_response


def run_evaluation():

    faithfulness = FaithfulnessMetric(
        threshold=0.7,
        model=groq_evaluator,
        include_reason=True,
        async_mode=False
    )

    answer_relevancy = AnswerRelevancyMetric(
        threshold=0.7,
        model=groq_evaluator,
        include_reason=True,
        async_mode=False
    )

    for index, item in enumerate(evaluation_dataset):

        print(f"\n{'=' * 50}")
        print(f"TEST CASE {index + 1}/{len(evaluation_dataset)}")
        print(f"Question: {item['input']}")

        # Step 1: Run actual RAG pipeline
        result = generate_chat_response(
            message=item["input"],
            card_id="101",
            card_name="HDFC Regalia Gold",
            bank="HDFC_BANK",
            return_details=True
        )

        test_case = LLMTestCase(
            input=item["input"],
            actual_output=result["answer"],
            retrieval_context=result["retrieval_context"],
            expected_output=item["expected_output"]
        )

        print("\nChatbot answer:")
        print(result["answer"])

        # Allow RAG generation's Groq usage window to reset
        print("\nWaiting 60 seconds...")
        time.sleep(60)

        # Step 2: Faithfulness evaluation
        print("\nRunning Faithfulness...")

        faithfulness.measure(test_case)

        print("Faithfulness score:", faithfulness.score)
        print("Faithfulness reason:", faithfulness.reason)

        time.sleep(60)

        # Step 3: Answer Relevancy evaluation
        print("\nRunning Answer Relevancy...")

        answer_relevancy.measure(test_case)

        print("Answer Relevancy score:", answer_relevancy.score)
        print("Answer Relevancy reason:", answer_relevancy.reason)

        if index < len(evaluation_dataset) - 1:
            print("\nWaiting before the next test case...")
            time.sleep(60)

    print("\nAll evaluation test cases completed!")


if __name__ == "__main__":
    run_evaluation()
