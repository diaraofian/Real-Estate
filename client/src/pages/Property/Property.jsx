import React, { useContext, useState } from "react";
import { useQuery, useMutation } from "react-query";
import { useLocation } from "react-router-dom";
import { getProperty, removeBooking } from "../../utils/api";
import { PuffLoader } from "react-spinners";
import { AiFillHeart } from "react-icons/ai";
import "./Property.css";
import { MdLocationPin, MdMeetingRoom } from "react-icons/md";
import { FaShower } from "react-icons/fa";
import { AiTwotoneCar } from "react-icons/ai";
import Map from "../../components/Map/Map";
import useAuthCheck from "../../hooks/useAuthCheck";
import { useAuth0 } from "@auth0/auth0-react";
import BookingModal from "../../components/BookingModal/BookingModal";
import UserDeatailContext from "../../Context/UserDetaisContext";
import { Button } from "@mantine/core";
import { toast } from "react-toastify";
import Heart from "../../components/Heart/Heart";
const Property = () => {
  //and how can i use the id ? i use from use location of react router dom
  const { pathname } = useLocation();
  //split the pathname on the base of backslash means whenever they .. the pathname provided as an array and providen on bases of backsalash,
  //slice -1 means the last
  const id = pathname.split("/").slice(-1)[0];
  //first fitch the data of individual property ,and i get help from react query
  //then i have to specifi my query key, and here im going to fetch id in this page from my url,and the last part of my browser
  //is id url
  const { data, isLoading, isError } = useQuery(["resd", id], () =>
    getProperty(id)
  );

  //i do it for booking
  const [modalOpened, setModalOpened] = useState(false);
  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();

  const {
    userDetails: { token, bookings },
    setUserDetails,
  } = useContext(UserDeatailContext);
  //functionality for cancel booking
  const { mutate: cancelBooking, isLoading: cancelling } = useMutation({
    mutationFn: () => removeBooking(id, user?.email, token),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        bookings: prev.bookings.filter((booking) => booking?.id !== id),
      }));

      toast.success("Booking cancelled", { position: "bottom-right" });
    },
  });

  if (isLoading) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <PuffLoader />
        </div>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>Error while fetching the property details</span>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container">
        {/*Like button*/}
        {/*reuseable component*/}
        <div className="like">
          <Heart id={id} />
        </div>
        {/*Image*/}
        <img src={data?.image} alt="home img" />
        <div className="flexCenter property-details">
          {/*Left */}
          <div className="flexColStart left">
            {/* head */}
            <div className="flexStart head">
              <span className="primaryText">{data?.title}</span>
              <span className="orangeText" style={{ fontSize: "1.5rem" }}>
                ${data?.price}
              </span>
            </div>
            {/*facilities */}
            <div className="flexStart facilities">
              {/*Bathrooms */}
              <div className="flexStart facility">
                <FaShower size={20} color="#1F3E72" />
                <span>{data?.facilities?.bathrooms} Bathrooms</span>
              </div>
              {/*Parkings */}
              <div className="flexStart facility">
                <AiTwotoneCar size={20} color="#1F3E72" />
                <span>{data?.facilities?.parkings} Parkings</span>
              </div>
              {/*Bedrooms */}
              <div className="flexStart facility">
                <MdMeetingRoom size={20} color="#1F3E72" />
                <span>{data?.facilities?.bedrooms} Bedrooms</span>
              </div>
            </div>
            {/*description */}
            <span className="secondryText" style={{ textAlign: "justify" }}>
              {data?.description}
            </span>
            {/*address */}
            <div className="flexStart" style={{ gap: "1rem" }}>
              <MdLocationPin size={25} />
              <span className="secondryText">
                {data?.address} {data?.city} {data?.country}
              </span>
            </div>
            {/* booking button */}
            {bookings?.map((booking) => booking.id).includes(id) ? (
              <>
                <Button
                  variant="outline"
                  w={"100%"}
                  color="red"
                  onClick={() => cancelBooking()}
                  disabled={cancelling}
                >
                  <span>Cancel booking</span>
                </Button>
                <span>
                  Your visit already booked for date{" "}
                  {bookings?.filter((booking) => booking?.id === id)[0].date}
                </span>
              </>
            ) : (
              <button
                className="button"
                onClick={() => {
                  console.log("Trying to book visit");
                  if (validateLogin()) {
                    console.log("User validated, opening modal");
                    setModalOpened(true);
                  } else {
                    console.log("User not logged in");
                  }
                }}
              >
                Book your visit
              </button>
            )}
            <BookingModal
              opened={modalOpened}
              setOpened={setModalOpened}
              propertyId={id}
              email={user?.email}
            />
          </div>
          {/*right side */}
          <div className="map">
            <Map
              address={data?.address}
              city={data?.city}
              country={data?.country}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Property;
