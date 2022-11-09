import { useState } from "react";

export default function Search({ onSelect }) {

    //state
    const [city, setCity] = useState('');
    const [search, setSearch] = useState('');
    //comportement
    const handleSelect = (result) => {
        onSelect(result)
        setCity('')
        setSearch('')
    }

    const getData = () => {

        fetch(`https://geo.api.gouv.fr/communes?nom=${city}&fields=centre,departement&boost=population&limit=5`)
            .then((response) => response.json())
            .then((data) => {
                setSearch(
                    data.map((result, i) => {
                        return (
                            <li key={i}>
                                <button onClick={() => handleSelect(result)}>{result.nom} ({result.departement.code})</button>
                            </li>
                        );
                    })
                )
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const handleChange = (event) => {
        const value = event.target.value;
        setCity(value);
        if(value.length >= 3)
            getData();
    }

    //render

    return (
        <div className="searchbar-container">
            <div className="searchbar-input-group">
                <input type="text" className="searchbar-input" placeholder="Rechercher..." value={city} onChange={handleChange} />
                <button className="searchbar-button" onClick={getData}>
                    <svg className="searchbar-button-logo" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                    </svg>
                </button>
            </div>
            {search !== '' &&
                <div className="searchbar-options">
                    <ul>
                        {search}
                    </ul>
                </div>
            }
        </div>
    );

}