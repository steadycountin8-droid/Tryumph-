# 🌍 Global Digital Clock

A real-time digital clock that displays current time across multiple timezones.

## Features

✨ **Multi-Timezone Display** - View time in 8 major cities worldwide  
⏰ **Real-Time Updates** - Updates every second automatically  
🎨 **Modern UI** - Sleek dark theme with glowing effects  
🔄 **Format Toggle** - Switch between 24-hour and 12-hour formats  
📅 **Full Date Display** - Shows complete date and day of week  
🌐 **UTC Offset** - Displays timezone offset for each location  
📱 **Responsive Design** - Works on desktop, tablet, and mobile  

## Supported Timezones

- 🗽 New York (America/New_York)
- 🌴 Los Angeles (America/Los_Angeles)
- 🇬🇧 London (Europe/London)
- 🗾 Tokyo (Asia/Tokyo)
- 🦘 Sydney (Australia/Sydney)
- 🏙️ Dubai (Asia/Dubai)
- 🏝️ Singapore (Asia/Singapore)
- 🇧🇷 São Paulo (America/Sao_Paulo)

## Installation

1. **Navigate to the project directory:**
```bash
cd Tryumph-
```

2. **Create a virtual environment:**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies:**
```bash
pip install -r requirements_clock.txt
```

## Running the App

```bash
python clock_app.py
```

The app will be available at `http://localhost:5001`

## How to Use

1. **Open the app** - Navigate to `http://localhost:5001`
2. **View all clocks** - See current time in 8 major cities
3. **Toggle format** - Click "Toggle 24/12 Hour Format" to change
4. **Toggle AM/PM** - Click "Toggle AM/PM" to show/hide
5. **Auto-updates** - Time updates automatically every second

## Customizing Timezones

To add or modify timezones, edit the `TIMEZONES` list in `clock_app.py`:

```python
TIMEZONES = [
    {'name': 'Your City', 'zone': 'Continent/City'},
    # ... more timezones
]
```

[Find timezone names here](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)

## Technologies

- **Backend**: Flask (Python)
- **Frontend**: HTML, CSS, JavaScript
- **Timezone Handling**: pytz library
- **Real-time Updates**: JavaScript fetch API with intervals

## Browser Support

- Chrome/Chromium ✅
- Firefox ✅
- Safari ✅
- Edge ✅
- Mobile Browsers ✅

## License

Free to use and modify.
