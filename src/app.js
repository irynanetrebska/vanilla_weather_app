function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = date.getDay();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${days[day]} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let temperature = document.querySelector("#temp-value");
  let h1 = document.querySelector("#city");
  let descriptionElement = document.querySelector(".description");
  let humidityValue = document.querySelector(".hum-value");
  let windValue = document.querySelector(".wind-value");
  let dayTimeElement = document.querySelector(".day");
  let iconElement = document.querySelector("#icon");
  let iconCode = response.data.condition.icon;

  celciusTemperature = Math.round(response.data.temperature.current);

  temperature.innerHTML = celciusTemperature;
  h1.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityValue.innerHTML = response.data.temperature.humidity;
  windValue.innerHTML = Math.round(response.data.wind.speed * 3.6);
  dayTimeElement.innerHTML = formatDate(response.data.time * 1000);
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${iconCode}.png`
  );
  iconElement.setAttribute("alt", `${response.data.condition.icon}`);
}

function search(cityDisplay) {
  let apiKey = "a339ota3fb01500d5581a0bb40c20254";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityDisplay}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let cityInputElement = document.querySelector("#city-input");
  let searchedCity = cityInputElement.value.trim();
  search(searchedCity);
}

search("Talence");

function convertToFahrehheit(event) {
  event.preventDefault();
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let cityDisplay = document.querySelector("#city");
  let apiKey = "a339ota3fb01500d5581a0bb40c20254";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityDisplay.innerHTML}&key=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(function (response) {
    let farenheitValue = document.querySelector("#temp-value");
    farenheitValue.innerHTML = Math.round(response.data.temperature.current);
  });
}

function convertToCelcius(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperature = document.querySelector("#temp-value");
  temperature.innerHTML = celciusTemperature;
}

let celciusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrehheit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertToCelcius);
