import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function FavPage(props) {
    const nav = useNavigate()
    return (
        <div onClick={()=>{props.navDetails(props.val,props.val.name);nav('/')}} style={{
            margin: '30px',
            border: '1px solid black',
            width: '200px'
        }}>
            <p>{props.val.name}</p>
            {props.val.weather.map((val, index) => {
                return <p>{val.Temperature.Metric.Value} {val.Temperature.Metric.Unit}</p>
            })}


        </div>
    )
}
