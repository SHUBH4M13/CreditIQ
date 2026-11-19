
from evaluations.groq_evaluator import groq_evaluator

response = groq_evaluator.generate(
    "Reply with exactly: CreditIQ evaluation model is working."
)

print(response)
