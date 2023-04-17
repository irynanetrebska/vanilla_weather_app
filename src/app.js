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
}

let apiKey = "a339ota3fb01500d5581a0bb40c20254";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Talence&key=${apiKey}&units=metric`;

console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);
