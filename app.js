const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const movieRouter = require("./routes/movieroutes");

// if(process.env.NODE_ENV === "development"){
//   app.use(cors({ origin: "http://localhost:3000" }));

// }

  app.use(cors({
    origin: 'https://cinemasuggest.herokuapp.com',
    optionsSuccessStatus: 200
  }));

app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(express.json());
// function wwwRedirect(req, res, next) { /* www redirects to :// */
//   if (req.headers.host.slice(0, 4) === 'www.') {
//       var newHost = req.headers.host.slice(4);
//       return res.redirect(301, req.protocol + '://' + newHost + req.originalUrl);
//   }
//   next();
// };


//app.use(wwwRedirect);
app.use(`/api/v1/movies`, movieRouter);


app.get("*", (req, res) => {
  //very important code for react
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

module.exports = app;
