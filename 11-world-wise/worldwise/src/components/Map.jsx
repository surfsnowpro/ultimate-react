import styles from "./Map.module.css"
import {useNavigate, useSearchParams} from "react-router-dom";
import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent, useMapEvents} from "react-leaflet";
import {useEffect, useState} from "react";
import L from "leaflet";
import {useCities} from "../contexts/CitiesContext.jsx";

function Map() {
  const { cities, currentCity } = useCities()
  const [mapPosition, setMapPosition] = useState([40, 0])

  const [searchParams, setSearchParams] = useSearchParams()

  const mapLat = searchParams.get("lat") || 40
  const mapLng = searchParams.get("lng") || 0

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng])
  }, [mapLat, mapLng])

  return (
    <div
      id="map"
      className={`${styles.mapContainer}`}
      // onClick={() => {
      //   navigate("form")
      // }}
    >
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
        <ChangeCenter position={mapPosition} />
        <DetectClick setSearchParams={setSearchParams} />
      </MapContainer>
    </div>
  )
}

function ChangeCenter({ position }) {
  const map = useMap()
  map.setView(position)
  return null;
}

function DetectClick({ setSearchParams }) {
  const navigate = useNavigate()

  useMapEvents({
    click: (e) => {
      console.log(e.latlng)
      // setSearchParams({ lat: e.latlng.lat, lng: e.latlng.lng })
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
  }})
}

export default Map