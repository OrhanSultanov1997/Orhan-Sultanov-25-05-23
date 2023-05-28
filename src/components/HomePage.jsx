import React from 'react'
import { useEffect, useState } from 'react'
import FiveDayWeather from './FiveDayWeather'
export default function HomePage(props) {

    const [cityName, setCityName] = useState('')
    const [defCity, setDefCity] = useState('Tel Aviv')

    const show = () => {
        let exist = props.favorite.find((val) => (val.name == defCity))
        if (exist == undefined) {
            console.log('not in favorite');
        }
        else {
            console.log('city in favorite');
        }

        for (let i = 0; i < cityName.length; i++) {
            if (cityName.charAt(i) < 'A' || cityName.charAt(i) > 'Z'
                && cityName.charAt(i) < 'a' || cityName.charAt(i) > 'z') {
                if (cityName.charAt(i) == ' ') {
                    continue
                }


                alert('charts only')
                return false

            }

        }
        if (props.cityName == '') {
            alert('must type city name')
            return false
        }

        fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=X2OkjT8bXmS62yU6ocIO6htWhxyyIFXZ&q=${cityName}`)
            .then((res => res.json()))
            .then((data) => {
                data.forEach((val) => {
                    props.setCityKey(val.Key)

                })
                setDefCity(cityName)
                props.setCityDef(cityName)
                props.setFlag(!props.flag)
            })






    }



    return (
        <div>


            <input placeholder='Enter City Name' type="search" onChange={(e) => { setCityName(e.target.value) }} /> <button onClick={show}>Show</button>
            <br />
            <button onClick={() => { props.addToFav(defCity) }}>Add/Remove</button>

            {props.weather.map((val, index) => {
                return <div>
                    <p>{props.cityDef}</p>
                    <p>{val.Temperature.Metric.Value} {val.Temperature.Metric.Unit}</p>

                </div>
            })}

            {props.fivedayweather.map((val, index) => {
                return <FiveDayWeather val={val}  />
            })}



        </div>
    )
}

