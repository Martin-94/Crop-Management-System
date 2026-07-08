/*
  server.js
  - load environment configuration
  - import configured Express app from app.js
  - start the HTTP server on the configured port
*/

require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});