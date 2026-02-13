import { mode } from "../../../core/config.js";


export async function logIn(req, res) {
  // 1. get email and password from user query
  const { email, password } = req.body;

  // 2. implement in login service
  const result = await logInService(email, password); //response from login service

  //3. check status of 2
  if (result.status == 200) 
    // 4. send cookie to client for persistence
    {
    res.cookie("refreshToken", result.data.refreshToken, {
      httpOnly: true, // JS cannot access it
      secure: mode !== "local", // only over HTTPS in production
      sameSite: "Lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
  }

  //5. craft client feedback 

  const responseBody = {
    message: result.data.message, // we expect data.message to always be present
  };
  if (result.data.accessToken) {
    responseBody.accessToken = result.data.accessToken;
  }

  if (result.data.error) {
    responseBody.error = result.data.error;
  }

  //6. send client feedback
  return res.status(result.status).json(responseBody);
}
