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
  console.log(response.data);
  let temperature = document.querySelector("#temp-value");
  temperature.innerHTML = Math.round(response.data.temperature.current);
  let h1 = document.querySelector("#city");
  h1.innerHTML = response.data.city;
  let descriptionElement = document.querySelector(".description");
  descriptionElement.innerHTML = response.data.condition.description;
  let humidityValue = document.querySelector(".hum-value");
  humidityValue.innerHTML = response.data.temperature.humidity;
  let windValue = document.querySelector(".wind-value");
  windValue.innerHTML = Math.round(response.data.wind.speed);
  let dayTimeElement = document.querySelector(".day");
  dayTimeElement.innerHTML = formatDate(response.data.time * 1000);
}

let apiKey = "a339ota3fb01500d5581a0bb40c20254";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Talence&key=${apiKey}&units=metric`;

console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);
