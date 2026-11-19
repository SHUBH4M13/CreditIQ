
import os
import json

from dotenv import load_dotenv
from groq import Groq, AsyncGroq
from pydantic import BaseModel
from deepeval.models import DeepEvalBaseLLM

load_dotenv()


class GroqEvalModel(DeepEvalBaseLLM):

    def __init__(self):
        api_key = os.getenv("GROQ_API_KEY")

        if not api_key:
            raise ValueError("GROQ_API_KEY is missing")

        self.client = Groq(api_key=api_key)
        self.async_client = AsyncGroq(api_key=api_key)
        self.model_name = "openai/gpt-oss-20b"

    def load_model(self):
        return self.client

    def get_model_name(self):
        return self.model_name

    def generate(
        self,
        prompt: str,
        schema: BaseModel = None
    ):

        messages = [
            {
                "role": "system",
                "content": "You are an evaluation judge. Follow the requested output format exactly."
            },
            {
                "role": "user",
                "content": prompt
            }
        ]

        if schema:
            messages[1]["content"] += (
                "\n\nReturn valid JSON matching this schema:\n"
                + json.dumps(schema.model_json_schema())
            )

            response = self.client.chat.completions.create(
                model=self.model_name,
                messages=messages,
                temperature=0,
                response_format={"type": "json_object"}
            )

            result = json.loads(
                response.choices[0].message.content
            )

            return schema(**result)

        response = self.client.chat.completions.create(
            model=self.model_name,
            messages=messages,
            temperature=0
        )

        return response.choices[0].message.content

    async def a_generate(
        self,
        prompt: str,
        schema: BaseModel = None
    ):

        messages = [
            {
                "role": "system",
                "content": "You are an evaluation judge. Follow the requested output format exactly."
            },
            {
                "role": "user",
                "content": prompt
            }
        ]

        if schema:
            messages[1]["content"] += (
                "\n\nReturn valid JSON matching this schema:\n"
                + json.dumps(schema.model_json_schema())
            )

            response = await self.async_client.chat.completions.create(
                model=self.model_name,
                messages=messages,
                temperature=0,
                response_format={"type": "json_object"}
            )

            result = json.loads(
                response.choices[0].message.content
            )

            return schema(**result)

        response = await self.async_client.chat.completions.create(
            model=self.model_name,
            messages=messages,
            temperature=0
        )

        return response.choices[0].message.content


groq_evaluator = GroqEvalModel()
