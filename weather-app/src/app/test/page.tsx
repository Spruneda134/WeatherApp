'use client';
import { useState } from "react";

export default function TestPage() {

  const [input, setInput] = useState("");
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState("");

  async function displayWeather() {
    if (input.trim() === "") return;

    const apiKey = "6df53ea2020e468613b7b627e717d4f4";  // <-- Replace this with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=6df53ea2020e468613b7b627e717d4f4`;

    try {
      const res = await fetch(url);
      if (!res.ok) {
        alert("City not found");
        return;
      }

      const data = await res.json();
      setTemp(data.main.temp);     // temperature in Fahrenheit
      setCity(input);
      setInput("");
    } catch (error) {
      alert("Failed to fetch weather");
      console.error(error);
    }
  }

  return (
    <div className="p-5">
      <h1>Weather App</h1>

      <input 
        type="text" 
        placeholder="City" 
        className="border-2 p-1"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={displayWeather} className="border-2 p-1">Submit</button>

      {city !== "" && temp !== "" && (
        <h2>Weather in {city}: {temp}°F</h2>
      )}

    </div>
  );
}