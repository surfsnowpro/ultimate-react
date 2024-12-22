import {createContext, useContext, useEffect, useState} from "react";

const BASE_URL = "http://localhost:9000";

const CitiesContext =createContext();

function CitiesProvider({children}) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    async function fetchCities() {
      try {
        const response = await fetch(`${BASE_URL}/cities`)
        const data = await response.json()
        setCities(data)
      } catch {
        alert("An error occurred. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCities()
  }, []);
  return <CitiesContext.Provider value={{
    cities,
    isLoading,
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
