import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET||"supersecret";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookieToken =
    (req as any).cookies?.auth_token || (req as any).cookies?.token;
console.log("cookieToken", cookieToken);
  if (!cookieToken) {
    return res.status(401).json({ error: "Access token required" });
  }

  jwt.verify(cookieToken, JWT_SECRET, (err: any, decoded: any) => {
    if (err) {
      console.log("err", err);
      return res.status(403).json({ error: "Invalid or expired token" });
    }

    // our token payload uses { id: user._id }
    const userId = decoded?.userId;
    (req as any).userId = userId;
    (req as any).user = { id: userId };
    console.log(decoded,userId);
    next();
  });
};
