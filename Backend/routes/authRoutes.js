/*
  routes/authRoutes.js
  - define authentication endpoints for the API
  - wire /register and /login routes to controller functions
  - export router so app.js can mount auth routes
*/

const express = require("express");

const router = express.Router();


const {

register,
login

}=require("../controllers/authController");



router.post("/register", register);

router.post("/login", login);



module.exports = router;