import { useEffect } from 'react';

function NaverMap({ onSelect }) {
  useEffect(() => {
    const map = new window.naver.maps.Map('map', {
      center: new window.naver.maps.LatLng(36.71147, 126.54738), // 서산
      zoom: 10,
    });

    let marker = null;
    window.naver.maps.Event.addListener(map, 'click', function(e) {
      const lat = e.coord.lat();
      const lng = e.coord.lng();
      if (marker) marker.setMap(null);
      marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(lat, lng),
        map,
      });
      if (onSelect) onSelect(`${lat},${lng}`);
    });
  }, [onSelect]);

  return (
    <div id="map" style={{ width: '100%', height: '400px' }} />
  );
}

export default NaverMap;