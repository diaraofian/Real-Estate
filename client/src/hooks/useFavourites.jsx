import React, { useContext, useEffect, useRef } from "react";
import UserDeatailContext from "../Context/UserDetaisContext";
import { useQuery } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { allFavorite } from "../utils/api";

const useFavourites = () => {
  const { userDetails, setUserDetails } = useContext(UserDeatailContext);
  const queryRef = useRef();
  const { user } = useAuth0();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: "allFavourites",
    queryFn: () => allFavorite(user?.email, userDetails?.token),
    onSuccess: (data) =>
      setUserDetails((prev) => ({ ...prev, favourites: data })),
    enabled: user?.email !== undefined,
    staleTime: 30000,
  });

  queryRef.current = refetch;

  useEffect(() => {
    queryRef.current && queryRef.current();
  }, [userDetails?.token]);

  return { data, isError, isLoading, refetch };
};

export default useFavourites;
