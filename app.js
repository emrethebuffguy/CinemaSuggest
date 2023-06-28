const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const compression = require("compression");
const forceSSL = require("express-force-ssl");
const movieRouter = require("./routes/movieroutes");
const blogRouter = require("./routes/blogroutes");
const adminRouter = require("./routes/adminroutes");


function wwwRedirect(req, res, next) { /* www redirects to :// */
  if (req.headers.host.slice(0, 4) === 'www.') {
      var newHost = req.headers.host.slice(4);
      return res.redirect(301, req.protocol + '://' + newHost + req.originalUrl);
  }
  next();
};

app.set('trust proxy', true);
app.use(wwwRedirect);

app.set("forceSSLOptions", {
  enable301Redirects: true,
  trustXFPHeader: true,
  sslRequiredMessage: "SSL Required.",
});


//dev
// app.use(
//   cors({
//     origin: "http://localhost:3000",

//     optionsSuccessStatus: 200,
//   })
// );


app.use(
  cors({
    origin: "https://cinemasuggest.com",
    optionsSuccessStatus: 200,
  })
);

app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(express.json());
app.use(forceSSL);
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20, // 30 requests
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);

app.use((req, res, next) => {
  // optional

  next();
});

app.use(`/api/v1/movies`, movieRouter);
app.use(`/api/v1/blog`, blogRouter);
app.use("/api/v1/admin", adminRouter);

app.get("*", (req, res) => {
  //very important code for react
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

module.exports = app;
