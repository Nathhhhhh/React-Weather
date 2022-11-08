import WeatherCode from "./WeatherCode";
import PropTypes from 'prop-types'

export default function ForecastItem({ label, code, temperature }) {
    //state

    //comportement

    //render

    return (
        <li className="forecast-item">
            <p>
                {label}
            </p>
            <WeatherCode code={code} />
            <p className="forecast-item-temp">
                {temperature}
            </p>
        </li>
    );
}

ForecastItem.propTypes = {
    label: PropTypes.string.isRequired,
    code: PropTypes.number.isRequired,
    temperature: PropTypes.number.isRequired
}