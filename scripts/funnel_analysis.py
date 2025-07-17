import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime
import requests
from io import StringIO

# Fetch and load data
session_data_url = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Drop%20Off%20Analysis%20-%20Session%20data-uzZyV7BbtoNXX6gYqpPKDUm364UCuW.csv"
users_data_url = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Drop%20Off%20Analysis%20-%20Users%20Data-SWuQhbnVmbe0MXRRUdRZb4mS8zzCW3.csv"

session_response = requests.get(session_data_url)
session_data = pd.read_csv(StringIO(session_response.text))

users_response = requests.get(users_data_url)
users_data = pd.read_csv(StringIO(users_response.text))

# Convert timestamp to datetime
session_data['timestamp'] = pd.to_datetime(session_data['timestamp'])

# Merge session data with user data
merged_data = session_data.merge(users_data, on='user_id', how='left')

print("=== FUNNEL ANALYSIS REPORT ===\n")

# 1. DESCRIBE THE FUNNEL
print("1. FUNNEL DESCRIPTION")
print("=" * 50)

# Map the typical user journey
step_counts = session_data['step_name'].value_counts()
print("Step participation counts:")
for step, count in step_counts.items():
    print(f"  {step}: {count:,} users")

# Define funnel order (assuming logical booking flow)
funnel_steps = ['view_property', 'select_dates', 'add_guests', 'review_booking', 'payment', 'booking_confirmed']

# Filter for steps that exist in our data
existing_steps = [step for step in funnel_steps if step in step_counts.index]
print(f"\nFunnel steps identified: {existing_steps}")

# Create user journey mapping
user_journeys = session_data.groupby('user_id')['step_name'].apply(list).reset_index()
user_journeys['journey_length'] = user_journeys['step_name'].apply(len)
user_journeys['last_step'] = user_journeys['step_name'].apply(lambda x: x[-1] if x else None)

print(f"\nTotal unique users: {len(user_journeys):,}")
print(f"Average steps per user: {user_journeys['journey_length'].mean():.2f}")
print(f"Max steps per user: {user_journeys['journey_length'].max()}")

# 2. DEMOGRAPHIC SNAPSHOT
print("\n2. DEMOGRAPHIC SNAPSHOT")
print("=" * 50)

# Device distribution
device_dist = users_data['device_kind'].value_counts()
print("Device Distribution:")
for device, count in device_dist.items():
    percentage = (count / len(users_data)) * 100
    print(f"  {device}: {count:,} ({percentage:.1f}%)")

# Country distribution
country_dist = users_data['client_country'].value_counts()
print(f"\nCountry Distribution (Top 10):")
for country, count in country_dist.head(10).items():
    percentage = (count / len(users_data)) * 100
    print(f"  {country}: {count:,} ({percentage:.1f}%)")

# UTM Source distribution
utm_dist = users_data['utm_source'].value_counts()
print(f"\nTraffic Source Distribution:")
for source, count in utm_dist.items():
    percentage = (count / len(users_data)) * 100
    print(f"  {source}: {count:,} ({percentage:.1f}%)")

# 3. DROP-OFF ANALYSIS
print("\n3. DROP-OFF ANALYSIS")
print("=" * 50)

# Calculate conversion rates between steps
funnel_data = []
for i, step in enumerate(existing_steps):
    users_at_step = len(session_data[session_data['step_name'] == step]['user_id'].unique())
    
    if i == 0:
        conversion_rate = 100.0
        drop_off_rate = 0.0
        previous_users = users_at_step
    else:
        conversion_rate = (users_at_step / previous_users) * 100
        drop_off_rate = 100 - conversion_rate
        
    funnel_data.append({
        'step': step,
        'users': users_at_step,
        'conversion_rate': conversion_rate,
        'drop_off_rate': drop_off_rate
    })
    
    previous_users = users_at_step

funnel_df = pd.DataFrame(funnel_data)
print("Funnel Conversion Analysis:")
print(funnel_df.to_string(index=False, float_format='%.2f'))

# Identify major drop-offs
print("\nMajor Drop-offs (>30% drop-off rate):")
major_dropoffs = funnel_df[funnel_df['drop_off_rate'] > 30]
for _, row in major_dropoffs.iterrows():
    print(f"  {row['step']}: {row['drop_off_rate']:.1f}% drop-off")
