from flask import Flask, render_template, jsonify
from datetime import datetime
import pytz

app = Flask(__name__)

# Define timezones to display
TIMEZONES = [
    {'name': 'New York', 'zone': 'America/New_York'},
    {'name': 'Los Angeles', 'zone': 'America/Los_Angeles'},
    {'name': 'London', 'zone': 'Europe/London'},
    {'name': 'Tokyo', 'zone': 'Asia/Tokyo'},
    {'name': 'Sydney', 'zone': 'Australia/Sydney'},
    {'name': 'Dubai', 'zone': 'Asia/Dubai'},
    {'name': 'Singapore', 'zone': 'Asia/Singapore'},
    {'name': 'São Paulo', 'zone': 'America/Sao_Paulo'},
]

@app.route('/')
def index():
    return render_template('clock.html', timezones=TIMEZONES)

@app.route('/api/time')
def get_time():
    """API endpoint to get current time in all timezones"""
    times = {}
    
    for tz_info in TIMEZONES:
        tz = pytz.timezone(tz_info['zone'])
        current_time = datetime.now(tz)
        
        times[tz_info['name']] = {
            'zone': tz_info['zone'],
            'time': current_time.strftime('%H:%M:%S'),
            'date': current_time.strftime('%A, %B %d, %Y'),
            'offset': current_time.strftime('%z'),
            'utc_offset': str(current_time.utcoffset())
        }
    
    return jsonify(times)

if __name__ == '__main__':
    app.run(debug=True, port=5001)
