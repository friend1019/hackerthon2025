
import { useEffect, useRef } from 'react';

function NaverMap({ coordinates, onSelect, height = 400, zoom = 10, placeCard }) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);


  useEffect(() => {
    if (!window.naver?.maps) return;
    let center = new window.naver.maps.LatLng(36.71147, 126.54738);
    if (coordinates) {
      const [lat, lng] = coordinates.split(',').map(Number);
      center = new window.naver.maps.LatLng(lat, lng);
    }
    const map = new window.naver.maps.Map(mapRef.current, {
      center,
      zoom,
    });

    // marker & InfoWindow
    if (coordinates) {
      if (markerRef.current) markerRef.current.setMap(null);
      markerRef.current = new window.naver.maps.Marker({
        position: center,
        map,
      });
      // placeCard InfoWindow
      if (placeCard) {
        const infoHtml = `
          <div class="naver-map-place-card">
            <div class="naver-map-place-card-img-wrap">
              <img src="${placeCard.imageUrl}" alt="${placeCard.name}" />
            </div>
            <div class="naver-map-place-card-name">${placeCard.name}</div>
          </div>
        `;
        const infoWindow = new window.naver.maps.InfoWindow({
          content: infoHtml,
          anchorSize: new window.naver.maps.Size(0, 0),
          pixelOffset: new window.naver.maps.Point(0, -10),
          backgroundColor: 'transparent',
          borderWidth: 0,
          disableAutoPan: true,
        });
        infoWindow.open(map, markerRef.current);
      }
    } else {
      window.naver.maps.Event.addListener(map, 'click', function(e) {
        const lat = e.coord.lat();
        const lng = e.coord.lng();
        if (markerRef.current) markerRef.current.setMap(null);
        markerRef.current = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(lat, lng),
          map,
        });
        if (onSelect) onSelect(`${lat},${lng}`);
      });
    }
    // cleanup
    return () => {
      if (markerRef.current) markerRef.current.setMap(null);
    };
  }, [coordinates, onSelect, zoom, placeCard]);

  return (
    <div ref={mapRef} style={{ width: '100%', height: `${height}px` }} />
  );
}

export default NaverMap;