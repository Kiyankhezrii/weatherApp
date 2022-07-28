// api url
// https://api.weatherapi.com/v1/forecast.json?key=0ba01d1c3a4c4c67a4662712223003&q=London&days=6&aqi=no&alerts=no
// 0ba01d1c3a4c4c67a4662712223003

// get element form DOM
const input = document.querySelector(".form-container input");
const form = document.querySelector(".form-container");
const infoNameCity = document.querySelector(".name-city");
const typeOfWeather = document.querySelector(".left__weather-infos");
const infosContainer = document.querySelector(".right__weather-infos");
const forecast = document.querySelector(".forecast-items");

const maxTemp = document.querySelector(".max");
const lowTemp = document.querySelector(".low");
const rain = document.querySelector(".rain");
const pressure = document.querySelector(".pressure");
const windDir = document.querySelector(".wind_dir");
const windMph = document.querySelector(".wind_mph");
const sunrise = document.querySelector(".sunrise");
const sunset = document.querySelector(".sunset");
const time = document.querySelector(".time");

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const date = new Date();

const getData = async function (cityName) {
  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=0ba01d1c3a4c4c67a4662712223003&q=${cityName}&days=6&aqi=yes&alerts=no`
    );
    if (!res.ok) throw new Error("please write a correct city name ...");
    const data = [await res.json()];
    renderInfo(data);
  } catch (err) {
    console.log(err.message);
  }
};

const renderInfo = function (datas) {
  const {
    current,
    forecast: { forecastday },
    location,
  } = datas[0];

  console.log(current);
  console.log(forecastday);
  console.log(location);

  infoNameCity.querySelector(
    ".name"
  ).textContent = `${location.name}, ${location.country}`;
  infoNameCity.querySelector(".date").textContent = `${
    weekday[date.getDay()]
  } ${date.getDate()} ${monthNames[date.getMonth()]}`;

  const degreeHtml = `
      <img src="${current.condition.icon}" alt="icon of weather" />
      <div class="info-degree">
          <h2 class="degree">${current.temp_c}<sup>°</sup></h2>
          <p class="degree-title">${current.condition.text}</p>
      </div>
    `;
  typeOfWeather.insertAdjacentHTML("afterbegin", degreeHtml);

  // maxTemp
  maxTemp.querySelector("p").textContent = `${forecastday[0].day.maxtemp_c}°`;

  // Windmph
  windMph.querySelector("p").textContent = `${current.wind_mph}mph`;

  // sunrise
  sunrise.querySelector("p").textContent = `${forecastday[0].astro.sunrise}`;

  // low
  lowTemp.querySelector("p").textContent = `${forecastday[0].day.mintemp_c}°`;

  // rain
  rain.querySelector(
    "p"
  ).textContent = `${forecastday[0].day.daily_chance_of_rain}%`;

  // sunset
  sunset.querySelector("p").textContent = `${forecastday[0].astro.sunset}`;

  // time
  time.querySelector("p").textContent = `${location.localtime}`;
  setInterval(() => {
    time.querySelector("p").textContent = `${location.localtime}`;
  }, 60000);
};

// Event listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputVal = input.value;
  getData(inputVal);
  input.value = "";
});

document.addEventListener("DOMContentLoaded", () => {
  getData("ahvaz");
});
