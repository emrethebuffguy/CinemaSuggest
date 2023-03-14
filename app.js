const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const movieRouter = require("./routes/movieroutes");

// function wwwRedirect(req, res, next) { /* www redirects to :// */
//   if (req.headers.host.slice(0, 4) === 'www.') {
//       var newHost = req.headers.host.slice(4);
//       return res.redirect(301, req.protocol + '://' + newHost + req.originalUrl);
//   }
//   next();
// };
app.use(cors());
//app.use(wwwRedirect);
app.use(express.json()); 
app.use(`/api/v1/movies`, movieRouter);
app.use(express.static(path.resolve(__dirname, './client/build')));

//The 404 Route (ALWAYS Keep this as the last route)
// app.get("*", function (req, res) {
//     res.status(404).json({
//       status: "404 not found",
//       message: "please try again later",
//     });
//   });
app.get('/', (req, res) => { //very important code for react
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

module.exports = app;