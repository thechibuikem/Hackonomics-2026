// 1. import our redis client.
import { redisClient } from "../../../core/redis.js";

//2. refresh-token with a ttl in redis bd is key to staying logged in, so we clear it to log out.
export async function logOutService(refreshToken) {
  try {
    await redisClient.del(refreshToken);
  } 
//   3. log any error encountered in 3
  catch (error) {
    console.log("error updating redis at log out:", error);
  }
}
