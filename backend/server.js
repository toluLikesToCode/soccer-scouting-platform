const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");


const app = express();

app.use(cors());
app.options(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//Loading the config file where we store secrets
dotenv.config({ path: "./config/config.env" });



//Logging requests
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api", require("./routes/index"));
app.use("/api/games", require("./routes/games"));
app.use("/api/players", require("./routes/players"));
app.use("/api/tables", require("./routes/dynamicSelection"));

const PORT = process.env.PORT || 8080;

app.listen(
  PORT,
  console.log(`Server running on port ${PORT}`)
);