# 🌦️ React Weather Forecast App

A responsive React Weather App that fetches real-time weather data and a 5-day forecast using the OpenWeatherMap API. It features dynamic icons, dark/light mode toggle, and displays temperature, humidity, wind, and more. User preferences like city and theme are saved using sessionStorage for a smooth, personalized experience.

## 🚀 Live Demo

👉 [View the Live App](https://your-deployed-url.com)

> Replace the above link with your actual live deployment URL (e.g., Vercel, Netlify).

---

## 📸 Features

- 🔍 Search weather by city name
- 🌡 Real-time temperature, humidity, pressure, and wind data
- 🌅 Sunrise & sunset times
- 📆 5-day weather forecast with icons
- 🌙 Dark & Light Mode toggle
- 🔒 Local session storage for remembering city and theme
- 📱 Responsive design for all devices

---

## 🛠 Tech Stack

- **Frontend**: React, JavaScript, CSS Modules
- **API**: [OpenWeatherMap API](https://openweathermap.org/api)
- **Charting**: Recharts (optional — add if you include chart view)
- **Styling**: Custom CSS + Conditional Classes

---

## 📂 Project Structure

```bash
.
├── public/
├── src/
│   ├── Weather.jsx         # Main weather component
│   ├── Weather.css         # Styling
│   └── index.js            # Entry point
├── tailwind.config.js      # Optional (if using Tailwind)
├── package.json
└── README.md
