const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db"); // Assuming you have a separate file for your database connection
// // const multer = require("multer");
// const path = require("path");
const bodyParser = require("body-parser");

// Middleware
app.use(cors());
app.use(express.json())

app.post("/rate", async (req, res) => {
  try {
    const { name, age, status, intrest } = req.body;

      const result = await pool.query(
        "INSERT INTO date (name, age, status, intrest) VALUES($1, $2, $3, $4) RETURNING *",
        [name, age, status, intrest]
      );
console.log(result.rows[0]);   res.json(result.rows[0])
    console.log("woo")
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
