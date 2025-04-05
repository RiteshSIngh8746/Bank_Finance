import pandas as pd
import numpy as np
import random
import json

# Set random seed for reproducibility
np.random.seed(42)

# Simulate 10 million transactions
num_transactions = 10000000  

# Generate fake transaction data
transaction_data = {
    'Transaction_ID': [f'TX{str(i).zfill(7)}' for i in range(1, num_transactions + 1)],
    'Amount': np.round(np.random.uniform(5, 10000, num_transactions), 2),
    'Time': pd.to_datetime('2022-01-01') + pd.to_timedelta(np.random.randint(0, 365*24*60, num_transactions), 'm'),
    'Status': np.random.choice(['Fraud', 'Non-Fraud'], num_transactions, p=[0.02, 0.98]),  # 2% fraud rate
    'Location': np.random.choice(['US', 'UK', 'India', 'Canada', 'Germany'], num_transactions),
    'Merchant_Type': np.random.choice(['Electronics', 'Clothing', 'Groceries', 'Travel', 'Entertainment'], num_transactions)
}

# Create DataFrame
df = pd.DataFrame(transaction_data)

# Data Analysis
fraud_cases = df[df['Status'] == 'Fraud']

# 1. Fraud Trends Over Time
fraud_trends = df[df['Status'] == 'Fraud'].groupby(df['Time'].dt.month).size().to_dict()

# 2. Fraud by Location
fraud_by_location = fraud_cases['Location'].value_counts().to_dict()

# 3. Fraud by Merchant Type
fraud_by_merchant = fraud_cases['Merchant_Type'].value_counts().to_dict()

# 4. Export data to JSON
with open('fraud_trends.json', 'w') as f:
    json.dump(fraud_trends, f)

with open('fraud_by_location.json', 'w') as f:
    json.dump(fraud_by_location, f)

with open('fraud_by_merchant.json', 'w') as f:
    json.dump(fraud_by_merchant, f)

print("Data export completed successfully!")

