
const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");
const ActivityRouter = require("./routes/activity.route");


const app = express();
app.use(cors());


/* Loading the environment variables from the .env file. */

require("dotenv").config();


const PORT = process.env.PORT || 5000;

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/todoapiDB";


    /* Telling the application to use the express.json() middleware. This middleware will parse the body of

any request that has a Content-Type of application/json. */
console.log(PORT);

app.use(express.json());
app.use('/api', ActivityRouter);

/* This is a route handler. It is listening for a GET request to the root route of the application.

When it receives a request, it will send back a response with the string "Hello World!". */

app.get("/", (req, res) => {

  res.send("Hello World!");

});

app.get("/api/health_check", (req, res) => {

  res.send("Server Connected!");

});


/* Connecting to the database and then starting the server. */

mongoose

  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    app.listen(PORT, console.log("Server stated on port 5000 woo!"));
  })

  .catch((err) => {
    console.log("MONGODB ERROR")
    console.log(err);

  });
