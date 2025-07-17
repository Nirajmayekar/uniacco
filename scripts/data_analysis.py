import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime
import requests
from io import StringIO

# Fetch the datasets
session_data_url = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Drop%20Off%20Analysis%20-%20Session%20data-uzZyV7BbtoNXX6gYqpPKDUm364UCuW.csv"
users_data_url = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Drop%20Off%20Analysis%20-%20Users%20Data-SWuQhbnVmbe0MXRRUdRZb4mS8zzCW3.csv"

# Load session data
session_response = requests.get(session_data_url)
session_data = pd.read_csv(StringIO(session_response.text))

# Load users data
users_response = requests.get(users_data_url)
users_data = pd.read_csv(StringIO(users_response.text))

print("Session Data Shape:", session_data.shape)
print("Users Data Shape:", users_data.shape)
print("\nSession Data Columns:", session_data.columns.tolist())
print("Users Data Columns:", users_data.columns.tolist())

print("\nFirst few rows of Session Data:")
print(session_data.head())
print("\nFirst few rows of Users Data:")
print(users_data.head())

# Check unique steps in the funnel
print("\nUnique steps in the funnel:")
unique_steps = session_data['step_name'].unique()
print(unique_steps)

# Check data types and missing values
print("\nSession Data Info:")
print(session_data.info())
print("\nUsers Data Info:")
print(users_data.info())
