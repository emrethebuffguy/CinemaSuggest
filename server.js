const dotenv = require("dotenv");
const app = require("./app.js");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
mongoose.set('strictQuery', true);

const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
  );
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
    })
    .then(() => console.log("DB connection established"));

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log("server listening")
})