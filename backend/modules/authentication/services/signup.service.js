import { checkPassword } from "../utils/passwordValidation.js";
import { userModel } from "../../user/models/user.model.js";

// sign up user service
export async function signUpService(email, password) {
  try {

    //1. First check to be sure password is valid
    const isPasswordValid = checkPassword(password);
    if (!isPasswordValid) {
      return {
        status: 400,
        data: {
          error:
            "password must contain at least one special character and no whitespace",
        },
      };
    } //end process if password combination is invalid

    //2. Be sure this user doesn't already exisr
    const existingUser = await userModel.findOne({ userEmail: email }); // catch duplicates
    if (existingUser) {
      return {
        status: 400,
        data: { error: "user already exists" }, //flag for front-end
      };
    } //end process if user already exists

    //3. Supposed password is valid and user doesn't already exist register new user  
    const hashpassword = await genHashPassword(password); //hash using bcrypt
    const newUser = new userModel({
      userEmail: email,
      userPassword: hashpassword,
    }); //create a new user using mongodb model

    // creating access and refresh token for authorization
    const accessToken = jwt.sign(
      { userId: newUser["_id"], roles: newUser["roles"] },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" },
    ); //access-token for front-ends redux

    const refreshToken = jwt.sign(
      { userId: newUser["_id"] },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "30d",
      },
    ); //refresh Token for cookie and redis

    // Store refresh token in redis, we are using refreshToken as the key because redis doesn't allow us retrieve by value and for our cookie refresh_token, we can only identify by value
    redisClient.set(refreshToken, `refresh:${newUser["_id"]}`, {
      EX: 60 * 60 * 24 * 30,
    });
    await newUser.save();

    console.log("Backend says user created successfully");

    return {
      status: 200,
      data: {
        message: "User created successfully",
        accessToken: `${accessToken}`,
        refreshToken: `${refreshToken}`,
      },
    };
  } catch (error) {
    console.error("Signup Service Error:", error); // Log the error for internal debugging

    // Return a generic, non-descriptive error to the client for security
    return {
      status: 500,
      data: { error: "Internal server error" },
    };
  }
}
