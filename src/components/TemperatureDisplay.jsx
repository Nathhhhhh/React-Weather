export default function TemperatureDisplay({ min, max, avg }) {

    //state

    //comportement

    //render
    return (
        <div className="temperature-display">
            <p className="temperature-display-avg">{avg}</p>
            <div className="temperature-display-row">
                <p>{max}</p>
                <p className="temperature-display-row-item--min">
                    {min}
                </p>
            </div>
        </div>
    );

}