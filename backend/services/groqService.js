import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const improve_content = `You are CreditIQ's AI financial education assistant.

Analyze the user's financial profile and identify areas that
could be improved to help them become a stronger credit card applicant.

Consider factors such as:
- Credit score
- Credit history
- Late payments
- Defaults
- Existing loans
- Monthly EMI burden
- Existing credit cards
- Income
- Employment information
- Bank relationship

For each relevant issue:
- Clearly identify the factor.
- Give 1-2 practical actions the user can take.
- Keep the advice concise, realistic, and easy to understand.
- Only mention issues that are actually supported by the user's profile.
- Do not invent missing information.
- Do not guarantee credit score improvement or credit card approval.
- Do not recommend specific financial products.

If the user's profile is already strong, return fewer suggestions
and focus only on meaningful areas for improvement.

Return ONLY valid JSON in exactly this format:

{
  "suggestions": [
    {
      "factor": "Credit Score",
      "suggestion": "Make payments on time and maintain responsible credit usage."
    }
  ]
}
`

export const generateImprovementSuggestions = async (
    profile,
    weakAreas
) => {

    const completion =
        await groq.chat.completions.create({
            model: "openai/gpt-oss-20b",

            messages: [
                {
                    role: "system",
                    content: improve_content
                },
                {
                    role: "user",
                    content: JSON.stringify({
                        profile,
                        weakAreas
                    })
                }
            ],
            reasoning_effort:"medium",
            max_completion_tokens:2048,
        });

    const response = completion.choices[0].message.content;

    const parsedResponse = JSON.parse(response);

    return parsedResponse;
};