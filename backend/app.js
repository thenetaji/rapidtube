import express from "express";
import cors from "cors";
import expressRateLimit from "express-rate-limit";
import helmet from "helmet";
import routes from "./route.js";
const app = express();

//middlewares
const corsOptions = {
  origin: ["https://rapidtubepro.web.app","https://rapidtubepro.firebase.app"]
};
app.use(cors(corsOptions));
app.options("*",cors(corsOptions));
app.use(helmet());
app.set("trust proxy", 1);
app.use(
  expressRateLimit({
    windowMs: 60 * 1000,
    max: 7,
    message: JSON.stringify(
      "You have made 7 request in one minute.Why do you want to crash the server?? btw Thala for a reason",
    ),
  }),
);
app.use(express.json());

//routes
app.use("/api", routes);

//server initialization
const port = process.env.PORT || 2626;
app.listen(port, () => {
  console.log(`Server is at port ${port}... :)`);
});
