import pandas as pd
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
from utils import preprocess_data

class FraudDetectionModel:
    def __init__(self):
        self.model = IsolationForest(contamination=0.1, random_state=42)
        self.scaler = StandardScaler()

    def train(self, transactions):
        df = pd.DataFrame(transactions)
        if df.empty or len(df) < 2:
            return
        df = preprocess_data(df)
        if df.empty or len(df) < 2:
            return
        scaled_data = self.scaler.fit_transform(df)
        self.model.fit(scaled_data)

    def predict(self, transaction):
        df = pd.DataFrame([transaction])
        df = preprocess_data(df)
        if df.empty:
            return 0
        scaled_data = self.scaler.transform(df)
        prediction = self.model.predict(scaled_data)
        return 1 if prediction[0] == -1 else 0