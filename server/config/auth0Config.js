import { auth } from "express-oauth2-jwt-bearer";

const jwtCheck = auth({
  //as mainjsx auduence must be same url
  audience: process.env.AUTH0_AUDIENCE || "http://localhost:8000",
  //here i use my domain from main
  issuerBaseURL: process.env.AUTH0_ISSUER,
  tokenSigningAlg: "RS256", //as default
});

export default jwtCheck;
