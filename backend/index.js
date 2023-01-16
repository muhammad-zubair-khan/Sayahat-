const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
const env = require("dotenv");
env.config({ path: "./.env" });
require("./Database/Connection");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const path = require("path");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

const authRoutes = require("./Routes/auth");
app.use("/api", authRoutes);

const adminRoutes = require("./Routes/Admin/auth");
app.use("/api", adminRoutes);

const vacationCategoryRoutes = require("./Routes/vacationCategory");
app.use("/api", vacationCategoryRoutes);

const vacationProductRoutes = require("./Routes/VacationProduct");
app.use("/api", vacationProductRoutes);

const hotelRoutes = require("./Routes/hotel");
app.use("/api", hotelRoutes);

const roomRoutes = require("./Routes/room");
app.use("/api", roomRoutes);

const carRoutes = require("./Routes/car");
app.use("/api", carRoutes);

const packageRoutes = require("./Routes/package");
app.use("/api", packageRoutes);

const paymentRoutes = require("./Routes/payment");
app.use("/api", paymentRoutes);

const checkoutRoutes = require("./Routes/Checkout/contact");
app.use("/api", checkoutRoutes);

const hotelCheckoutRoutes = require("./Routes/Checkout/hotelContact");
app.use("/api", hotelCheckoutRoutes);

const bookPkgRoutes = require("./Routes/booking/package");
app.use("/api", bookPkgRoutes);

const bookHotelRoutes = require("./Routes/booking/hotel");
app.use("/api", bookHotelRoutes);

const bookCarRoutes = require("./Routes/booking/car");
app.use("/api", bookCarRoutes);

const initialDataRoutes = require("./Routes/Admin/initialData");
app.use("/api", initialDataRoutes);

app.use("/public", express.static(path.join(__dirname, "uploads")));

// if(process.env.NODE_ENV == "production"){
//     app.use(express.static("frontend/build"))
// }

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
