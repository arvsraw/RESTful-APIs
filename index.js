const express = require("express");
import mongoose from "mongoose";
import bodyParser from "body-parser";
import jsonwebtoken from "jsonwebtoken";
import routes from "./src/routes/crmRoutes";

const app = express();
const PORT = 3000;

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/CRMdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//body parser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// JWT setup
app.use((req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jsonwebtoken.verify(
      req.headers.authorization.split(" ")[1],
      "RESTFULapis",
      (err, decode) => {
        if (err) {
          req.user = undefined;
        }
        req.user = decode;
      }
    );
  } else {
    req.user = undefined;
    next();
  }
});

routes(app);

//serving static files
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send(`node and express server running at port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
