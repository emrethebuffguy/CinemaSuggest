const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const movieRouter = require("./routes/movieroutes");
const blogRouter = require("./routes/blogroutes");
const adminRouter = require("./routes/adminroutes");

//dev
app.use(
  cors({
    origin: "http://localhost:3000",

    optionsSuccessStatus: 200,
  })
);

//production
  // app.use(cors({
  //   origin: 'https://cinemasuggest.herokuapp.com',
  //   optionsSuccessStatus: 200
  // }));

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

app.use((req,res,next)=>{ // optional
  
  next()
})

app.use(`/api/v1/movies`, movieRouter);
app.use(`/api/v1/blog`,blogRouter);
app.use("/api/v1/admin",adminRouter);

app.get("*", (req, res) => {
  //very important code for react
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

module.exports = app;
