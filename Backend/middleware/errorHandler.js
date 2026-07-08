/*
  middleware/errorHandler.js
  - centralized Express error handling middleware
  - log unexpected errors
  - send a standardized 500 Internal Server Error response
*/

module.exports = (err, req, res, next) => {

    console.error(err);

    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });

};