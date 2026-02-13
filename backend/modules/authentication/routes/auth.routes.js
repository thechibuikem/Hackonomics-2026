import express from "express";
import rateLimit from "express-rate-limit";
import { signup } from "../controllers/signup.controller.js";
import { login } from "../controllers/login.controller.js";
import { logout } from "../controllers/logout.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { refreshToken } from "../controllers/refreshToken.controller.js";

// 1. initializing router
const router = express.Router();

//2. test request
router.get("/", (req, res) => {
  res.send("Server is running");
});

//4. mounting middleware for auth routes
router.use(rateLimit);

// 5. mounting auth routes
router.post("/signup", signup); //create account for fresh users
router.post("/login", login); //recontinue for old users
router.post("/logout", logout); //logout for old users


router.post("/refresh-token",refreshToken) //access-token regenearation from refresh token


// 6. mounting routes for auth persistence
router.use(authMiddleware);

// 7. basically anything that passes through authmiddleware is auto-validated
router.post("/validate-token",(req,res)=>{
res.json({valid:true,user:req.user})
})

//8. exporting auth router.
export default router;


