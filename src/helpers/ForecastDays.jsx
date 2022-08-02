import React from 'react';

function ForecastDays( { dataF } ) {
    return (
        <>
        {dataF.forecast.forecastday.map((x)=>(
            <div className='forecast-day-data' key={x.date}>
                <h3>{x.date.slice(6)}</h3>
                <img src={x.day.condition.icon} alt={x.day.condition.code} />
                <span>{x.day.condition.text}</span>
                <div className='temp-forecast'>
                    <span>min: <b>{Math.round(x.day.mintemp_c)}</b>°C </span>
                    <span>max: <b>{Math.round(x.day.maxtemp_c)}</b>°C</span>
                </div>
            </div>
        ))}
        </>
    );
}

export default ForecastDays;