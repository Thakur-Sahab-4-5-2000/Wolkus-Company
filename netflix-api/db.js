const mongoose = require("mongoose");

const connectDB = () => {
  try {
    mongoose.connect(
      "mongodb+srv://Shubham:Shubham@cluster0.aa1cgpx.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
      }
    );
    console.log("Mongodb connected successfully");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
