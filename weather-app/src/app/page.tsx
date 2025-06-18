"use client";

import { useState } from "react";

export default function WeatherPage() {
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCelsius, setIsCelsius] = useState(true);

  function convert(temp: number, toCelsius?: boolean) {
    if (toCelsius === undefined) {

      if (isCelsius) {
        const newTemp = (temp * 9) / 5 + 32;
        setTemperature(newTemp);
        setIsCelsius(false);
      } else {
        const newTemp = ((temp - 32) * 5) / 9;
        setTemperature(newTemp);
        setIsCelsius(true);
      }
    } else if (toCelsius) {
      // convert from Fahrenheit to Celsius
      const newTemp = ((temp - 32) * 5) / 9;
      setTemperature(newTemp);
      setIsCelsius(true);
    } else {
      // convert from Celsius to Fahrenheit
      const newTemp = (temp * 9) / 5 + 32;
      setTemperature(newTemp);
      setIsCelsius(false);
    }
  }

  async function fetchTemperature() {
    try {
      setError(null);
      setTemperature(null);

      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${city}&format=json`
      );
      const geoData = await geoRes.json();

      if (!geoData.length) {
        setError("City not found");
        return;
      }

      const { lat, lon } = geoData[0];

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
      );
      const weatherData = await weatherRes.json();

      const tempC = weatherData.current_weather.temperature;


      if (!isCelsius) {
        convert(tempC, false);
      } else {
        setTemperature(tempC);
      }
    } catch {
      setError("Something went wrong");
    }
  }

  function toggleConvert() {
    if (temperature === null) return;
    convert(temperature); // toggles unit & temp normally on user click
  }

  return (
    <div>
      <h1>Check the Weather</h1>

      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />

      <button onClick={fetchTemperature}>Get Temperature</button>
      <button onClick={toggleConvert} disabled={temperature === null}>
        Convert
      </button>

      {temperature !== null && (
        <p>
          Temperature: {temperature.toFixed(1)}°{isCelsius ? "C" : "F"}
        </p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
