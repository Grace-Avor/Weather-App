function weather(response) {
  let myTemp = document.querySelector("#temp"); // define the call the temp id
  let temperature = Math.round(response.data.main.temp); // round the temp to 2 digit numbers using API call
  let city = document.querySelector("#city"); // define the city id
  let cityDescription = document.querySelector("#description");
  let icon = document.querySelector("#icon");
  let humidity = document.querySelector("#humidity");
  let speed = document.querySelector("#wind");

  celsius = Math.round(response.data.main.temp);

  city.innerHTML = `${response.data.name}`; // Assign the API response to city innerHTML
  myTemp.innerHTML = `${temperature}`; // Assign the rounded temp from previous
  cityDescription.innerHTML = `${response.data.weather[0].description}`;
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  humidity.innerHTML = `${response.data.main.humidity}%`;
  speed.innerHTML = Math.round(response.data.wind.speed);
}

function searchAPI(cities) {
  let apiKey = "ff69729f5d84be9471536bc122ea91ad";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cities.value}&appid=${apiKey}&units=metric`;
  axios.get(url).then(weather);
}

function searchButton(event) {
  event.preventDefault();
  let cities = document.querySelector("#search-input");
  searchAPI(cities);
}

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

function weatherForecasts() {
  let forecastCall = document.querySelector("#weather-forecasts");
  let forecastContent = `<div class="row">`;

  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastContent =
      forecastContent +
      `<div class="col-2">
            <div class="forecast-days">${day}</div>
              <img src="images/icon.png" class="image-icon" alt="icon" />
              <div class="forecast-temp">
                <span class="forecast-temp-max">18℃</span> 
                <span class="forecast-temp-min">20℃</span>
            </div>
      </div>`;
  });

  forecastContent = forecastContent + `</div>`;
  forecastCall.innerHTML = forecastContent;
}
weatherForecasts();

let celsius = null;

let button = document.querySelector("#search-form");
button.addEventListener("click", searchButton);

let changeDegrees = document.querySelector("#fahrenheit");
changeDegrees.addEventListener("click", changeDegree);

let celsiusDegreeEvent = document.querySelector("#cels");
celsiusDegreeEvent.addEventListener("click", celsiusDegree);


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
let dayList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
day = dayList[now.getDay()];
let h2 = document.querySelector("#date");
h2.innerHTML = `${day} ${hours}:${minutes}`;
