import React from 'react'

export default function FiveDayWeather(props) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu']
    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>{props.val.DailyForecasts.map((val, index) => {
            return <div style={{ border: '2px solid black', width: '150px', height: '150px', margin: '2px' }}>
             <h1>{days[index]}</h1>  
                <p>{val.Temperature.Maximum.Value} {val.Temperature.Minimum.Unit}</p>
            </div>
        })}</div>
    )
}
