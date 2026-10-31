from fastapi import FastAPI
import joblib
import pandas as pd
from embedding import generate_embedding, generate_embeddings

app = FastAPI()

model = joblib.load("creditiq_model.pkl")


@app.get("/")
def home():
    return {
        "message": "CreditIQ ML API is running"
    }


@app.post("/predict")
def predict(data: dict):

    input_data = pd.DataFrame([data])

    probability = model.predict_proba(input_data)[0][1]

    return {
        "approval_probability": round(probability * 100, 2)
    }

@app.post("/predict/batch")
def predict_batch(data: list[dict]):

    input_data = pd.DataFrame(data)

    probabilities = model.predict_proba(input_data)[:, 1]

    return {
        "approval_probabilities": [
            round(probability * 100, 2)
            for probability in probabilities
        ]
    }

@app.post("/embed")
def embed(data: dict):
    text = data["text"]

    embedding = generate_embedding(text)

    return {
        "embedding": embedding
    }


@app.post("/embed/batch")
def embed_batch(data: list[str]):
    embeddings = generate_embeddings(data)

    return {
        "embeddings": embeddings
    }