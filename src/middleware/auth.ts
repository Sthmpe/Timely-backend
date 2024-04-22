import { auth } from "express-oauth2-jwt-bearer";
import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";

/**
 * Extends the Express Request interface to include additional properties.
 */
declare global {
  namespace Express {
    interface Request {
      auth0Id: string;
      userId: string;
    }
  }
}

/**
 * Middleware function to check the validity of JWT tokens.
 * 
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function to call in the middleware chain.
 */
export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: 'RS256',
});

/**
 * Middleware function to parse JWT tokens and extract user information.
 * 
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function to call in the middleware chain.
 */
export const jwtParse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.sendStatus(401);
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    const auth0Id = decoded.sub;

    const user = await User.findOne({ auth0Id });

    if (!user) {
      return res.sendStatus(401);
    }

    req.auth0Id = auth0Id as string;
    req.userId = user._id.toString();
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(401);
  }
};