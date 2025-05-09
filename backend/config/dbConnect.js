const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("DB connected successfully");
  } catch (err) {
    console.log("Error while connecting with DB ", err);
  }
};
