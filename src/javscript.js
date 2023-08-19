function weather(response) {
  console.log(response);
  console.log(response.data.name);

  let myTemp = document.querySelector("#temp"); // define the call the temp id
  let city = document.querySelector("#city"); // define the city id

  let temperature = Math.round(response.data.main.temp); // round the temp to 2 digit numbers using API call

  city.innerHTML = `${response.data.name}`; // Assign the API response to city innerHTML
  myTemp.innerHTML = `${temperature}°C`; // Assign the rounded temp from previous
}

function searchButton(event) {
  event.preventDefault();
  let cities = document.querySelector("#search-input");
  let getCities = document.querySelector("#city");

  getCities.innerHTML = `${cities.value}`;

  let apiKey = "ff69729f5d84be9471536bc122ea91ad";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cities.value}&appid=${apiKey}&units=metric`;
  axios.get(url).then(weather);
}

let button = document.querySelector("#search-form");
button.addEventListener("click", searchButton);

let now = new Date();

let h2 = document.querySelector("#h2");

let minutes = now.getMinutes();
let hours = now.getHours();
let date = now.getDate();
let day = now.getDay();
let monthList = [
  "Jan",
  "Feb",
  "Mar",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
month = monthList[now.getMonth()];
let year = now.getFullYear();

h2.innerHTML = `${month}, ${date}, ${year} ${hours}:${minutes}`;
