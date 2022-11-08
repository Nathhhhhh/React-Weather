import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import TemperatureDisplay from './TemperatureDisplay'
import WeatherCode from './WeatherCode'


const App = () => {

  const baseUrl = 'https://api.open-meteo.com/v1/forecast';
  const timezone = 'Europe/London'
  const dailyVars = ['weathercode', 'temperature_2m_max', 'temperature_2m_min']
  const hourlyVars = ['temperature_2m', 'weathercode']

  const latitude = 46.1592
  const longitude = -1.17

  // function success(position) {
  //  latitude  = position.coords.latitude;
  //  longitude = position.coords.longitude;
  // }
  // navigator.geolocation.getCurrentPosition(success);

  //state
  const [weather, setWeather] = useState(null);
  const [dateNow, setDateNow] = useState(null);

  //comportement

  const getData = () => {
    fetch(`${baseUrl}?latitude=${latitude}&longitude=${longitude}&hourly=${hourlyVars.join(',')}&daily=${dailyVars.join(',')}&timezone=${timezone}`)
      .then((response) => response.json())
      .then((data) => {
        setDateNow(new Date(Date.now()).toLocaleTimeString('fr'))
        if(data)
          setWeather(data);

      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    getData();
    const timer = setInterval(getData, 10000)
    return () => {
      clearInterval(timer);
    }
    
  },[])

  //render
  return <main className="weather-container">
    <div className="weather-container-content">
      <header className="weather-container-header">
        <p className="location">La Rochelle</p>
        <button className="refresh-button" onClick={getData}>
          <img src="https://lpmiaw-react.napkid.dev/img/weather/refresh.png" alt="Refresh" />
        </button>
      </header>
      <p className="date">10/20/2021</p>
      <article className="today">
        {weather !== null
        ? <WeatherCode code={weather.hourly.weathercode[0]} />
        : ''
        }
        {weather !== null 
        ? <TemperatureDisplay min={Math.round(weather.daily.temperature_2m_min[0])} max={Math.round(weather.daily.temperature_2m_max[0])} avg={Math.round((weather.daily.temperature_2m_max[0] + weather.daily.temperature_2m_min[0]) / 2)} />
        : 'Pas de données'
        }
      </article>
      <section className="hidden">
        <nav className="tabs">
          <button className="tab tab--active">
            Journée
          </button>
          <button className="tab">
            Semaine
          </button>
        </nav>
        <ul className="forecast">
          <li className="forecast-item">
            <p>
              20/10
            </p>
            <img src="https://lpmiaw-react.napkid.dev/img/weather/sunshine.png" alt="sunshine" className="weathercode-img" />
            <p className="forecast-item-temp">
              21
            </p>
          </li>
          <li className="forecast-item">
            <p>
              21/10
            </p>
            <img src="https://lpmiaw-react.napkid.dev/img/weather/sunshine.png" alt="sunshine" className="weathercode-img" />
            <p className="forecast-item-temp">
              21
            </p>
          </li>
          <li className="forecast-item">
            <p>
              22/10
            </p>
            <img src="https://lpmiaw-react.napkid.dev/img/weather/sunshine.png" alt="sunshine" className="weathercode-img" />
            <p className="forecast-item-temp">
              21
            </p>
          </li>
          <li className="forecast-item">
            <p>
              23/10
            </p>
            <img src="https://lpmiaw-react.napkid.dev/img/weather/sunshine.png" alt="sunshine" className="weathercode-img" />
            <p className="forecast-item-temp">
              21
            </p>
          </li>
        </ul>
      </section>
      <footer className="weather-container-footer">
        <p>Mis à jour à {dateNow}</p>
      </footer>
    </div>
  </main>
}

export default App