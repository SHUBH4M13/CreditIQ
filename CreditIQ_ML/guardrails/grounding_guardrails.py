
import json
from groq import Groq

import os

groq = Groq(api_key=os.getenv("GROQ_API_KEY"))


def validate_grounding(question, context, answer):

    completion = groq.chat.completions.create(
        model="openai/gpt-oss-20b",
        messages=[
            {
                "role": "system",
                "content": """
You are a factual verification system.

Your task is to determine whether the answer
is supported by the provided brochure context.

Rules:
1. Verify factual claims against the context.
2. Pay special attention to fees, amounts,
   percentages, dates and eligibility conditions.
3. Do not use external knowledge.
4. If the answer contains unsupported claims,
   mark it as unsupported.
5. Return only valid JSON in this format:

{
    "supported": true,
    "reason": "Explanation"
}
"""
            },
            {
                "role": "user",
                "content": f"""
Question:
{question}

Brochure Context:
{context}

Generated Answer:
{answer}
"""
            }
        ],
        temperature=0
    )

    result = completion.choices[0].message.content

    try:
        result = json.loads(result)
        return result.get("supported") is True

    except (json.JSONDecodeError, TypeError):
        return False
