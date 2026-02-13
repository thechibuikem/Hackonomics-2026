import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  // 1.access header sent from cient
  const authHeader = req.headers.authorization;

  //2. validate header is present
  if (!authHeader) 
    {
    console.log("No token provided at AuthMiddleWare");
    
    return res
      .status(401)
      .json({ error: "No token in header at authMiddle-ware" });
  }

  //3. validate header
  if (authHeader.startsWith("Bearer "))
    // 4. retrieve header
     {
    const token = authHeader.substring(7);//"Strings after the first 7 characters i.e Bearer + White space"
    
    //5. verify header 
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err)
        return res.status(401).json(
    // 6. deny if invalid
            { error: "Token expired or invalid" });
    //7. grant access if invalid
      next();
    });
  }
}
