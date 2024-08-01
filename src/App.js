import humidity from "./Assets/humidity.png";
import wind from "./Assets/wind.png";

import { useEffect, useRef, useState } from "react";

function App() {
  const [weather, setweather] = useState(true);
  const inputRef = useRef();
  const [message, setMessage] = useState();

  const api_key = "ce73d734d97e1bf32d19b13709da85cd";
  const search = async (city) => {
    if (city === "") {
      alert("Enter city name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message);
      }
      setweather({
        humidity: data.main.humidity,
        wind: data.wind.speed,
        temp: Math.floor(data.main.temp),
        location: data.name,
        icon: data.weather[0].icon,
      });
      console.log(data);
    } catch (error) {
      setweather(false);
      console.log(error);
    }
  };

  useEffect(() => {
    search("london");
  }, []);

  return (
    <div className="container">
      <input ref={inputRef} type="text" placeholder="Search" />
      <button onClick={() => search(inputRef.current.value)}>
        <i className="fas fa-search"></i>
      </button>

      {weather ? (
        <>
          <div className="degree-info">
            <img
              className="image"
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt=""
            />
            <h2>{weather.temp}</h2>
            <p>{weather.location}</p>
          </div>
          <div className="info-container">
            <div className="info">
              <div className="icons">
                <img className="humidity-img" src={humidity} alt="humidity" />
                <p>{weather.humidity} %</p>
              </div>
              <p className="info-p">humidty</p>
            </div>
            <div className="info">
              <div className="icons">
                <img className="wind-img" src={wind} alt="humidity" />
                <p>{weather.wind} km/h</p>
              </div>
              <p className="info-p">wind speed</p>
            </div>
          </div>
        </>
      ) : (
        <div className="error">{message}</div>
      )}
    </div>
  );
}

export default App;
