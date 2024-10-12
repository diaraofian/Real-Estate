import React, { useContext, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import "../Properties/Properties.css";
import useProperties from "../../hooks/useProperties";
import { PuffLoader } from "react-spinners";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import UserDeatailContext from "../../Context/UserDetaisContext";

const Favorites = () => {
  const { data, isError, isLoading } = useProperties();
  const [filter, setfilter] = useState("");
  const {
    userDetails: { favourites },
  } = useContext(UserDeatailContext);
  //here im going to handle my three states
  if (isError) {
    return (
      //some jsx
      <div className="wrapper">
        <span>Error while fetching data</span>
      </div>
    );
  }
  if (isLoading) {
    //here i instal a new dependenci by the name of spinners
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }
  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
        <SearchBar filter={filter} setfilter={setfilter} />
        <div className="paddings flexCenter properties">
          {
            //for each card along to thier property number return a card that whould be propertycard and the data is card and key for while throw a map arraying
            //and now i add new dependency lodash for many function that paiload in js
            // data.map((card, i) => (
            //   <PropertyCard card={card} key={i} />
            // ))
            //favourites and booking also properties they have the same code structure with any few differents
            data
              .filter((property) => favourites.includes(property.id))
              .filter(
                (property) =>
                  property.title.toLowerCase().includes(filter.toLowerCase()) ||
                  property.city.toLowerCase().includes(filter.toLowerCase()) ||
                  property.country.toLowerCase().includes(filter.toLowerCase())
              )
              .map((card, i) => (
                <PropertyCard card={card} key={i} />
              ))
          }
        </div>
      </div>
    </div>
  );
};

export default Favorites;
