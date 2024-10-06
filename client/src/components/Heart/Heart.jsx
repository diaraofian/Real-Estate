import React, { useContext, useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import useAuthCheck from "../../hooks/useAuthCheck";
import { useMutation } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import UserDeatailContext from "../../Context/UserDetaisContext";
import { toFav } from "../../utils/api";
import { checkFavourites, updateFavourites } from "../../utils/common.js";
const Heart = ({ id }) => {
  const [heartColor, setHeartColor] = useState("white");

  //login from custom hook
  const { validateLogin } = useAuthCheck();

  //fetch user
  const { user } = useAuth0();

  //it needs to update my favourates arr too,i have that in app,jsx
  const {
    userDetails: { favourites, token },
    setUserDetails,
  } = useContext(UserDeatailContext);
  useEffect(() => {
    setHeartColor(() => checkFavourites(id, favourites));
  }, [favourites]);

  const { mutate } = useMutation({
    mutationFn: () => toFav(id, user?.email, token),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        //this function made in utlis,common
        favourites: updateFavourites(id, prev.favourites),
      }));
    },
  });
  //hanleLike functionality

  const handleLike = () => {
    if (validateLogin()) {
      //here i use mutate because i have to send the information for server
      mutate();
      setHeartColor((prev) => (prev === "#fa3e5f" ? "white" : "#fa3e5f"));
    }
  };

  return (
    <AiFillHeart
      size={24}
      color={heartColor}
      onClick={(e) => {
        e.stopPropagation();
        handleLike();
      }}
    />
  );
};

export default Heart;
