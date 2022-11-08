import cloudsIcon from '../assets/img/clouds.png'
import fogIcon from '../assets/img/fog.png'
import heavyRainIcon from '../assets/img/heavy-rain.png'
import heavySnowIcon from '../assets/img/heavy-snow.png'
import partialSunIcon from '../assets/img/partial-sun.png'
import slightSnowIcon from '../assets/img/slight-snow.png'
import sunRainIcon from '../assets/img/sun-rain.png'
import sunshineIcon from '../assets/img/sunshine.png'
import thunderstormIcon from '../assets/img/thunderstorm.png'
import PropTypes from 'prop-types'
const codes =
    [
        { code: 95, image: thunderstormIcon },
        { code: 85, image: heavySnowIcon },
        { code: 80, image: heavyRainIcon },
        { code: 75, image: heavySnowIcon },
        { code: 71, image: slightSnowIcon },
        { code: 65, image: heavyRainIcon },
        { code: 51, image: sunRainIcon },
        { code: 45, image: fogIcon },
        { code: 3, image: cloudsIcon },
        { code: 2, image: partialSunIcon },
        { code: 0, image: sunshineIcon }
    ]


export default function WeatherCode({code}) {

    //state

    //comportement
    const findImg = (code) => {
        return codes.find((icon) => code >= icon.code  ).image;
    }

    //render

    return (
        <img src={findImg(code)} alt="sunshine" className="weathercode-img" />
    );
}

WeatherCode.propTypes = {
    code: PropTypes.number.isRequired
}