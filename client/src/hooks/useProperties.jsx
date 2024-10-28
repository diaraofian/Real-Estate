import React from "react";
import { useQuery } from "react-query";
import { getAllProperties } from "../utils/api";

const useProperties = () => {
  const { data, isError, isLoading, refetch } = useQuery(
    //this is the query name,second one is query function and the last one is setting refetch on windows
    "allProperties",
    //here i imoport all properties here
    getAllProperties,
    { refetchOnWindowFocus: false }
  );
  return {
    data,
    isError,
    isLoading,
    refetch,
  };
};

export default useProperties;
