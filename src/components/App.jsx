import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import ForecastItem from './ForecastItem'
import TemperatureDisplay from './TemperatureDisplay'
import WeatherCode from './WeatherCode'


const App = () => {

  const baseUrl = 'https://api.open-meteo.com/v1/forecast';
  const timezone = 'Europe/Paris'
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
  const [currentTab, setCurrentTab] = useState('day');

  //comportement

  const getData = () => {
    fetch(`${baseUrl}?latitude=${latitude}&longitude=${longitude}&hourly=${hourlyVars.join(',')}&daily=${dailyVars.join(',')}&timezone=${timezone}&current_weather=true`)
      .then((response) => response.json())
      .then((data) => {
        setDateNow(new Date(Date.now()).toLocaleTimeString('fr'))
        if (data)
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

  }, [])

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
          ? <WeatherCode code={weather.current_weather.weathercode} />
          : ''
        }
        {weather !== null
          ? <TemperatureDisplay min={Math.round(weather.daily.temperature_2m_min[0])} max={Math.round(weather.daily.temperature_2m_max[0])} avg={Math.round((weather.daily.temperature_2m_max[0] + weather.daily.temperature_2m_min[0]) / 2)} />
          : 'Pas de données'
        }
      </article>
      <section className="">
        <nav className="tabs">
          <button className={`tab ${currentTab === 'day' ? "tab--active" : ''}`} onClick={() => setCurrentTab('day')}>
            Journée
          </button>
          <button className={`tab ${currentTab === 'week' ? "tab--active" : ''}`} onClick={() => setCurrentTab('week')}>
            Semaine
          </button>
        </nav>
        <ul className="forecast">
          {currentTab === 'day' && weather !== null &&
            new Array(5).fill(null).map((element, index) => <ForecastItem code={weather.hourly.weathercode[(index * 4) + 6]} temperature={(weather.hourly.temperature_2m[(index * 4) + 6])} label={Math.floor(new Date(weather.hourly.time[(index * 4) + 6]).getHours()) + 'h'} key={index} />)
          }
          {currentTab === 'week' && weather !== null &&
            new Array(5).fill(null).map((element, index) => <ForecastItem code={weather.daily.weathercode[index + 1]} temperature={((weather.daily.temperature_2m_max[index + 1] + weather.daily.temperature_2m_min[index + 1]) / 2).toFixed(1)} label={(new Date(weather.daily.time[index + 1]).getDate()) + '/' + new Date(weather.daily.time[index + 1]).getMonth()} key={index} />)
          }
        </ul>
      </section>
      <footer className="weather-container-footer">
        <p>Mis à jour à {dateNow}</p>
      </footer>
    </div>
  </main>
}

export default App