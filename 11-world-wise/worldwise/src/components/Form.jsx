// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import {useEffect, useState} from "react";

import styles from "./Form.module.css";
import Button from "./Button.jsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import BackButton from "./BackButton.jsx";
import {useCities} from "../contexts/CitiesContext.jsx";
import {useUrlPosition} from "../hooks/useUrlPosition.js";
import Message from "./Message.jsx";
import Spinner from "./Spinner.jsx";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [lat, lng] = useUrlPosition()

  const {addCity} = useCities()

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false)
  const [emoji, setEmoji] = useState("")
  const [geocodingError, setGeocodingError] = useState("")

  useEffect(() => {
    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true)
        setGeocodingError("")
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
        const data = await res.json()

        if (!data.countryCode) {
          throw new Error("That doesn't seem to be a city. Click somewhere else")
        }

        setCityName(data.city || data.locality || "")
        setCountry(data.countryName)
        setEmoji(convertToEmoji(data.countryCode))
      } catch (error) {
        setGeocodingError(error.message)
      } finally {
        setIsLoadingGeocoding(false)
      }
    }
    fetchCityData()
  }, [lat, lng])

  function onAddCity() {
    addCity({
      cityName: cityName,
      country: country,
      date: date.toString(),
      notes: notes,
      position: {
        lat: lat,
        lng: lng,
      },
      id: 10
    })
  }

  if (isLoadingGeocoding) return <Spinner />

  if (geocodingError) return <Message message={geocodingError}/>

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
         <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" onClick={onAddCity}>Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
