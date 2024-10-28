import express from "express";
import {
  createResidency,
  getAllResidencies,
  getResidency,
} from "../controllers/residencyCntrlr.js";
import jwtCheck from "../config/auth0Config.js";
const router = express.Router(); //make a routerobject from express.routeer
//post request into regiester page and if someone regiester the createResidency function will execute
router.post("/register", jwtCheck, createResidency); //will make the create user in the residencycntrolr

router.get("/allresd", getAllResidencies);

router.get("/:id", getResidency);
export { router as residencyRoute };
