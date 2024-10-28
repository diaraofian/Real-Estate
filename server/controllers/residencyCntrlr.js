import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

export const createResidency = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
    userEmail,
  } = req.body.data;

  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image,
        owner: { connect: { email: userEmail } },
      },
    });
    res.send({ message: "Residency created successfully", residency });
  } catch (err) {
    if (err.code === "P2002")
      //this is a specific code that will be return if the condition of all unique and it rest will be vileted{
      throw new Error("A residency with address already here");

    throw new Error(err.message);
  }
});
//this is a specific code that will be return if the condition of all unique and it rest will be vileted

//function to get all the documents
export const getAllResidencies = asyncHandler(async (req, res) => {
  const residencies = await prisma.residency.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  res.send(residencies);
});

//function to get specific document,id,residency

export const getResidency = asyncHandler(async (req, res) => {
  //by sending id with url
  const { id } = req.params; //use this because we want to send request with url
  try {
    const residency = await prisma.residency.findUnique({
      //means find only one doc
      where: { id }, //means where the id is equal to req.parameters
    });
    res.send(residency);
  } catch (err) {
    throw new Error(err.message);
  }
});
