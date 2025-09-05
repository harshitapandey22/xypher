import pandas as pd

def preprocess_data(df):
    if 'date' not in df.columns:
        return pd.DataFrame() # Return empty DataFrame if 'date' column is missing

    df['date'] = pd.to_datetime(df['date'])
    df['hour'] = df['date'].dt.hour
    df['day_of_week'] = df['date'].dt.dayofweek
    df = df.drop(columns=['date', 'description', 'type']) # Drop unnecessary columns
    return df