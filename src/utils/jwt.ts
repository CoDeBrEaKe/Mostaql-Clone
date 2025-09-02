import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret"; // Use env var in production
const JWT_EXPIRES_IN = "1h"; // Example: 1 hour
