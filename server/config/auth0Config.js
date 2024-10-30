import { auth } from "express-oauth2-jwt-bearer";

const jwtCheck = auth({
  //as mainjsx auduence must be same url
  audience: "http://localhost:8000",
  //here i use my domain from main
  issuerBaseURL: "https://dev-plmbu63trvbzf5av.us.auth0.com/",
  tokenSigningAlg: "RS256", //as default
});

export default jwtCheck;
