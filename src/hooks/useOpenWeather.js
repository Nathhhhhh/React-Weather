import { useState, useEffect, useCallback } from 'react'


const baseUrl = 'https://api.open-meteo.com/v1/forecast';



const useOpenWeather = (city, lat, long, timezone, dailyVars, hourlyVars, interval = 10000) => {
    //state
    const [weather, setWeather] = useState(null);
    const [dateNow, setDateNow] = useState(null);

    //comportement
    const getData = useCallback(() => {
        fetch(`${baseUrl}?latitude=${lat}&longitude=${long}&hourly=${hourlyVars.join(',')}&daily=${dailyVars.join(',')}&timezone=${timezone}&current_weather=true`)
            .then((response) => response.json())
            .then((data) => {
                setDateNow(new Date(Date.now()).toLocaleTimeString('fr'))
                if (data)
                    setWeather(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [city])

    useEffect(() => {
        getData();
        const timer = setInterval(getData, interval)
        return () => {
            clearInterval(timer);
        }

    }, [getData])

    //weather retourne les données du fetch
    //dateNow retourne le temps 'now'
    //getData retourn la fonction getData, qui peut donc être appelée
    return [weather, dateNow, getData]
}

export default useOpenWeather