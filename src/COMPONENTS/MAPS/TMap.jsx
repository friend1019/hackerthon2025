import { useEffect } from 'react';

function TMap() {
  useEffect(() => {
    const map = new window.Tmapv2.Map('tmap', {
      center: new window.Tmapv2.LatLng(36.71147, 126.54738), // 서산
      width: '100%',
      height: '400px',
      zoom: 10,
    });

    new window.Tmapv2.Marker({
      position: new window.Tmapv2.LatLng(36.71147, 126.54738),
      map,
    });
  }, []);

  return (
    <div id="tmap" style={{ width: '100%', height: '400px' }} />
  );
}

export default TMap;