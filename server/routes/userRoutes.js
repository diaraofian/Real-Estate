import express from "express";
import {
  allBookings,
  allFavorite,
  bookVisit,
  cancelBooking,
  createUser,
  toFavorite,
} from "../controllers/userCntrlr.js";
import jwtCheck from "../config/auth0Config.js";
const router = express.Router(); //make a routerobject from express.routeer
//post request into regiester page and if someone regiester the createUser function will execute
//and jwt is a middlewhere in here ; when someone registering first he has to pass jwtcheck middlwhere if he passed then we will create a user
//and for passing jwtcheck first we pass the token from lay
router.post("/register", jwtCheck, createUser); //will make the create user in the usercntrlr

/*Booking endpoint */
//when someone book a visit for a residency
// after comma is the execute function
router.post("/bookVisit/:id", jwtCheck, bookVisit);
// to get all bookings
router.post("/allBookings", jwtCheck, allBookings);
//to cancel booking with id
router.post("/removeBooking/:id", jwtCheck, cancelBooking);
//favorite endpoints
//to add in favorite
router.post("/toFavorite/:rid", jwtCheck, toFavorite);
//all favorite
router.post("/allFavorite/", jwtCheck, allFavorite);
export { router as userRoute };
