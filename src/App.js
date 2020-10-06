import React, { Component } from 'react';
import logo from './logo.svg';
import "./Style.scss";
import windElement from "./images/wi-wind-deg2.svg";
import sun from "./images/sunny.svg";

class App extends Component {
    state = {
        value: '',
        temp: false,
        country: '',
        countryState: '',
        name: '',
        pressure: '',
        sunrise: '',
        sunset: '',
        wind: '',
        weatherCode: '',
        weatherIcon: '',
        humidity: '',
        clouds: '',
        description: '',
        err: false
    };

    changeValue = (e) => this.setState({value: e.target.value});
    changeCountry =(e) => this.setState({country: e.target.value});
    execute = (e) => {
        e.preventDefault();
        console.log('hej');
        if(this.state.value && this.state.country) {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.value},${this.state.country}&appid=da3f20019c7a316cac57d973be18e3ab&units=metric&lang=pl`)
        // `api.openweathermap.org/data/2.5/weather?q=${this.state.value},${this.state.country}&appid=da3f20019c7a316cac57d973be18e3ab&units=metric&lang=pl`
            .then(resp => resp.json())
            .then(resp => {
                this.setState({
                    temp: resp.main.temp,
                    name: resp.name,
                    countryState: resp.sys.country,
                    pressure: resp.main.pressure,
                    sunrise: resp.sys.sunrise,
                    sunset: resp.sys.sunset,
                    wind: resp.wind.speed,
                    windDirection: resp.wind.deg,
                    weatherCode: resp.weather[0].id,
                    weatherIcon: resp.weather[0].icon,
                    description: resp.weather[0].description,
                    humidity: resp.main.humidity,
                    clouds: resp.clouds.all,
                    err: false
                });
            })
            .catch(err => {
                // console.log("bład"),
                this.setState({err: true})
            })
        } else {
            this.setState({err: true});
        }
    };

    render() {
        let errorName;
        if(this.state.err) {
            errorName = <div>
                <h4 id='throwError'>Niepoprawna nazwa miasta lub państwa</h4>
                </div>
        }
        return <>
        <div className='former'>
            <div className='maxContainer'>
                <Header />
                {errorName}
                <div className='formContainer'>
                    <form onSubmit={this.execute}>
                        <input type="text" placeholder='Miasto' value={this.state.value} onChange={this.changeValue} />
                        <input type="text" placeholder="Kod państwa" value={this.state.country} onChange={this.changeCountry} />
                        <button className="btn btn1" type='submit'>Szukaj</button>
                    </form>
                </div>
                <div className='DisplayContainer'>
                    <DisplayLeft
                        temp={this.state.temp}
                        name={this.state.name}
                        pressure={this.state.pressure}
                        sunrise={this.state.sunrise}
                        sunset={this.state.sunset}
                        wind={this.state.wind}
                        weatherIcon={this.state.weatherIcon}
                        humidity={this.state.humidity}
                        windDirection={this.state.windDirection}
                        clouds={this.state.clouds}
                        description={this.state.description}
                        country={this.state.countryState}
                    />
                </div>
            </div>
        </div>
        </>
    }
}

class Header extends Component {
    render() {
        return <div className='headerImg'>
            <h1 className='text'>Weather Api</h1>
        </div>
    }
}

class DisplayLeft extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const sunriseTime = new Date(this.props.sunrise * 1000).toLocaleTimeString();
        const sunsetTime = new Date(this.props.sunset * 1000).toLocaleTimeString();
        if (!this.props.temp) {
            return <div className='elementContainer'>
                <div id='dane'>
                        <div className='element'>
                            <img id='sunAnime' src={sun} />
                        </div>
                 </div>
            </div>
        } else {
            return <div className='elementContainer'>
                        <div className='leftElement'>
                        <div className='Image'>
                            <img className='weatherImg' src={`http://openweathermap.org/img/wn/${this.props.weatherIcon}@2x.png`} />
                         </div>
                            <div className='cityName'>
                            <h1>{this.props.name}</h1>
                            <h2>{this.props.country}</h2>
                            </div>
                            <div className='infoElement'>
                                <div className='insideElement'>
                                    <h1>Temperatura: </h1>
                                </div>
                                <div className='insideElement'>
                                    <h1>{this.props.temp} &#176;C</h1>
                                </div>
                            </div>
                            <div className='infoElement'>
                                <div className='insideElement'>
                                    <h1>Pogoda: </h1>
                                </div>
                                <div className='insideElement'>
                                    <h1>{this.props.description}</h1>
                                </div>
                            </div>
                            <div className='infoElement'>
                                <div className='insideElement'>
                                    <h1>Ciśnienie: </h1>
                                </div>
                                <div className='insideElement'>
                                    <h1>{this.props.pressure} hPa</h1>
                                </div>
                            </div>
                            <div className='infoElement'>
                                <div className='insideElement'>
                                    <h1>Wiatr: </h1>
                                </div>
                                <div className='insideElement'>
                                    <h1>{this.props.wind} m/s</h1>
                                </div>
                            </div>
                            <div className='infoElement'>
                                <div className='insideElement'>
                                    <img id="weatherIcon" style={{transform: `rotate(${this.props.windDirection}deg)`}} src={windElement}/>
                                </div>
                            </div>
                            <div className='infoElement'>
                                <div className='insideElement'>
                                    <h1>Zachmurzenie: </h1>
                                </div>
                                <div className='insideElement'>
                                    <h1>{this.props.clouds}%</h1>
                                </div>
                            </div>
                            <div className='infoElement'>
                                <div className='insideElement'>
                                    <h1>Wilgotność: </h1>
                                </div>
                                <div className='insideElement'>
                                    <h1>{this.props.humidity} %</h1>
                                </div>
                            </div>
                            <div className='infoElement'>
                                <div className='insideElement'>
                                    <h1>Wschód słońca: </h1>
                                </div>
                                <div className='insideElement'>
                                    <h1>{sunriseTime}</h1>
                                </div>
                            </div>
                            <div className='infoElement'>
                                <div className='insideElement'>
                                    <h1>Zachód słońca: </h1>
                                </div>
                                <div className='insideElement'>
                                    <h1>{sunsetTime}</h1>
                                </div>
                            </div>
                        </div>
                     </div>
        }
    }
}

export default App;
