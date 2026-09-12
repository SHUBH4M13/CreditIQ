from fastapi import FastAPI
import joblib
import pandas as pd

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