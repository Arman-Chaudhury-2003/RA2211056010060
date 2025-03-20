import { useState } from "react";

const API_BASE = "http://localhost:9876"; //.env setup later

function App() {
  //usestate for value change everysingle entry
  const [numberType, setNumberType] = useState("p");
  const [windowPrevState, setWindowPrevState] = useState([]);
  const [windowCurrState, setWindowCurrState] = useState([]);
  const [average, setAverage] = useState(0);

  const fetchNumbers = async () => {
    try {
      const response = await fetch(`${API_BASE}/numbers/${numberType}`);
      const data = await response.json();

      if (!data.numbers || !Array.isArray(data.numbers)) {
        console.error("Invalid response format:", data);
        return;
      }

      const newNumbers = data.numbers.filter(
        (num) => !windowCurrState.includes(num)
      );
      let updatedNumbers = [...windowCurrState, ...newNumbers];
      while (updatedNumbers.length > 10) {
        updatedNumbers.shift();
      }
      //If length is NOT more then okay or .reduce()
      const avg = updatedNumbers.length
        ? (
            updatedNumbers.reduce((a, b) => a + b, 0) / updatedNumbers.length
          ).toFixed(2)
        : 0;

      setWindowPrevState([...windowCurrState]);
      setWindowCurrState(updatedNumbers);
      setAverage(avg);
    } catch (error) {
      //throw error
      console.error("Error fetching numbers:", error);
    }
  };

  //html css
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-5">
      <h1 className="text-3xl font-bold mb-4">Average Calculator</h1>

      <select
        className="p-2 mb-4 text-black rounded"
        value={numberType}
        onChange={(e) => setNumberType(e.target.value)}
      >
        <option value="p">Prime</option>
        <option value="f">Fibonacci</option>
        <option value="e">Even</option>
        <option value="r">Random</option>
      </select>

      <button
        onClick={fetchNumbers}
        className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Fetch Numbers
      </button>

      <div className="mt-6 bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl font-semibold">Results:</h2>

        {/* get the json dataa in srgint format cause stringify */}
        <p>
          <strong>Previous State:</strong> {JSON.stringify(windowPrevState)}
        </p>
        <p>
          <strong>Current State:</strong> {JSON.stringify(windowCurrState)}
        </p>
        <p>
          {/* also get average */}
          <strong>Average:</strong> {average}
        </p>
      </div>
    </div>
  );
}

export default App;
