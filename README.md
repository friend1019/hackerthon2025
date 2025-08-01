# 🧭 서산책 (Seosan Check)
---

**2025 중앙해커톤 - 한서대학교 5팀 (최윤영, 이재형, 이지후, 최지인, 이강현, 한준호)**

> 충남 서산·태안 지역의 지역경제와 여행을 연결하는  
> **AI 기반 웹 여행 코스 추천 서비스**
>  **여행 편의성과 지역경제 활성화**를 동시에 도모하는 서비스

---

## 📌 프로젝트 소개

**서산AI**는 관광객과 지역 소상공인을 연결하는 AI 기반 여행 추천 플랫폼입니다.  
사용자의 여행 목적, 시간, 이동수단 등을 바탕으로  
서산/태안 지역의 **맞춤형 코스를 자동 추천**하고,  
**위치 기반 가맹점·교통 정보**까지 함께 안내합니다.

---

## 🛠️ 주요 기능 (MVP)

| 기능 | 설명 |
|------|------|
| 🔍 AI 여행 코스 추천 | 관심사 기반 맞춤 코스 자동 추천 |
| 🚗 이동 수단별 동선 안내 | 도보/자가용/버스 선택별 루트 생성 |
| 🗺️ 장소별 상세 정보 | 소개, 주소, 지역화폐 사용 가능 여부 표시 |
| 📍 거리·시간 표시 | 장소 간 거리/이동 시간 요약 |
| 💬 실시간 위치 기반 연동 (선택) | 지도 마커 or 위치 기반 거리 안내 (선택 구현) |

---

## 🧩 기술 스택

- **Frontend**: React.js (Vite), React Router
- **Styling**: TailwindCSS or custom rem CSS
- **지도 API**: Kakao Maps SDK
- **위치 정보**: Geolocation API (브라우저)
- **AI 추천**: GPT API or JSON 기반 유사도 매칭 로직
- **배포**: Netlify / Vercel / Render
