# Dynamic Analog Clock

A dynamic analog clock with real-time animated hands, a background theme that changes according to the time of day, automatic user location detection via geolocation, local temperature display, and current timezone information.

## Features

- Analog clock with hour, minute, and second hands
- Dynamic background gradient that changes smoothly based on day/night hours
- Dynamic shadows and glow effects on hands and numbers
- Geolocation to get the user's current location
- Displays local temperature using the OpenWeather API
- Shows the current timezone
- Responsive design for mobile and desktop devices

## Technologies Used

- HTML5, CSS3, JavaScript (ES6+)
- External APIs: LocationIQ (reverse geocoding), OpenWeather (weather data)
- Google Fonts: Russo One (typography)

## How to Use

1. Clone this repository:

```bash
git clone https://github.com/your-username/your-repository.git
```
2. Open index.html in your browser
3. Allow location access when prompted to show temperature and location info

## API Configuration

- You need API keys for LocationIQ and OpenWeather
- Insert your keys in the respective JS files:
  - location.js for LocationIQ
  - temperature.js for OpenWeather

## Project Structure

/
├── index.html
├── style.css
├── main.js
├── img/
│   ├── whiteGithubLogo.svg
│   ├── whiteLinkedinLogo.svg
├── styles/
│   ├── reset.css
│   ├── variables.css
├── scripts/
│   ├── location.js
│   ├── temperature.js
│   ├── updateClock.js
│   ├── updateTheme.js
│   ├── numberPosition.js
│   └── timezone.js
└── README.md

## Author

Gabriel Porto

