const express = require("express");
const app = express();
const path = require("path");
const compression = require("compression");

const isProduction = process.env.NODE_ENV === "production";

if (!isProduction) {
  require("dotenv").config();
}

// gzip compression of responses
app.use(compression());

/* Redirect http to https */
app.get("*", function (req, res, next) {
  if (req.headers["x-forwarded-proto"] != "https" && isProduction)
    res.redirect("https://" + req.hostname + req.url);
  else next(); /* Continue to other routes if we're not redirecting */
});

require("./startup/logging")();
require("./startup/config")();
require("./startup/db")();
require("./startup/routes")(app);

if (isProduction) {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server is running on port ${port}...`));
