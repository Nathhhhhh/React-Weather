import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Search from './Search'
import WeatherWidget from './WeatherWidget'



const App = () => {
  //state
  const [search, setSearch] = useState('');

  //comportement
  const handleSelect = (city) => {
    if(city)
      setSearch(city)
  }


  //render
  return <main className="weather-container">
    <Search onSelect={(city) => handleSelect(city)} />
    <WeatherWidget city={search ? search.nom : 'La Rochelle'} lat={search ? search.centre.coordinates[1] : '46.1592'} long={search ? search.centre.coordinates[0] : '-1.17'} />
  </main>
}

export default App