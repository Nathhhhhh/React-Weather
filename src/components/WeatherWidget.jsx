import ForecastItem from './ForecastItem'
import TemperatureDisplay from './TemperatureDisplay'
import WeatherCode from './WeatherCode'
import { useState } from 'react'
import { useEffect } from 'react'
import Proptypes from 'prop-types'
import { useCallback } from 'react'
import useOpenWeather from '../hooks/useOpenWeather'

export default function WeatherWidget({ city, lat, long }) {

    const timezone = 'Europe/Paris'
    const dailyVars = ['weathercode', 'temperature_2m_max', 'temperature_2m_min']
    const hourlyVars = ['temperature_2m', 'weathercode']

    //state
    const [weather, dateNow, getData] = useOpenWeather(city, lat, long, timezone, dailyVars, hourlyVars, 60000);
    const [currentTab, setCurrentTab] = useState('day');
    //comportement

    //render
    return (
        <div className="weather-container-content">
            <header className="weather-container-header">
                <p className="location">{city}</p>
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
    );


}

WeatherWidget.propTypes = { lat: Proptypes.number.isRequired, long: Proptypes.number.isRequired, city: Proptypes.string.isRequired }