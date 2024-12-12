const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  mongoose
    .connect('mongodb://localhost:27017/librarymanagment')
    .then(() => console.log("Connection to DB is successfull..."))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = connectDB;
