const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
const env = require("dotenv");
require("./Database/Connection");
env.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const path = require("path");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

const adminRoutes = require("./Routes/user");
app.use("/api", adminRoutes);

const vacationCategoryRoutes = require("./Routes/vacationCategory");
app.use("/api", vacationCategoryRoutes);

const vacationProductRoutes = require("./Routes/VacationProduct");
app.use("/api", vacationProductRoutes);

const initialDataRoutes = require("./Routes/initialData");
app.use("/api", initialDataRoutes);

app.use("/public", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5001;
app.listen(process.env.PORT, () => {
  console.log(`Server is working on ${PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
