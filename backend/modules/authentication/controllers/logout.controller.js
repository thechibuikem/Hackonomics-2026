import { logOutService } from "../services/logoutService.js";
import { mode } from "../../../core/config.js";

export async function logout(req, res) {

// 1. retrieve cookies 
  const cookie = req.cookies;
  const refreshCookie = cookie.refreshToken;

//2. log refreh token   
  console.log("refresh token", refreshCookie);


  try {
//3.   implement logout service
    await logOutService(refreshCookie);
    //4.  logging any error occuring in 3
  } catch (error) {
    console.log("error while using redis clearer func", error);
    // 5. clearing refresh-token from client cookie

  } finally {
    // dynamic cookie config.
      res.clearCookie("refreshToken", {
          httpOnly: true, // JS cannot access it
          secure: mode !== "local", // only over HTTPS in production
          sameSite: "Lax",
          path: "/",
          maxAge: 30 * 24 * 60 * 60 * 1000,
        }) 
    res.sendStatus(200);
  }
}
