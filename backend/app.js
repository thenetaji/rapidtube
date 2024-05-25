const express = require("express");
const app = express();
const routes = require("./routes/route.js");
const path = require("path");

//security packages
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const rateLimiter = require("express-rate-limit");

const corsConfig = {
  origin:"*",
  optionSuccessStatus:200
};

//middlewares
app.set("trust proxy",1);
app.use(rateLimiter({
  windowMs:15 * 60 * 1000,
  max:100
}));
helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https://www.google-analytics.com', 'https://i.ytimg.com'],
    }
  });
app.use(xss());
app.use(cors(corsConfig));
app.use(express.json());

app.use("/api/v1",routes);

const port = process.env.PORT;
app.listen(port,() => {
  console.log(`Server is waiting at port ${port}... :)`);
});
