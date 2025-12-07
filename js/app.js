let currentCity = "";

// 검색 실행
document.querySelector("#searchBtn").addEventListener("click", searchCity);
document.querySelector("#cityInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchCity();
});

// 단위 전환 버튼
document.querySelector("#toggleUnit").addEventListener("click", () => {
  isCelsius = !isCelsius;
  if (currentCity) loadAllWeather(currentCity);
});

// 최근 검색 저장
function saveRecent(city) {
  let list = JSON.parse(localStorage.getItem("recent") || "[]");
  list = [city, ...list.filter(v => v !== city)].slice(0, 5);
  localStorage.setItem("recent", JSON.stringify(list));
  renderRecent();
}

// 최근 검색 버튼 생성
function renderRecent() {
  const container = document.querySelector("#recentList");
  container.innerHTML = "";

  const list = JSON.parse(localStorage.getItem("recent") || "[]");

  list.forEach(city => {
    const btn = document.createElement("button");
    btn.className = "recentBtn";
    btn.innerText = city;
    btn.onclick = () => loadAllWeather(city);
    container.appendChild(btn);
  });
}

// 도시 검색
function searchCity() {
  const city = document.querySelector("#cityInput").value.trim();
  if (!city) return alert("도시명을 입력해주세요.");

  currentCity = city;
  saveRecent(city);
  loadAllWeather(city);
}

// 전체 날씨 로딩
async function loadAllWeather(city) {
  try {
    const current = await fetchWeather(city);
    displayCurrentWeather(current);

    const forecast = await fetchForecast(city);
    displayForecast(forecast.list);

    const aqi = await fetchAirQuality(current.coord.lat, current.coord.lon);
    displayAirQuality(aqi);

    loadRadarMap(current.coord.lat, current.coord.lon);

  } catch (err) {
    alert("잘못된 도시명입니다.");
  }
}

// 자동 위치 감지
navigator.geolocation.getCurrentPosition(async (pos) => {
  const lat = pos.coords.latitude;
  const lon = pos.coords.longitude;

  const url =
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`;

  const res = await fetch(url);
  const data = await res.json();

  currentCity = data.name;
  saveRecent(data.name);
  loadAllWeather(data.name);

}, () => {
  console.log("위치 권한 없음");
});

// 페이지 로드시 최근 검색 표시
renderRecent();
