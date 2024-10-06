import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

export const createUser = asyncHandler(async (req, res) => {
  console.log("creating a user");

  let { email } = req.body; //from request.body

  //check if the usre exist
  const userExists = await prisma.user.findUnique({ where: { email: email } });

  if (!userExists) {
    const user = await prisma.user.create({ data: req.body });
    res.send({
      message: "User registered successfully",
      user: user,
    });
  } else res.status(201).send({ message: "User already registered" });
});

//function to book a visit to residency

export const bookVisit = asyncHandler(async (req, res) => {
  console.log(req.body); // Check what is being sent
  //first the body of email a person and date from request body
  //here user must send two different information the first one is email that which user is gonna book his visit  and another one is date tat for which date u are going to book ur visit
  const { email, date } = req.body;

  //the id will send from parametr
  const { id } = req.params;

  try {
    const alreadyBooked = await prisma.user.findUnique({
      where: { email: email }, // means email is equal to email {email:email}
      select: { bookedVisits: true },
    });
    // it is for already book bu you
    // here if u send the id as id of the above parameter means the same property then do nothing and then it shows a json message
    if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
      res
        .status(400)
        .json({ message: "This residency is already booked by you" });
    }
    //in this part if the residency isnt already booked by u
    else {
      await prisma.user.update({
        //find the doc of specific urser and i use from update method beacuse here bookedVisit field will update as the request of body and new entry will push by the object of id and date
        where: { email: email },
        data: {
          bookedVisits: { push: { id, date } },
        },
      });
      //if it work successful then it will send a respond
      res.send("your visit is booked successfully");
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

//func to get all bookings of a user
export const allBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const bookings = await prisma.user.findUnique({
      where: { email: email }, //specific email by specific user of above that catch from request body and only selected the bookedvisites field not the whole documents
      select: { bookedVisits: true },
    });
    res.status(200).send(bookings);
  } catch (err) {
    throw new Error(err.message);
  }
});

//function to cancel the booking
export const cancelBooking = asyncHandler(async (req, res) => {
  //the requiments of this funcs are two things the first one is the email of the user who is going  to cancel the booking , and i will get email from body ,and the second one is the id of a property which is going to cancel the booking and i will get the id from request of parameters
  const { email } = req.body;
  const { id } = req.params;

  try {
    //this point is so important and a little complicate
    //here first grt email from the request of body and then select bookedvisits field , it will give me the user and this user juct contain one property bookedvisit,
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: { bookedVisits: true },
    });
    //then i will find the index of booking which we are going to cancel , mean i am going to find the index of the belov id be in bookvisit
    //findindex is a function that  ; Locating Elements: Finding the position of an element that meets certain criteria.
    //Updating Elements: Once you have the index of an element, you can use it to update or remove that element.
    //Validation: Checking for specific conditions or values in an array.
    const index = user.bookedVisits.findIndex((visit) => visit.id === id);

    //if here is nothing like the above line id the index will be -1 as result and any email in the json
    if (index === -1) {
      res.status(404).json({ message: "Booking not found" });
    }
    //and if it is not the case in the array of element delet only one element , and who is index this one that we found in the above line
    //and then we have to update the data in postgres query and find the id that i async in the above and then in the data make
    // the bookedvisits field as user bookedvisits and here array of element has reduce by one element and if the process were success then send a respond that canceled
    else {
      user.bookedVisits.splice(index, 1);

      await prisma.user.update({
        where: { email: email },
        data: {
          bookedVisits: user.bookedVisits,
        },
      });
      res.send("Bookinge cancel successfully");
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

//function to add a residency in favorite list of a user
export const toFavorite = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { rid } = req.params;

  try {
    //first of all i find user
    const user = await prisma.user.findUnique({
      where: { email },
    });
    //when i get the user then i cheked for his list of favorite residency
    //means user already like this residency then reomve residency from his list and if not the case then add the residency
    if (user.favResidenciesId.includes(rid)) {
      const updateUser = await prisma.user.update({
        //first of all select the user that email is equal as the target mean catch fron request body
        where: { email: email },
        //then update the data of user
        //then set the data and enter the data update the favratiresidency array
        //and what we have to updated ? i have to set it with the same residency id but just filter out that equal to rid that i have set in the parametr
        //and this filter will remove from the array
        data: {
          favResidenciesId: {
            set: user.favResidenciesId.filter((id) => id !== rid),
          },
        },
      });
      res.send({ message: "Removed from favorite", user: updateUser });
    } else {
      const updateUser = await prisma.user.update({
        //i will updated somthing in this part,
        where: { email: email },
        //in data i will push a new array
        data: {
          favResidenciesId: {
            push: rid,
          },
        },
      });
      //when it comleted send the below messege
      res.send({ message: "Updated favorites", user: updateUser });
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

//function to get all favorites
export const allFavorite = asyncHandler(async (req, res) => {
  //get email from body request
  const { email } = req.body;

  try {
    const favResid = await prisma.user.findUnique({
      where: { email: email },
      select: { favResidenciesId: true },
    });
    res.status(200).send(favResid);
  } catch (err) {
    throw new Error(err.message);
  }
});
