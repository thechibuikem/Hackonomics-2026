// server.js
import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db.js";

console.log("MONGO_URI:", process.env.MONGO_URI);


//-- confiigurations

const allowedOrigin = '*';
const corsOptions = {
  origin: allowedOrigin,
  credentials: true, //for headers|cookies
};

//-- mountings
const app = express();
const PORT = 5000;
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json()); // Parse JSON data
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data

// //====== watchList endpoint======//
// app.use("/api/watchList", repoListRoutes);
// app.use("/api/kronList", kronListRoutes);
// //====== change detection endpoint======//
// app.use("/api/changeDetection", changeDetectionRoutes);

app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  next();
});

// Use the routes
// A test route directly in server.js
app.get("/api", (req, res) => {
  res.send("Server is running");
});

connectDB()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server running on port: ${PORT} ✅`),
    );
  })
  .catch((err) => console.error("db connection failed", err));
