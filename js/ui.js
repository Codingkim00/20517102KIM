// 전역 단위 상태
let isCelsius = true;

// 온도 변환 함수
function convertTemp(tempC) {
  return isCelsius ? tempC : (tempC * 9/5 + 32);
}

// 날씨별 배경 이미지 매핑
const backgroundMap = {
  "01": "clear.jpg",
  "02": "fewclouds.jpg",
  "03": "clouds.jpg",
  "04": "clouds2.jpg",
  "09": "drizzle.jpg",
  "10": "rain.jpg",
  "11": "thunder.jpg",
  "13": "snow.jpg",
  "50": "fog.jpg"
};

// 현재 날씨 UI 표시
function displayCurrentWeather(data) {
  const el = document.querySelector("#currentWeather");

  if (!data || !data.main) {
    el.innerHTML = "<p>날씨 정보를 불러올 수 없습니다.</p>";
    return;
  }

  const temp = Math.round(convertTemp(data.main.temp));
  const icon = data.weather[0].icon.substring(0, 2); // 배경 판단용

  // 배경 변경
  if (backgroundMap[icon]) {
    document.body.style.backgroundImage = `url('./src/assets/${backgroundMap[icon]}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
  }

  el.innerHTML = `
    <h2>${data.name}</h2>
    <h1>${temp}°${isCelsius ? "C" : "F"}</h1>

    <p>${data.weather[0].description}</p>

    <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">

    <div class="extra-info">
      <p>💧 습도: ${data.main.humidity}%</p>
      <p>🌬 풍속: ${data.wind.speed} m/s</p>
    </div>
  `;
}


// 예보 카드 표시
function displayForecast(list) {
  const container = document.querySelector("#forecast");
  container.innerHTML = "";

  if (!list) {
    container.innerHTML = "<p>예보 정보를 불러올 수 없습니다.</p>";
    return;
  }

  const daily = list.filter(item => item.dt_txt.includes("12:00:00"));

  daily.forEach(day => {
    const temp = Math.round(convertTemp(day.main.temp));
    const icon = day.weather[0].icon;

    container.innerHTML += `
      <div class="card">
        <h3>${day.dt_txt.slice(5, 10)}</h3>
        <p>${temp}°${isCelsius ? "C" : "F"}</p>
        <img src="http://openweathermap.org/img/wn/${icon}.png">
      </div>
    `;
  });
}

// 공기질 표시
function displayAirQuality(aqiData) {
  const card = document.querySelector("#airQuality");

  if (!aqiData || !aqiData.list) {
    card.innerHTML = "<p>공기질 정보를 불러올 수 없습니다.</p>";
    return;
  }

  const aqi = aqiData.list[0].main.aqi;
  const levels = ["좋음", "보통", "나쁨", "매우 나쁨", "위험"];

  card.innerHTML = `
    <h2>공기질</h2>
    <p>AQI: ${aqi} (${levels[aqi - 1]})</p>
  `;
}
