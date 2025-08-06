import React, { useEffect, useRef } from 'react';
import '../styles/MapContainer.css';

function MapContainer() {
  const mapRef = useRef(null);

  useEffect(() => {
    const kakaoMapKey = process.env.REACT_APP_KAKAO_MAP_API_KEY;
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapKey}&autoload=false`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = mapRef.current;
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.9780),
          level: 3
        };
        new window.kakao.maps.Map(container, options);
      });
    };
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return <div className="map-container" ref={mapRef}></div>;
}

export default MapContainer;