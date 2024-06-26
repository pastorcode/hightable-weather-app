import Head from 'next/head';
import {useEffect, useState} from "react";
import {getCurrentTime} from "../utils/helper";
import Link from "next/link";

export default function (){

  const [city, setCity] = useState('');
  const [unit, setUnit] = useState('celcius');
  const [cities, setCities] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [favouriteCities, setFavouriteCities] = useState([]);
  const [currentTime, setCurrentTime] = useState(null);
  const [token, setToken] = useState(null);


  useEffect( () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      setToken(token);
    }
    if (token){
      const response = fetch('https://seashell-app-ryz44.ondigitalocean.app/api/v1/cities/favourite', {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${token}`
        }
      })
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
            setFavouriteCities(data.data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    }

  },[token])

  const handleInputChange = async (e) => {
    const inputCity = e.target.value;
    setCity(inputCity);
    if (inputCity.length < 3) {
        setCities([]);
        return;
    }
    try {
      const response = await fetch(`https://seashell-app-ryz44.ondigitalocean.app/api/v1/cities/search?city=${inputCity}`);
      const data = await response.json();
      setCities(data.data);
      console.log(cities)
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleUnitChange = async (e) => {
    const selectedUnit = e.target.value;
    setUnit(selectedUnit);
    if (city) {
      try {
        const response = await fetch(`https://seashell-app-ryz44.ondigitalocean.app/api/v1/weather?city=${city}&unit=${selectedUnit}`);
        const data = await response.json();
        setWeatherData(data.data);
        setCurrentTime(getCurrentTime());
        console.log(data)
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    }
  }

  const handleButtonClick = async (e) => {
    e.preventDefault();
    setCities([]);
    try {
      const response = await fetch(`https://seashell-app-ryz44.ondigitalocean.app/api/v1/weather?city=${city}&unit=${unit}`);
      const data = await response.json();
      setWeatherData(data.data)
      setCurrentTime(getCurrentTime());
      console.log(data)
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  }

  const handleSelectCity = async (selectedCity) => {
    console.log(selectedCity)
    setCity(selectedCity);
    setCities([]);
    console.log(city)
    try {
      const response = await fetch(`https://seashell-app-ryz44.ondigitalocean.app/api/v1/weather?city=${selectedCity}&unit=${unit}`);
      const data = await response.json();
      setWeatherData(data.data)
      setCurrentTime(getCurrentTime());
      console.log(data)
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    window.location.href = '/';
  }

  const handleRemoveFromFavorites = (id) => {
    fetch(`https://seashell-app-ryz44.ondigitalocean.app/api/v1/cities/favourite/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${token}`,
      },
    })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          setFavouriteCities(favouriteCities.filter((city) => city._id !== id));
        })
        .catch((error) => {
          console.error('Error:', error);
        });
  };

  const handleAddToFavorites = (favCity) => {
    if (!token) {
        alert('Please login to add city to favourites');
        window.location.href = '/login';
        return;
    }
    fetch('https://seashell-app-ryz44.ondigitalocean.app/api/v1/cities/favourite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${token}`,
      },
      body: JSON.stringify({city: favCity})
    })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          setFavouriteCities([...favouriteCities, data.data]);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
  }

  useEffect(() => {
    if (weatherData){
      setInterval(() => {
        setCurrentTime(getCurrentTime());
      }, 1000);
    }
  });

  return (
      <div>
        <Head>
          <title>HighTable Weather App</title>
          <link rel="icon" href="/favicon.ico"/>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
          <link
              href="https://fonts.googleapis.com/css2?family=Inter:wght@500&family=Oxygen+Mono&display=swap"
              rel="stylesheet"
          />
          <link
              rel="stylesheet"
              href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
              integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
              crossOrigin="anonymous"
          />
          <link rel="stylesheet" href="/style.css"/>
        </Head>
        <main>
          <section className="container">
            <div className="row">
              <form className="col" id="search-form">
                <input
                    type="text"
                    id="search-input"
                    aria-describedby="searchCity"
                    placeholder="Search city..."
                    className="search-form"
                    autoComplete="off"
                    value={city}
                    onInput={handleInputChange}
                />

                <button onClick={handleButtonClick} type="button">Check!</button>
              </form>
              <h1
                  className="col d-flex justify-content-center align-items-center city-title"
                  id="searched-city"
              >
                {weatherData ? weatherData.name + ', ' + weatherData.sys.country : ''}
              </h1>
            </div>
            <div className="row">
              {cities.length > 0 && (
                  <ul className="search-results">
                    {cities.map((city) => (
                        <li className="list-dropdown-content" key={city.id} onClick={() => handleSelectCity(city.name)}>
                          {city.name}, {city.country}
                        </li>
                    ))}
                  </ul>
              )}
            </div>
          </section>

          {weatherData ? (
              <section className="current-weather">
                <div className="container">
                  <div className="row">
                    <div className="col d-flex justify-content-center align-items-center">
                      <img
                          src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                          alt={weatherData.weather[0].main}
                          width="100"
                          height="100"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <h1 className="col temp-title" id="current-temperature">{weatherData.main.temp}°</h1>
                    <div className="col todays-info">
                      <p id="current-time">{currentTime}</p>
                      <h2 id="current-day">Today</h2>
                      <p id="weather-type">{weatherData.weather[0].main}</p>
                    </div>
                    <div className="col d-flex align-items-center side-info">
                      <ul>
                        <li>Humidity: <span id="humidity"></span>{weatherData.main.humidity} %</li>
                        <li>Wind: <span id="wind"></span>{weatherData.wind.speed} M/S</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="container">
                  <div className="mb-4 pb-2 d-flex justify-content-center align-items-center">
                    <div className="form-check form-check-inline mx-2">
                      <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio1"
                          onChange={handleUnitChange}
                          value="celcius"
                          checked={unit === 'celcius'}
                      />
                      <label className="form-check-label" htmlFor="inlineRadio1">
                        <span id="celcius-link" style={{fontSize: "28px"}}>C°</span>
                      </label>
                    </div>

                    <div className="form-check form-check-inline mx-2">
                      <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio2"
                          onChange={handleUnitChange}
                          value="fahrenheit"
                      />
                      <label className="form-check-label" htmlFor="inlineRadio2">
                        <span id="fahrenheit-link" style={{fontSize: "28px"}}>F°</span>
                      </label>
                    </div>

                  </div>
                  <div className="mb-4 pb-2 d-flex justify-content-center align-items-center">
                    <button onClick={() => handleAddToFavorites(city)}>Mark city as Favourite</button>

                  </div>
                </div>
              </section>
          ) : (
              <section className="current-weather">
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <img src="/icons8-search-in-cloud-96.png" alt="No Result" width="100" height="100"/>
                  <p className="mt-3">Search a city...</p>
                </div>
              </section>
          )}
          <section className="container">

              {favouriteCities.length > 0 ? (
                  <div>
                    <br/><br/><br/>
                    <h3>Favourite Cities</h3>
                    <br/>
                    <ul className="list-group">
                      {favouriteCities.map((city, index) => (
                          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            {city.name}
                            <div>
                              <button onClick={() => handleSelectCity(city.name)} className="btn btn-sm btn-primary mr-2">Check
                                Weather
                              </button>
                              <button onClick={() => handleRemoveFromFavorites(city._id)} className="btn btn-sm btn-danger">Remove
                              </button>
                            </div>
                          </li>
                      ))}
                    </ul>
                  </div>
              ) : (
                  <div></div>
              )}
          </section>

          <section className="container" style={{display: 'none'}}>
            <div className="row week-forecast">
              <div className="col">
                <h3>Fri</h3>
                <br/><img
                  src="https://img.icons8.com/color-glass/42/000000/rain.png"
              /><br/>
                <p className="weather">Rain</p>
                <span>2°</span>
              </div>
              <div className="col">
                <h3>Sat</h3>
                <br/><img
                  src="https://img.icons8.com/color-glass/42/000000/cloud.png"
              /><br/>
                <p className="weather">Cloudy</p>
                <span>4°</span>
              </div>
              <div className="col">
                <h3>Sun</h3>
                <br/><img
                  src="https://img.icons8.com/color-glass/42/000000/partly-cloudy-day.png"
              /><br/>
                <p className="weather">Partly cloudy</p>
                <span>6°</span>
              </div>
              <div className="col">
                <h3>Mon</h3>
                <br/><img
                  src="https://img.icons8.com/color-glass/42/000000/sun.png"
              /><br/>
                <p className="weather">Sunny</p>
                <span>8°</span>
              </div>
              <div className="col">
                <h3>Tues</h3>
                <br/><img
                  src="https://img.icons8.com/color-glass/42/000000/wind.png"
              /><br/>
                <p className="weather">Windy</p>
                <span>5°</span>
              </div>
            </div>
          </section>
          <br/><br/><br/>
          <footer>
            <p>
              &copy; 2024 HighTable Weather App
            </p>
            {token ? (
                <div>
                  <small><a href="#" onClick={handleLogout}>Logout</a></small>
                </div>
            ) : (
                <div>
                  <small><Link href="/login">Login</Link></small>
                  <span className="vertical-bar"></span>
                  <small><Link href="/register">Register</Link></small>
                </div>
            )}
          </footer>
        </main>
        <style jsx>{`
          .list-dropdown-content {
            background-color: #f6f6f6;
            min-width: 100px;
            border: 1px solid #ddd;
            color: black;
            padding: 12px 16px;
            text-decoration: none;
            display: block;
          }

          ul li:hover {
            background-color: #ddd;
          }
          
        `}</style>
      </div>

  )
}