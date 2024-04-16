import Head from 'next/head';
export default function (){
    return (
        <div>
            <Head>
                <title>Login</title>
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
                            />
                            <button type="submit">Check!</button>
                        </form>
                        <h1
                            className="col d-flex justify-content-center align-items-center city-title"
                            id="searched-city"
                        >
                            Bristol
                        </h1>
                    </div>
                    <div className="row">
                        <div className="mb-4 pb-2">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions"
                                       id="inlineRadio1"
                                       value="option1" checked/>
                                <label className="form-check-label" htmlFor="inlineRadio1"><a href="#"
                                                                                              id="celcius-link">C°</a>
                                </label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions"
                                       id="inlineRadio2"
                                       value="option2"/>
                                <label className="form-check-label" htmlFor="inlineRadio2"> <a href="#"
                                                                                               id="fahrenheit-link">F°</a></label>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="current-weather">
                    <div className="container">
                        <div className="row">
                            <h1 className="col temp-title" id="current-temperature">4°</h1>
                            <div className="col todays-info">
                                <p id="current-time">11:00</p>
                                <h2 id="current-day">Today</h2>
                                <p id="weather-type">Cloudy</p>
                            </div>
                            <div className="col d-flex align-items-center side-info">
                                <ul>
                                    <li>Humidity: <span id="humidity"></span></li>
                                    <li>Wind: <span id="wind"></span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <hr/>
                </section>

                <section className="container">
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
                <footer>
                    <p>
                        HighTable Weather Forecast
                    </p>
                </footer>
            </main>
        </div>
    )
}