let radarMap;
let radarFrames = [];
let radarLayer = null;
let animationIndex = 0;

async function loadRadarMap(lat, lon) {
  if (!radarMap) {
    radarMap = L.map("map").setView([lat, lon], 7);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap",
    }).addTo(radarMap);
  }

  const res = await fetch("https://api.rainviewer.com/public/weather-maps.json");
  const data = await res.json();

  // past(과거 프레임 + 현재 프레임)
  radarFrames = data.radar.past;

  startRadarAnimation();
}

function startRadarAnimation() {
  if (radarFrames.length === 0) return;

  if (radarLayer) radarMap.removeLayer(radarLayer);

  const frame = radarFrames[animationIndex];

  // RainViewer 최신 타일 URL 규칙 적용 (정답)
  const tileUrl = `https://tilecache.rainviewer.com/v2/${frame.path}/256/{z}/{x}/{y}/2/1_1.png`;

  radarLayer = L.tileLayer(tileUrl, {
    tileSize: 256,
    opacity: 0.85,
    zIndex: 999,
  });

  radarLayer.addTo(radarMap);

  animationIndex = (animationIndex + 1) % radarFrames.length;

  // 0.5초 간격으로 애니메이션
  setTimeout(startRadarAnimation, 500);
}
