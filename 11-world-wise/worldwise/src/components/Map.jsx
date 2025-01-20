import styles from "./Map.module.css"
import {useNavigate, useSearchParams} from "react-router-dom";
import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent, useMapEvents} from "react-leaflet";
import {useEffect, useState} from "react";
import {useCities} from "../contexts/CitiesContext.jsx";
import {useGeolocation} from "../hooks/useGeolocation.js";
import Button from "./Button.jsx";
import {useUrlPosition} from "../hooks/useUrlPosition.js";

function Map() {
  const {cities, currentCity} = useCities()
  const [mapPosition, setMapPosition] = useState([40, 0])
  const [mapLat,  mapLng] = useUrlPosition()
  const {
    islLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition
  } = useGeolocation()

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng])
  }, [mapLat, mapLng])

  useEffect(() => {
    if (geolocationPosition) {
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng])
    }
  }, [geolocationPosition]);

  return (
    <div className={`${styles.mapContainer}`}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use current location"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
        // id="map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition}/>
        <DetectClick />
      </MapContainer>
    </div>
  )
}

function ChangeCenter({position}) {
  const map = useMap()
  map.setView(position)
  return null;
}

function DetectClick() {
  const navigate = useNavigate()

  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    }
  })
}

export default Map