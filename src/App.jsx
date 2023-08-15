import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState(0);
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [converted, setConverted] = useState("");

  useEffect(
    function () {
      async function currencyRate() {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
        );

        const data = await res.json();
        console.log(data);

        setConverted(data.rates[toCur]);
      }

      if (fromCur == toCur) {
        setConverted(amount);
      }

      currencyRate();
    },
    [amount, fromCur, toCur]
  );

  return (
    <div className="main-container">
      <input
        type="number"
        value={amount}
        onChange={(e) => {
          setAmount(Number(e.target.value));
        }}
      />
      <select value={fromCur} onChange={(e) => setFromCur(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={toCur} onChange={(e) => setToCur(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p className="output">OUTPUT :</p>
      <h1>{amount > 0 ? `${converted} ${toCur}` : null}</h1>
    </div>
  );
}
