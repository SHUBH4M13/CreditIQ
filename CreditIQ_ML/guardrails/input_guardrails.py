from pydantic import BaseModel, Field, ConfigDict


class ChatRequest(BaseModel):

    model_config = ConfigDict(
        str_strip_whitespace=True,
        extra="forbid"
    )

    card_id: str = Field(
        min_length=1,
        max_length=20,
        pattern=r"^[0-9]+$"
    )

    message: str = Field(
        min_length=1,
        max_length=2000
    )

    card_name: str = Field(
        min_length=1,
        max_length=150
    )

    bank: str = Field(
        min_length=1,
        max_length=100
    )