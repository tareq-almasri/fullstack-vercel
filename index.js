import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import passport from "passport";
import cookieParser from "cookie-parser";

//route imports
import teaRoutes from "./routes/teaRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

import configureJwtStrategy from "./passport-config.js";

import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Loads .env file contents into process.env.
dotenv.config();

const app = express();

//allow cross resource sharing
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
  // cors({
  //   origin: "http://localhost:3000", // we can also specify the domain we will be connecting from
  // })
);
//allow us to parse json information from http body to req.body
app.use(express.json());
//allow us to parse cookie information into our request object
app.use(cookieParser());
//initialize passport so we can use passport within our express server.
app.use(passport.initialize());
//configure passport to use our function / jwtstrategy
configureJwtStrategy(passport);

//connecting to the database
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`
  )
  .then(() => {
    console.log("Database connected! 😃");
  })
  .catch((error) => {
    console.log(error.message);
    console.log("🤨");
  });

//registering routes
app.use("/api/teas", teaRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

// Serve frontend client/build folder
app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

//listening for requests.
app.listen(process.env.PORT || 3001, (req, res) => {
  console.log("Server is listening for HTTP requests on port 3001");
});
