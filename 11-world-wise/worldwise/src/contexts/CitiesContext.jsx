import {createContext, useContext, useEffect, useState} from "react";

const BASE_URL = "http://localhost:9000";

const CitiesContext =createContext();

function CitiesProvider({children}) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({})

  useEffect(() => {
    console.log("Fetching cities")
    fetchCities()
  }, []);

  function addCity(city) {
    setCities([...cities, city])
  }

  async function fetchCities() {
    try {
      setIsLoading(true)
      const response = await fetch(`${BASE_URL}/cities`)
      const data = await response.json()
      setCities(data)
    } catch {
      alert("An error occurred. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  async function getCity(id) {
    setIsLoading(true)
    try {
      const response = await fetch(`http://localhost:9000/cities/${id}`)
      const data = await response.json()
      setCurrentCity(data)
    } catch {
      alert("An error occurred. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  return <CitiesContext.Provider value={{
    cities,
    addCity,
    isLoading,
    currentCity,
    getCity,
  }}>
    {children}
  </CitiesContext.Provider>
}

function useCities() {
  const context = useContext(CitiesContext)
  if (!context) {
    throw new Error("useCities must be used within a CitiesProvider")
  }
  return context
}

export { CitiesProvider, useCities }
