// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import {useEffect, useState} from "react";

export default function App() {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR")
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleChangeAmount(event) {
    let val = Number(event.target.value);
    if (!isNaN(val)) {
      setAmount(val);
    }
  }

  useEffect(() => {
    const controller = new AbortController();

    async function convertCurrency() {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`,
          {signal: controller.signal}
        )
        const data = await res.json()
        setOutput(data.rates[toCurrency])
      } catch (err) {
        if (err.name !== 'AbortError'){
          console.error(err)
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (fromCurrency === toCurrency) {
      setOutput(`${amount}`)
      return;
    }
    if (amount > 0) {
      convertCurrency()
    }

    return () => {
      setOutput("")
      controller.abort()
    }
  }, [amount, fromCurrency, toCurrency])

  return (
    <div>
      <input
        type="text"
        onChange={handleChangeAmount}
        value={amount}
      />
      <select
        onChange={(e) => setFromCurrency(e.target.value)}
        value={fromCurrency}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        onChange={(e) => setToCurrency(e.target.value)}
        value={toCurrency}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{output} {amount !== 0 && toCurrency}</p>
    </div>
  );
}
