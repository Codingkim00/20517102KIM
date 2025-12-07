// 로컬 테스트용 KEY
// 배포 시에는 window.__API_KEY__ 로 주입됨
const API_KEY = window.__API_KEY__ || "9b8c34977ee04b3e2670eefff5d9a5c8";

async function fetchWeather(city) {
  const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=kr`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.cod !== 200) throw new Error(data.message);
  return data;
}

async function fetchForecast(city) {
  const url =
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=kr`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.cod !== "200") throw new Error(data.message);
  return data;
}

async function fetchAirQuality(lat, lon) {
  const url =
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

  const res = await fetch(url);
  return await res.json();
}
