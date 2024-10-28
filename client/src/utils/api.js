import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

// Import the base URL of our server from Vite's environment variables

//import here the base url of our server
export const api = axios.create({
  baseURL: "https://real-estate-smoky-seven.vercel.app/api",
  //serverURL,
});

//this fun will get all property
export const getAllProperties = async () => {
  try {
    //and here we get the data from backend side of all residency route
    const response = await api.get("/residency/allresd", {
      timeout: 10 * 1000,
    });

    //if it a bad request mean 400 , or 500 and then throw the data
    // if (response.status === 400 || response.status === 500) {
    //   throw response.data;
    // } //if it is not then return the fetch data
    //my first foult ,with toast we have to write error not err
    return response.data;
  } catch (error) {
    // Handle error responses
    if (error.response) {
      const { status, data } = error.response;
      toast.error(`Error ${status}: ${data.message || "Something went wrong"}`);
    } else {
      // Handle network errors
      toast.error("Network Error: Unable to reach the server");
    }
    throw error;
  }
};

export const getProperty = async (id) => {
  //this fun will get all property

  try {
    //*copy paste and just change the route
    //and here we get the data from backend side of all residency route
    const response = await api.get(`/residency/${id}`, {
      timeout: 10 * 1000,
    });
    //if it a bad request mean 400 , or 500 and then throw the data
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    } //if it is not then return the fetch data
    //my first foult ,with toast we have to write error not err
    return response.data;
  } catch (error) {
    toast.error("Something went wrong ");
    throw error;
  }
};

//here i make a function for layout new func
export const createUser = async (email, token) => {
  try {
    await api.post(
      "/user/register",
      { email },
      {
        headers: {
          //in server side jwt is in bearer part
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong ,Please try again");
    throw error;
  }
};
//for visiting booking
export const bookVisit = async (date, propertyId, email, token) => {
  try {
    await api.post(
      `/user/bookVisit/${propertyId}`,
      {
        email,
        id: propertyId,
        date: dayjs(date).format("DD/MM/YYYY"),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong ,Please try again");
    throw error;
  }
};

//it is for removing booking
export const removeBooking = async (id, email, token) => {
  try {
    await api.post(
      `/user/removeBooking/${id}`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong, Please try again");

    throw error;
  }
};
//adding to favorite
export const toFav = async (id, email, token) => {
  try {
    await api.post(
      `/user/toFavorite/${id}`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {
    throw e;
  }
};
// for all favorites
export const allFavorite = async (email, token) => {
  if (!token) {
    console.error("Token is missing");
    return;
  }

  try {
    console.log("Sending email:", email);

    const res = await api.post(
      `/user/allFavorite`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data["favResidenciesId"]; // Make sure this key exists in your response for test of occuring to errors
  } catch (e) {
    console.error(
      "Error fetching favorites:",
      e.response ? e.response.data : e.message
    );
    toast.error("Something went wrong while fetching favs");
    throw e;
  }
};
//for all bookings
export const allBookings = async (email, token) => {
  if (!token) {
    console.error("Token is missing");
    return;
  }
  try {
    console.log("Sending email:", email);

    const res = await api.post(
      `/user/allBookings`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data["bookedVisits"];
  } catch (error) {
    toast.error("Something went wrong while fetching bookings");
    throw error;
  }
};
//for creating residency
export const createResidency = async (data, token) => {
  console.log(data);
  try {
    const res = await api.post(
      `/residency/register`,
      {
        data,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data; // Return the response data for further use if needed
  } catch (error) {
    throw error;
  }
};
