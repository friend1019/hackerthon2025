import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../COMMON/Header";
import "../../CSS/PLACE/PlaceDetail.css";
import api from "../../API/axios";
import { FiChevronLeft } from "react-icons/fi";
import NaverMap from "../MAPS/NaverMap";
import DefaultStoreImg from "../../IMAGE/defaultImage.svg";
import { motion, AnimatePresence } from "framer-motion";

function PlaceDetail() {
  const params = useParams();
  const isStore = window.location.pathname.startsWith("/store/");
  const id = params.id;

  const [place, setPlace] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        let response;
        if (isStore) {
          response = await api.get(`/store/${id}`);
        } else {
          response = await api.get(`/tourist-places/${id}`);
        }
        setPlace(response.data);
      } catch (error) {
        console.error("상세 데이터 불러오기 실패:", error);
        setPlace(null);
      }
    };
    fetchPlace();
  }, [id, isStore]);

  const handleBack = () => {
    setShouldRender(false);
  };

  const handleCloseMap = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowMap(false);
      setIsClosing(false);
    }, 200);
  };

  const coordinates =
    place?.latitude && place?.longitude
      ? `${place.latitude},${place.longitude}`
      : null;

  const imageSrc = place?.imageUrl || place?.image || DefaultStoreImg;

  return (
    <>
      <Header />
      <button className="place-back-btn" onClick={handleBack}>
        <FiChevronLeft size={50} />
      </button>

      <div className="place-detail">
        <AnimatePresence
          mode="wait"
          onExitComplete={() => {
            window.history.back();
          }}
        >
          {shouldRender && place && (
            <motion.div
              key="place-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="place-detail-image">
                <img src={imageSrc} alt={place.name} />
              </div>
              <div className="place-detail-info">
                <div className="place-titlebox">
                  <h2 className="place-name">{place.name}</h2>
                  <hr className="place-divider" />
                  <button
                    className="place-map-btn"
                    onClick={() => setShowMap(true)}
                  >
                    지도 보기 &gt;
                  </button>
                </div>
                <div className="place-row">
                  <div className="place-label">주소</div>
                  <div className="place-value">
                    {place.address}
                    {place.detailAddress ? ` (${place.detailAddress})` : ""}
                  </div>
                </div>
                {place.location && (
                  <div className="place-row">
                    <div className="place-label">행정동</div>
                    <div className="place-value">{place.location}</div>
                  </div>
                )}
                {place.description && (
                  <div className="place-row">
                    <div className="place-label">소개</div>
                    <div className="place-value">{place.description}</div>
                  </div>
                )}
                {place.category && (
                  <div className="place-row">
                    <div className="place-label">카테고리</div>
                    <div className="place-value">{place.category}</div>
                  </div>
                )}
                {place.type && (
                  <div className="place-row">
                    <div className="place-label">유형</div>
                    <div className="place-value">{place.type}</div>
                  </div>
                )}
                {place.finalType && (
                  <div className="place-row">
                    <div className="place-label">유형</div>
                    <div className="place-value">{place.finalType}</div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showMap && (
        <div className="place-map-modal">
          <div className="place-map-modal-bg" onClick={handleCloseMap} />
          <div
            className={`place-map-modal-content ${
              isClosing
                ? "place-map-modal-animate-out"
                : "place-map-modal-animate"
            }`}
          >
            <button className="place-map-modal-close" onClick={handleCloseMap}>
              닫기
            </button>
            <NaverMap
              coordinates={coordinates}
              height={400}
              zoom={14}
              placeCard={{
                imageUrl: imageSrc,
                name: place?.name,
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default PlaceDetail;
