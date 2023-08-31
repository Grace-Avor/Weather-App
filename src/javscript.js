function formatDate(timestamp) {
  let now = new Date();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let day = now.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  day = days[now.getDay()];
  return `${day} ${hours}:${minutes}`;
}

//let h2 = document.querySelector("#date");
//h2.innerHTML = `${formateDate}`;

function formattedDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sunday"];
  return days[day];
}

function weatherForecasts(response) {
  let forecastCall = document.querySelector("#weather-forecasts");
  //let weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecast = response.data.daily; // stored the response forecast in this variable

  let forecastContent = `<div class="row">`;
  //replaced the days variale with the forecastResponse variable
  forecast.forEach(function (forecastDays, index) {
    if (index < 6) {
      forecastContent =
        forecastContent +
        `<div class="col-2">
            <div class="forecast-days">${formattedDate(forecastDays.dt)}</div>
              <img src="https://openweathermap.org/img/wn/${
                forecastDays.weather[0].icon
              }@2x.png" />
              <div class="forecast-temp">
                <span class="forecast-temp-max">${Math.round(
                  forecastDays.temp.max
                )}º</span> 
                <span class="forecast-temp-min">${Math.round(
                  forecastDays.temp.min
                )}º</span>
            </div>
      </div>`;
    }
  });

  forecastContent = forecastContent + `</div>`;
  forecastCall.innerHTML = forecastContent;
}

//created the forecast coordinate function. when this function is called it goes into the weatherForecats function and display
function forecastCoordinates(coords) {
  let apiKey = "515c9ddbeb3cda9061acfab71031839e";
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=meric`;
  axios.get(url).then(weatherForecasts);
}

function weather(response) {
  let myTemp = document.querySelector("#temp"); // define the call the temp id
  let temperature = Math.round(response.data.main.temp); // round the temp to 2 digit numbers using API call
  let cityElement = document.querySelector("#city"); // define the city id
  let cityDescription = document.querySelector("#description");
  let icon = document.querySelector("#icon");
  let humidity = document.querySelector("#humidity");
  let speed = document.querySelector("#wind");

  celsius = Math.round(response.data.main.temp);

  cityElement.innerHTML = `${response.data.name}`; // Assign the API response to city innerHTML
  myTemp.innerHTML = `${temperature}`; // Assign the rounded temp from previous
  cityDescription.innerHTML = `${response.data.weather[0].description}`;
  humidity.innerHTML = `${response.data.main.humidity}%`;
  speed.innerHTML = Math.round(response.data.wind.speed);
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  forecastCoordinates(response.data.coord); //called the forcast function in the weather api function
}

function searchAPI(city) {
  let apiKey = "ff69729f5d84be9471536bc122ea91ad";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(weather);
}

function searchButton(event) {
  event.preventDefault();
  let cities = document.querySelector("#search-input");
  searchAPI(cities.value.trim());
}

searchAPI("Nigeria");

function changeDegree(event) {
  event.preventDefault();
  let myTemp = document.querySelector("#temp");
  let fahrenheit = (celsius * 9) / 5 + 32;
  myTemp.innerHTML = `${fahrenheit}`;
}

function celsiusDegree(event) {
  event.preventDefault();
  fahrenheit.classList.add("active");
  cels.classList.remove("active");
  let myTemp = document.querySelector("#temp");
  myTemp.innerHTML = `${celsius}`;
}

let celsius = null;

let button = document.querySelector("#search-form");
button.addEventListener("click", searchButton);

/*let changeDegrees = document.querySelector("#fahrenheit");
changeDegrees.addEventListener("click", changeDegree);*/

let celsiusDegreeEvent = document.querySelector("#cels");
celsiusDegreeEvent.addEventListener("click", celsiusDegree);

//weatherForecasts();
