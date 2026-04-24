const mongoose = require("mongoose");

async function connectionDB() {
  try {
    const connection_url = "mongodb://127.0.0.1:27017/invent_db";
    const connection = await mongoose.connect(connection_url);
    if (connection) {
      console.log("connnection establish successfully with mongodb ");
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  connectionDB,
};
