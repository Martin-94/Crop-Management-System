/*
  app.js
  - initialize Express application
  - configure common middleware (JSON body parsing, CORS, security headers, logging)
  - define a simple health-check route
  - export the configured app for server startup and tests
*/

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();


// middleware
app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));


// test route
app.get("/", (req, res) => {

    res.json({
        message: "Farm Management API Running"
    });

});


// IMPORTANT
module.exports = app;