import { refreshTokenService } from "../services/refreshTokenService.js";

export async function refreshToken(req, res) {
  try {
    //1. retrieving refresh token from client cookie
    const refreshToken = req.cookies.refreshToken;
    // 2. revoke if refresh token is absent
    if (!refreshToken)
      return res.status(401).json({ error: "No refresh token in cookies" });
    // 3. implement 1 in refreshtokenservice
    const result = await refreshTokenService(refreshToken);

// 4. craft client feedback
const responseBody = {};

//5. preparing my response body    
    if (result.data.accessToken) {
      responseBody.accessToken = result.data.accessToken;
    }
    else if (result.error){
        responseBody.error = result.error.message
    }

//.6 sending responses
res.status(result.status).json(responseBody)

  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
}
