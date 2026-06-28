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