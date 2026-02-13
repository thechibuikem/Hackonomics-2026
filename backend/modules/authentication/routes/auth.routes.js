import express from "express";
import rateLimit from "express-rate-limit";
import { login,signup } from "../controllers/login.controller.js";

// 1. initializing router
const router = express.Router();


//2. test request
router.get("/", (req, res) => {
  res.send("Server is running");
});


//4. mounting middleware for auth routes
router.use(rateLimit)


// 5. mounting auth routes
router.post("/signup", signup);//create account for fresh users
router.post("/login", login);//recontinue for old users

//6. exporting auth router.
export default router;
