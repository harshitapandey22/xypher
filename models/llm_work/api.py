from fastapi import FastAPI , File, UploadFile, Request
import numpy as np
from pydantic import BaseModel
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware
from llm import return_answer

api = FastAPI()     

# GET - to get information
# POST - submitting new information
# PUT - updating information 
# DELETE - deleting information
class TransactionData(BaseModel):
    amount: float
    type: str
    date: str
    description: str

class Transaction(BaseModel):
    email : str
    isTransactionAllowed : bool
    query : str
    transactions : List[TransactionData]

api.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@api.get('/')
def index():
    return {"message":"Hello World"}


@api.post('/predict')
async def predict(request: Transaction):
    query = request.query
    email = request.email
    isTransactionAllowed = request.isTransactionAllowed
    transactions_list = [t.dict() for t in request.transactions]
    response = await return_answer(query,email,isTransactionAllowed,transactions_list)
    return {"received_data": response}


