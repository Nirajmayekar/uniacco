import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime
import requests
from io import StringIO

# Set up plotting style
plt.style.use('default')
sns.set_palette("husl")

# Fetch and load data
session_data_url = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Drop%20Off%20Analysis%20-%20Session%20data-uzZyV7BbtoNXX6gYqpPKDUm364UCuW.csv"
users_data_url = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Drop%20Off%20Analysis%20-%20Users%20Data-SWuQhbnVmbe0MXRRUdRZb4mS8zzCW3.csv"

session_response = requests.get(session_data_url)
session_data = pd.read_csv(StringIO(session_response.text))

users_response = requests.get(users_data_url)
users_data = pd.read_csv(StringIO(users_response.text))

# Convert timestamp and merge data
session_data['timestamp'] = pd.to_datetime(session_data['timestamp'])
merged_data = session_data.merge(users_data, on='user_id', how='left')

# Define funnel steps
funnel_steps = ['view_property', 'select_dates', 'add_guests', 'review_booking', 'payment', 'booking_confirmed']
existing_steps = [step for step in funnel_steps if step in session_data['step_name'].unique()]

# Calculate funnel metrics
funnel_data = []
previous_users = None

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

# Create comprehensive visualizations
fig, axes = plt.subplots(2, 2, figsize=(16, 12))
fig.suptitle('Booking Funnel Analysis Dashboard', fontsize=16, fontweight='bold')

# 1. Funnel Visualization
ax1 = axes[0, 0]
bars = ax1.bar(range(len(funnel_df)), funnel_df['users'], color='skyblue', alpha=0.7)
ax1.set_title('User Count by Funnel Step', fontweight='bold')
ax1.set_xlabel('Funnel Steps')
ax1.set_ylabel('Number of Users')
ax1.set_xticks(range(len(funnel_df)))
ax1.set_xticklabels([step.replace('_', '\n') for step in funnel_df['step']], rotation=45, ha='right')

# Add value labels on bars
for i, bar in enumerate(bars):
    height = bar.get_height()
    ax1.text(bar.get_x() + bar.get_width()/2., height + height*0.01,
             f'{int(height):,}', ha='center', va='bottom', fontweight='bold')

# 2. Drop-off Rates
ax2 = axes[0, 1]
drop_off_data = funnel_df[funnel_df['drop_off_rate'] > 0]
bars2 = ax2.bar(range(len(drop_off_data)), drop_off_data['drop_off_rate'], 
                color='salmon', alpha=0.7)
ax2.set_title('Drop-off Rates Between Steps', fontweight='bold')
ax2.set_xlabel('Transition Points')
ax2.set_ylabel('Drop-off Rate (%)')
ax2.set_xticks(range(len(drop_off_data)))
ax2.set_xticklabels([f"After\n{step.replace('_', ' ')}" for step in drop_off_data['step']], 
                    rotation=45, ha='right')

# Add percentage labels
for i, bar in enumerate(bars2):
    height = bar.get_height()
    ax2.text(bar.get_x() + bar.get_width()/2., height + 1,
             f'{height:.1f}%', ha='center', va='bottom', fontweight='bold')

# 3. Device Performance Analysis
ax3 = axes[1, 0]
device_performance = merged_data.groupby(['device_kind', 'step_name']).size().unstack(fill_value=0)
device_conversion = {}

for device in device_performance.index:
    if 'view_property' in device_performance.columns and 'booking_confirmed' in device_performance.columns:
        total_views = device_performance.loc[device, 'view_property']
        total_bookings = device_performance.loc[device, 'booking_confirmed']
        conversion = (total_bookings / total_views * 100) if total_views > 0 else 0
        device_conversion[device] = conversion

if device_conversion:
    devices = list(device_conversion.keys())
    conversions = list(device_conversion.values())
    bars3 = ax3.bar(devices, conversions, color='lightgreen', alpha=0.7)
    ax3.set_title('Conversion Rate by Device', fontweight='bold')
    ax3.set_xlabel('Device Type')
    ax3.set_ylabel('Conversion Rate (%)')
    
    for i, bar in enumerate(bars3):
        height = bar.get_height()
        ax3.text(bar.get_x() + bar.get_width()/2., height + 0.1,
                 f'{height:.1f}%', ha='center', va='bottom', fontweight='bold')

# 4. Traffic Source Analysis
ax4 = axes[1, 1]
source_performance = merged_data.groupby(['utm_source', 'step_name']).size().unstack(fill_value=0)
source_conversion = {}

for source in source_performance.index:
    if 'view_property' in source_performance.columns and 'booking_confirmed' in source_performance.columns:
        total_views = source_performance.loc[source, 'view_property']
        total_bookings = source_performance.loc[source, 'booking_confirmed']
        conversion = (total_bookings / total_views * 100) if total_views > 0 else 0
        source_conversion[source] = conversion

if source_conversion:
    sources = list(source_conversion.keys())
    conversions = list(source_conversion.values())
    bars4 = ax4.bar(sources, conversions, color='orange', alpha=0.7)
    ax4.set_title('Conversion Rate by Traffic Source', fontweight='bold')
    ax4.set_xlabel('Traffic Source')
    ax4.set_ylabel('Conversion Rate (%)')
    
    for i, bar in enumerate(bars4):
        height = bar.get_height()
        ax4.text(bar.get_x() + bar.get_width()/2., height + 0.1,
                 f'{height:.1f}%', ha='center', va='bottom', fontweight='bold')

plt.tight_layout()
plt.show()

# Print detailed analysis
print("\n=== DETAILED FUNNEL ANALYSIS ===")
print("\nFunnel Performance Summary:")
print(funnel_df.to_string(index=False, float_format='%.2f'))

print(f"\nOverall Conversion Rate: {(funnel_df.iloc[-1]['users'] / funnel_df.iloc[0]['users'] * 100):.2f}%")

# Segment analysis
print("\n=== SEGMENT ANALYSIS ===")

# Device segment analysis
print("\nDevice Performance:")
for device, conversion in device_conversion.items():
    device_users = len(users_data[users_data['device_kind'] == device])
    print(f"  {device}: {conversion:.2f}% conversion rate ({device_users:,} users)")

# Traffic source analysis
print("\nTraffic Source Performance:")
for source, conversion in source_conversion.items():
    source_users = len(users_data[users_data['utm_source'] == source])
    print(f"  {source}: {conversion:.2f}% conversion rate ({source_users:,} users)")
