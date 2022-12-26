const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();

//db
// mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== "test") {
    mongoose.connect("mongodb://localhost/muber");
}

app.use(morgan("dev"));
app.use(express.json());

//set routes
const testRoute = require("./routes/test.route");
const driverRoute = require("./routes/driver.route");

//use routes
app.use("/api", testRoute);
app.use("/api/drivers", driverRoute);

// Run this function whenever someone goes to
// localhost:3050/
app.get("/api", (req, res) => {
    res.send({ hi: "there" });
});

app.use((req, res, next) => {
    const error = new Error("Not Found :(!");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.send({
        error: { message: error.message },
    });
});

module.exports = app;
