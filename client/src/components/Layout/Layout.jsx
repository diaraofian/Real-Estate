import React, { useContext, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import UserDeatailContext from "../../Context/UserDetaisContext";
import { useMutation } from "react-query";
import { createUser } from "../../utils/api";
import useFavourites from "../../hooks/useFavourites";
import useBooking from "../../hooks/useBooking";

const Layout = () => {
  useFavourites();
  useBooking();
  //layout is the first thing in our app to rendering
  //by decling these we can access to these functions
  const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0();
  const { setUserDetails } = useContext(UserDeatailContext);
  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) => createUser(user?.email, token),
  });
  useEffect(() => {
    //we have to check our backend if user exist or not to show the document
    const getTokenAndRegister = async () => {
      //these are func that we get from user
      const res = await getAccessTokenWithPopup({
        authorizationParams: {
          audience: "http://localhost:8000",
          scope: "openid profile email",
        },
      });
      localStorage.setItem("access_token", res);
      setUserDetails((prev) => ({ ...prev, token: res }));
      mutate(res);
    };

    //if this condition is true then run the above function mean mutate ,now change th functionality
    isAuthenticated && getTokenAndRegister();
  }, [isAuthenticated]);
  return (
    <>
      <div style={{ background: "var(--black)", overflow: "hidden" }}>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
