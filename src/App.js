import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    setShow(false);
    setData({});
    try {
      const res = await fetch(
        "https://api.weatherapi.com/v1/current.json?Key=5dccf9eecf304b088f3161759242812&q=" +
          city
      );
      const d = await res.json();
      console.log(d);
      if (d?.error?.code === 1006) alert("Failed to fetch weather data");
      else {
        setData(d);
        setShow(true);
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };
  if (loading) return <p>Loading...</p>;
  else
    return (
      <div className="cont">
        <div className="form">
          <input
            className="inp"
            type="text"
            placeholder="Enter City Name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="btn" onClick={fetchData}>
            Search
          </button>
        </div>
        {loading && <p>Loading data...</p>}
        {show && (
          <div className="weather-cards">
            <div className="weather-card">
              <div>Temperature</div>
              <div>{data?.current?.temp_c}°C</div>
            </div>
            <div className="weather-card">
              <div>Humidity</div>
              <div>{data?.current?.humidity}%</div>
            </div>
            <div className="weather-card">
              <div>Condition</div>
              <div>{data?.current?.condition?.text}</div>
            </div>
            <div className="weather-card">
              <div>Wind Speed</div>
              <div>{data?.current?.wind_kph}kph</div>
            </div>
          </div>
        )}
      </div>
    );
};

export default App;
