import { expressjwt } from "express-jwt";

const auth = () => {
  return expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
  }).unless({
    path: [
      "/check",
      "/v1/api/auth/login",
      "/v1/api/auth/register",
      "/v1/api/auth/reset",
    ],
  });
};

export default auth;
