/*!
 *  Jacked-GPT - An AI-powered fitness routine generator
 *  https://github.com/evoluteur/jacked-gpt
 *  (c) 2026 Olivier Giulieri & Phil Rosace
 */

import express from "express";
import path from "path";
import bodyParser from "body-parser";
import routes from "./routes.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const asciiArt = `        _            _            _  _____ _____ _______
       | |          | |          | |/ ____|  __ \\__   __|
       | | __ _  ___| | _____  __| | |  __| |__) | | |
   _   | |/ _\` |/ __| |/ / _ \\/ _\` | | |_ |  ___/  | |
  | |__| | (_| | (__|   <  __/ (_| | |__| | |      | |
   \\____/ \\__,_|\\___|_|\\_\\___|\\__,_|\\_____|_|      |_|
`;

console.log(asciiArt);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "./ui")));

app.use(function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Security-Policy", "default-src 'self';");
  next();
});

// - REST server routes
app.use("/", routes);

// - catch 404 and forward to error handler
app.use(function (err, req, res, next) {
  //var err = new Error('Not Found');
  //err.status = 404;
  //next(err);
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {},
  });
});

export default app;
