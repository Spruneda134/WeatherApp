'use client';
import { useState } from "react";

export default function Home() {

  function displayWeather() {
    if (input.trim() === "") return;

    setCity(input);
    setInput("");
  }

  const [input, setInput] = useState("");
  let [city, setCity] = useState("");
  let [temp, setTemp] = useState("78");

  return (
    <div className="p-5">
      <h1>Weather App</h1>

      <input 
        type="text" 
        placeholder="City" 
        className="border-2 p-1"
        value={input}
        onChange={(e) => setInput(e.target.value)}>
          
      </input>
      <button onClick={displayWeather} className="border-2 p-1">Submit</button>

      {city !== "" && <h2>Weather in {city}: {temp}</h2>}

    </div>
  );
}
