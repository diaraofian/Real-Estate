import React, { useEffect, useRef, useState } from "react";
import "./UploadImg.css";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Button, Group } from "@mantine/core";

const UploadImg = ({
  propertyDetails,
  setPropertyDetails,
  prevStep,
  nextStep,
}) => {
  const [imgURL, setImgURL] = useState(propertyDetails?.image);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  const handelNext = () => {
    setPropertyDetails((prev) => ({ ...prev, image: imgURL }));
    nextStep();
  };

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dcdhklrjc",
        uploadPreset: "vx0dyjgc",
        maxFiles: 1,
      },
      (err, result) => {
        if (result.event === "success") {
          setImgURL(result.info.secure_url);
        }
      }
    );
  }, []);
  return (
    <div className="flexColCenter uploadWrapper">
      {!imgURL ? (
        <div
          className="flexColCenter uploadZone"
          onClick={() => widgetRef.current?.open()}
        >
          <AiOutlineCloudUpload size={50} color={"grey"} />
          <span>Upload Image</span>
        </div>
      ) : (
        <div
          className="uploadedImage"
          onClick={() => widgetRef.current?.open()}
        >
          <img src={imgURL} alt="" />
        </div>
      )}
      <Group position="center" mt={"xl"}>
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={handelNext} disabled={!imgURL}>
          Next
        </Button>
      </Group>
    </div>
  );
};
export default UploadImg;
