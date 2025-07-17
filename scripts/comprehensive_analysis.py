import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime
import requests
from io import StringIO
import json

# Fetch the datasets
session_data_url = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Drop%20Off%20Analysis%20-%20Session%20data-uzZyV7BbtoNXX6gYqpPKDUm364UCuW.csv"
users_data_url = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Drop%20Off%20Analysis%20-%20Users%20Data-SWuQhbnVmbe0MXRRUdRZb4mS8zzCW3.csv"

print("🔄 Fetching and loading data...")

# Load session data
session_response = requests.get(session_data_url)
session_data = pd.read_csv(StringIO(session_response.text))

# Load users data
users_response = requests.get(users_data_url)
users_data = pd.read_csv(StringIO(users_response.text))

# Convert timestamp to datetime
session_data['timestamp'] = pd.to_datetime(session_data['timestamp'])

# Merge session data with user data
merged_data = session_data.merge(users_data, on='user_id', how='left')

print(f"✅ Data loaded successfully!")
print(f"📊 Session Data: {session_data.shape[0]:,} records")
print(f"👥 Users Data: {users_data.shape[0]:,} users")

# ===== 1. FUNNEL DESCRIPTION & USER JOURNEY MAPPING =====
print("\n" + "="*60)
print("1. FUNNEL DESCRIPTION & USER JOURNEY MAPPING")
print("="*60)

# Identify all unique steps and their order
step_counts = session_data['step_name'].value_counts()
print("📈 Step Participation Counts:")
for step, count in step_counts.items():
    print(f"   {step}: {count:,} users")

# Define logical funnel order
funnel_steps = ['view_property', 'select_dates', 'add_guests', 'review_booking', 'payment', 'booking_confirmed']
existing_steps = [step for step in funnel_steps if step in step_counts.index]

print(f"\n🔄 Identified Funnel Flow: {' → '.join(existing_steps)}")

# Analyze user journeys
user_journeys = session_data.groupby('user_id').agg({
    'step_name': lambda x: list(x),
    'timestamp': ['min', 'max', 'count']
}).reset_index()

user_journeys.columns = ['user_id', 'journey_steps', 'first_timestamp', 'last_timestamp', 'total_steps']
user_journeys['journey_duration'] = (user_journeys['last_timestamp'] - user_journeys['first_timestamp']).dt.total_seconds() / 60
user_journeys['last_step'] = user_journeys['journey_steps'].apply(lambda x: x[-1] if x else None)

print(f"\n📊 User Journey Statistics:")
print(f"   Total unique users: {len(user_journeys):,}")
print(f"   Average steps per user: {user_journeys['total_steps'].mean():.2f}")
print(f"   Average journey duration: {user_journeys['journey_duration'].mean():.1f} minutes")
print(f"   Median journey duration: {user_journeys['journey_duration'].median():.1f} minutes")

# ===== 2. DEMOGRAPHIC SNAPSHOT =====
print("\n" + "="*60)
print("2. DEMOGRAPHIC SNAPSHOT")
print("="*60)

# Device distribution
device_dist = users_data['device_kind'].value_counts()
print("📱 Device Distribution:")
for device, count in device_dist.items():
    percentage = (count / len(users_data)) * 100
    print(f"   {device}: {count:,} ({percentage:.1f}%)")

# Country distribution
country_dist = users_data['client_country'].value_counts()
print(f"\n🌍 Geographic Distribution (Top 10):")
for country, count in country_dist.head(10).items():
    percentage = (count / len(users_data)) * 100
    print(f"   {country}: {count:,} ({percentage:.1f}%)")

# UTM Source distribution
utm_dist = users_data['utm_source'].value_counts()
print(f"\n🚀 Traffic Source Distribution:")
for source, count in utm_dist.items():
    percentage = (count / len(users_data)) * 100
    print(f"   {source}: {count:,} ({percentage:.1f}%)")

# ===== 3. DROP-OFF ANALYSIS =====
print("\n" + "="*60)
print("3. COMPREHENSIVE DROP-OFF ANALYSIS")
print("="*60)

# Calculate detailed funnel metrics
funnel_data = []
total_users = len(session_data[session_data['step_name'] == existing_steps[0]]['user_id'].unique())

for i, step in enumerate(existing_steps):
    users_at_step = len(session_data[session_data['step_name'] == step]['user_id'].unique())
    
    if i == 0:
        step_conversion = 100.0
        overall_conversion = 100.0
        drop_off_from_previous = 0.0
    else:
        previous_step_users = len(session_data[session_data['step_name'] == existing_steps[i-1]]['user_id'].unique())
        step_conversion = (users_at_step / previous_step_users) * 100
        overall_conversion = (users_at_step / total_users) * 100
        drop_off_from_previous = 100 - step_conversion
        
    funnel_data.append({
        'step': step,
        'step_number': i + 1,
        'users': users_at_step,
        'step_conversion_rate': step_conversion,
        'overall_conversion_rate': overall_conversion,
        'drop_off_rate': drop_off_from_previous,
        'users_lost': previous_step_users - users_at_step if i > 0 else 0
    })

funnel_df = pd.DataFrame(funnel_data)

print("📊 Detailed Funnel Analysis:")
print(funnel_df.to_string(index=False, float_format='%.2f'))

# Identify critical drop-offs
critical_dropoffs = funnel_df[funnel_df['drop_off_rate'] > 20]
print(f"\n🚨 Critical Drop-offs (>20% drop-off rate):")
for _, row in critical_dropoffs.iterrows():
    print(f"   Step {row['step_number']} ({row['step']}): {row['drop_off_rate']:.1f}% drop-off ({row['users_lost']:,} users lost)")

# ===== 4. SEGMENT ANALYSIS =====
print("\n" + "="*60)
print("4. USER SEGMENT ANALYSIS")
print("="*60)

# Device performance analysis
print("📱 Device Performance Analysis:")
device_funnel = {}
for device in users_data['device_kind'].unique():
    device_users = users_data[users_data['device_kind'] == device]['user_id'].tolist()
    device_sessions = merged_data[merged_data['user_id'].isin(device_users)]
    
    device_metrics = {}
    for step in existing_steps:
        step_users = len(device_sessions[device_sessions['step_name'] == step]['user_id'].unique())
        device_metrics[step] = step_users
    
    # Calculate conversion rate
    if device_metrics.get(existing_steps[0], 0) > 0:
        conversion_rate = (device_metrics.get(existing_steps[-1], 0) / device_metrics.get(existing_steps[0], 1)) * 100
    else:
        conversion_rate = 0
        
    device_funnel[device] = {
        'metrics': device_metrics,
        'conversion_rate': conversion_rate,
        'total_users': len(device_users)
    }
    
    print(f"   {device}: {conversion_rate:.2f}% conversion rate ({len(device_users):,} users)")

# Traffic source performance analysis
print(f"\n🚀 Traffic Source Performance Analysis:")
source_funnel = {}
for source in users_data['utm_source'].unique():
    source_users = users_data[users_data['utm_source'] == source]['user_id'].tolist()
    source_sessions = merged_data[merged_data['user_id'].isin(source_users)]
    
    source_metrics = {}
    for step in existing_steps:
        step_users = len(source_sessions[source_sessions['step_name'] == step]['user_id'].unique())
        source_metrics[step] = step_users
    
    # Calculate conversion rate
    if source_metrics.get(existing_steps[0], 0) > 0:
        conversion_rate = (source_metrics.get(existing_steps[-1], 0) / source_metrics.get(existing_steps[0], 1)) * 100
    else:
        conversion_rate = 0
        
    source_funnel[source] = {
        'metrics': source_metrics,
        'conversion_rate': conversion_rate,
        'total_users': len(source_users)
    }
    
    print(f"   {source}: {conversion_rate:.2f}% conversion rate ({len(source_users):,} users)")

# Geographic performance analysis
print(f"\n🌍 Geographic Performance Analysis (Top 5 regions):")
geo_funnel = {}
for country in users_data['client_country'].value_counts().head(5).index:
    country_users = users_data[users_data['client_country'] == country]['user_id'].tolist()
    country_sessions = merged_data[merged_data['user_id'].isin(country_users)]
    
    country_metrics = {}
    for step in existing_steps:
        step_users = len(country_sessions[country_sessions['step_name'] == step]['user_id'].unique())
        country_metrics[step] = step_users
    
    # Calculate conversion rate
    if country_metrics.get(existing_steps[0], 0) > 0:
        conversion_rate = (country_metrics.get(existing_steps[-1], 0) / country_metrics.get(existing_steps[0], 1)) * 100
    else:
        conversion_rate = 0
        
    geo_funnel[country] = {
        'metrics': country_metrics,
        'conversion_rate': conversion_rate,
        'total_users': len(country_users)
    }
    
    print(f"   {country}: {conversion_rate:.2f}% conversion rate ({len(country_users):,} users)")

# ===== 5. TIME-BASED ANALYSIS =====
print("\n" + "="*60)
print("5. TIME-BASED ANALYSIS")
print("="*60)

# Daily patterns
session_data['hour'] = session_data['timestamp'].dt.hour
session_data['day_of_week'] = session_data['timestamp'].dt.day_name()

hourly_activity = session_data.groupby('hour').size()
print("⏰ Peak Activity Hours:")
top_hours = hourly_activity.nlargest(5)
for hour, count in top_hours.items():
    print(f"   {hour:02d}:00 - {count:,} sessions")

daily_activity = session_data.groupby('day_of_week').size()
print(f"\n📅 Activity by Day of Week:")
for day, count in daily_activity.items():
    print(f"   {day}: {count:,} sessions")

# ===== SAVE DATA FOR DASHBOARD =====
print("\n" + "="*60)
print("6. PREPARING DATA FOR DASHBOARD")
print("="*60)

# Prepare data structures for the dashboard
dashboard_data = {
    'funnel_metrics': funnel_df.to_dict('records'),
    'device_performance': device_funnel,
    'source_performance': source_funnel,
    'geo_performance': geo_funnel,
    'demographics': {
        'device_distribution': device_dist.to_dict(),
        'country_distribution': country_dist.to_dict(),
        'utm_distribution': utm_dist.to_dict()
    },
    'time_patterns': {
        'hourly_activity': hourly_activity.to_dict(),
        'daily_activity': daily_activity.to_dict()
    },
    'summary_stats': {
        'total_users': len(user_journeys),
        'avg_steps_per_user': float(user_journeys['total_steps'].mean()),
        'avg_journey_duration': float(user_journeys['journey_duration'].mean()),
        'overall_conversion_rate': float(funnel_df.iloc[-1]['overall_conversion_rate']),
        'total_sessions': len(session_data)
    }
}

print("✅ Data analysis complete!")
print(f"📊 Generated insights for {len(dashboard_data['funnel_metrics'])} funnel steps")
print(f"🎯 Identified {len(critical_dropoffs)} critical drop-off points")
print(f"📱 Analyzed {len(device_funnel)} device segments")
print(f"🚀 Analyzed {len(source_funnel)} traffic sources")
print(f"🌍 Analyzed {len(geo_funnel)} geographic regions")
