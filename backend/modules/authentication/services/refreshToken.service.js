import jwt from "jsonwebtoken";
import { getRefreshTokenFromRedis } from "../../../core/redis.js";



export async function refreshTokenService(refreshToken) {
    // 1. retrieving user from redis using refresh token
  const userIdFromToken = await getRefreshTokenFromRedis(refreshToken);
// 2. revoking if user DNE
  if (!userIdFromToken) {
    console.log("no token available at refresh-roken (redis)");
    return {
      status: 401,
      error: {
        message: "invalid Refresh token",
      },
    };
  }

  // 3. creating new access code if user exists (15min validity)
  const accessToken = jwt.sign(
    { userId: storedUserId },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15mins",
    },
  );

//   4. send access code to client
  return {
    status: 200,
    data: {
      message: "User Logged in successfully",
      accessToken: `${accessToken}`,
    },
  };
}
