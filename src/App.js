import { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import HomePage from './components/HomePage';
import FavPage from './components/FavPage';
import { Link } from 'react-router-dom';
function App() {
  
  const [flag, setFlag] = useState(false)
  const [cityDef,setCityDef] = useState ('Tel Aviv')
  const [citykey, setCityKey] = useState('215854')
  const [weather, setWeather] = useState([])
  const [fivedayweather, setFiveDayWeather] = useState([])
  const [favorite,setFavorite]=useState([])

  const navDetails =(value,name)=>{

    let newArr =[ favorite.find((element)=>(element == value))]
    console.log(newArr
      );
    newArr.forEach((val)=>{
      setWeather(val.weather)

    })
    setCityDef(name)

   }

  useEffect(() => {
    try{
    fetch(`http://dataservice.accuweather.com/currentconditions/v1/${citykey}?apikey=X2OkjT8bXmS62yU6ocIO6htWhxyyIFXZ`)
      .then((res) => res.json())
      .then((data) => {
        setWeather(data)
      })
      .catch((err)=>{
        if (err) throw err
      })}
      catch(err){
        console.log(err);
      }
  }, [flag])




  useEffect(() => {
    try{
    fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${citykey}?apikey=X2OkjT8bXmS62yU6ocIO6htWhxyyIFXZ&metric=true`)
      .then((res) => res.json())
      .then((data) => {
        setFiveDayWeather([data])
      })
      .catch((err)=>{
        if (err) throw err
      })}
      catch(err){
        console.log(err);
      }
      
  },[flag])

  const addToFav = (name)=>{
let result = favorite.find((val)=>(val.name == name ))
if(result == undefined){
  setFavorite([...favorite,{weather,name}])
}
else{
  let remove = favorite.filter((val)=>(val.name !=name))
  setFavorite(remove)
}

  }

  return (
    <div className="App">
      <HashRouter>
        <header style={{textAlign : 'right'}}> <Link to={'/'}> <button>Home</button></Link>  <Link to={'/favorite'} ><button>Favorites</button></Link> </header>
        <hr style={{color : 'blue'}} />
        <Routes>

          <Route path='/' element={<HomePage cityDef={cityDef} setCityDef={setCityDef}  favorite={favorite} addToFav={addToFav} setCityKey={setCityKey} setFlag={setFlag} flag={flag} weather={weather} fivedayweather={fivedayweather} /> } />

          <Route path='/favorite' element={favorite.map((val,index)=>{return <FavPage navDetails={navDetails} val={val} index={index} setWeather={setWeather} />})} />




        </Routes>






      </HashRouter>



    </div>
  );
}

export default App;
