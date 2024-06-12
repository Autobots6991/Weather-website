// state
let currCity = "London";
let units = "metric";

// Selectors
let city = $(".weather__city");
let datetime = $(".weather__datetime");
let weather__forecast = $('.weather__forecast');
let weather__temperature = $(".weather__temperature");
let weather__icon = $(".weather__icon");
let weather__minmax = $(".weather__minmax")
let weather__realfeel = $('.weather__realfeel');
let weather__humidity = $('.weather__humidity');
let weather__wind = $('.weather__wind');
let weather__pressure = $('.weather__pressure');

// search
$(".weather__search").on('submit',(e) => {
    let search = $(".weather__searchform");
    // prevent default action
    e.preventDefault();
    // change current city
    currCity = search.val();
    // get weather forecast 
    getWeather();
    // clear form
    search.value = ""
})

// set units
$(".weather_unit_celsius").click(() => {
    if(units !== "metric"){
        // change to metric
        units = "metric"
        // get weather forecast 
        getWeather()
    }
})

$(".weather_unit_farenheit").click(() => {
    if(units !== "imperial"){
        // change to imperial
        units = "imperial"
        // get weather forecast 
        getWeather()
    }
})

function convertTimeStamp(timestamp, timezone){
     const convertTimezone = timezone / 3600; // convert seconds to hours 

    const date = new Date(timestamp * 1000);
    
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZone: `Etc/GMT${convertTimezone >= 0 ? "-" : "+"}${Math.abs(convertTimezone)}`,
        hour12: true,
    }
    return date.toLocaleString("en-US", options)
   
}

function getWeather(){
    const API_KEY = '5506b39b271a1511c0ede0116acf841f'
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}`)
    .then((response) => {
    let data = response.data
    console.log(data)
    city.html(`${data.name}, ${data.sys.country}`)
    datetime.html(convertTimeStamp(data.dt, data.timezone))
    weather__forecast.html(`<p>${data.weather[0].main}`)
    weather__temperature.html(`${data.main.temp.toFixed()}&#176`)
    weather__icon.attr('src',`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`)
    weather__minmax.html(`<p>Min: ${data.main.temp_min.toFixed()}&#176</p><p>Max: ${data.main.temp_max.toFixed()}&#176</p>`)
    weather__realfeel.html(`${data.main.feels_like.toFixed()}&deg`)
    weather__humidity.html(`${data.main.humidity}%`)
    weather__wind.html(`${data.wind.speed} ${units === "imperial" ? "mph": "m/s"}` )
    weather__pressure.html(`${data.main.pressure} hPa`)
})}

$(document).ready(getWeather())