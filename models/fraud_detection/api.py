from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from model import FraudDetectionModel
import pandas as pd

app = FastAPI()
model = FraudDetectionModel()

class Transaction(BaseModel):
    amount: float
    description: str
    date: str
    type: str

class FraudDetectionRequest(BaseModel):
    transactions: List[Transaction]

@app.post("/detect_fraud")
def detect_fraud(request: FraudDetectionRequest):
    transactions = [t.dict() for t in request.transactions]
    if len(transactions) > 1:
        model.train(transactions[:-1]) # Train on all but the last transaction
    is_fraudulent = model.predict(transactions[-1]) # Predict on the last transaction
    return {"is_fraudulent": is_fraudulent}