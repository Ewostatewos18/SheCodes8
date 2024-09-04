const apiKey = '68f4o5290c2fb3fd7ac99fbd97a4dtd3'; // Replace with your OpenWeatherMap API key

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  // Fetch current weather
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => displayWeather(data))
    .catch(error => alert('City not found! Please try again.'));

  // Fetch 5-day forecast
  let forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  fetch(forecastUrl)
    .then(response => response.json())
    .then(data => displayForecast(data.daily))
    .catch(error => console.error('Error fetching forecast:', error));
}

function displayWeather(data) {
  let cityElement = document.querySelector("#current-city");
  let temperatureElement = document.querySelector(".current-temperature-value");
  let weatherDescriptionElement = document.querySelector(".current-details");
  let iconElement = document.querySelector(".current-temperature-icon");

  cityElement.innerHTML = data.city;
  temperatureElement.innerHTML = Math.round(data.temperature.current);
  weatherDescriptionElement.innerHTML = `${formatDate(new Date())}, ${data.condition.description} <br />Humidity: <strong>${data.temperature.humidity}%</strong>, Wind: <strong>${data.wind.speed} km/h</strong>`;

  iconElement.innerHTML = `<img src="${data.condition.icon_url}" alt="${data.condition.description}" style="width: 50px; height: 50px;" />`;
}

function displayForecast(forecast) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = ""; // Clear previous forecast data

  forecast.slice(0, 5).forEach(day => {
    forecastElement.innerHTML += `
      <div class="forecast-day">
        <div>${formatDay(day.time)}</div>
        <img src="${day.condition.icon_url}" alt="${day.condition.description}" class="forecast-icon" />
        <div class="forecast-temp">${Math.round(day.temperature.day)}°C</div>
      </div>
    `;
  });
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
