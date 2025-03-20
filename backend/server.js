//eta ekta simple backen d jeta theke initial valsue asbe

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 9876;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET",
  })
);

const numberData = {
  p: [2, 3, 5, 7, 11], // P
  f: [0, 1, 1, 2, 3], // f
  e: [2, 4, 6, 8, 10], // e
  r: [1, 5, 9, 15, 20], // R
};

app.get("/numbers/:id", (req, res) => {
  const { id } = req.params;
  if (numberData[id]) {
    return res.json({
      windowPrevState: [],
      windowCurrState: numberData[id],
      numbers: numberData[id],
      avg: (
        numberData[id].reduce((a, b) => a + b, 0) / numberData[id].length
      ).toFixed(2),
    });
  }
  return res.status(400).json({ error: "Invalid number ID" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
