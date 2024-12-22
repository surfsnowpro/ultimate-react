import styles from "./CountryList.module.css"
import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";
import CountryItem from "./CountryItem.jsx";
import {useCities} from "../contexts/CitiesContext.jsx";

function CountryList() {
  const { cities, isLoading } = useCities()

  if (isLoading) return <Spinner />

  if (!cities.length) return <Message message="Add your first city by clicking on a city on the map." />

  const countries = cities.reduce((arr, city) => {
      if (!arr.map(el => el.name).includes(city.country)) {
        return [...arr, { name: city.country, emoji: city.emoji, id: city.id }]
      } else {
        return arr
      }
    }, [])
  return (
    <ul className={styles.countryList}>
      {countries.map(country => (
        <CountryItem key={country.id} country={country} />
      ))}
    </ul>
  )
}

export default CountryList