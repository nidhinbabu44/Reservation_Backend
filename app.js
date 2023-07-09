const express = require("express");
const parser = require("body-parser");

require("dotenv").config();

//intialize sequelize
const db = require("./app/models");
db.sequelize
    .sync({ force: false, alter: true })
    .then(() => {
        console.log("Reservation App Synced db.");
        //initial();  only for one time
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

const app = express();

app.use(parser.json());


require("./app/routes/passenger.routes")(app);


module.exports = app;


