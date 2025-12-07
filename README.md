# 🌤️ 나만의 날씨예보 웹사이트

바닐라 JavaScript와 OpenWeather API, Leaflet(RainViewer 레이더) 기반으로 만든  
나만의 날씨 웹사이트입니다.  
도시 검색, 현재 날씨 표시, 5일 예보, 공기질(AQI), 기상 레이더, 단위 전환,  
최근 검색어 저장, 자동 위치 감지 기능을 제공합니다.

---

## 🚀 주요 기능

### ✔ 도시 검색
- 도시 입력 → 버튼 클릭 또는 Enter로 검색
- 한국어 도시명도 지원 (수원 → Suwon 자동 변환 가능)

### ✔ 현재 날씨 표시
- 온도(섭씨/화씨), 날씨 상태, 아이콘
- 습도, 풍속, 공기질(AQI)
- 날씨 상태에 따라 **자동 배경 이미지 변경**

### ✔ 3~5일 예보 카드
- 매일 12시 예보 기준으로 날짜 / 온도 / 아이콘 표시

### ✔ 단위 전환 (°C ↔ °F)
- 버튼 클릭 → 현재 날씨 & 예보 모두 자동 변환

### ✔ 최근 검색어 저장 (localStorage)
- 최근 5개까지 저장
- 버튼 클릭 시 바로 검색됨

### ✔ 위치 자동 감지 (Geolocation)
- 처음 접속 시 현재 위치의 날씨 자동 표시

### ✔ 실시간 기상 레이더 (RainViewer)
- 비·눈·강수량 실시간 애니메이션 표시
- Leaflet 기반 지도 UI

---

## 🗂️ 프로젝트 구조


---

## 🔑 환경변수(API Key) 설정 (Vercel)

OpenWeather API Key는 클라이언트에 직접 노출되면 안 되므로  
Vercel 환경변수에 등록하여 사용합니다.

### 1) Vercel → Project Settings → Environment Variables  
다음 변수 추가:

| Name | Value |
|------|--------|
| API_KEY | (OpenWeather API Key) |

### 2) Deploy → 재배포

### 3) api.js에서는 다음 방식으로 API Key를 사용합니다.

```javascript
const API_KEY = import.meta.env.VITE_API_KEY || process.env.API_KEY;
