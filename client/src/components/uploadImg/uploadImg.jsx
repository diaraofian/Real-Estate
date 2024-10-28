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
  const [imgURL, setImgURL] = useState(propertyDetails.image);
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
        cloudName: "ddi7nmypl",
        uploadPreset: "dia786",
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
// import React, { useEffect, useState } from "react";
// import "./UploadImg.css";
// import { AiOutlineCloudUpload } from "react-icons/ai";
// import { Button, Group } from "@mantine/core";
// import { Filestack } from "filestack-js"; // Change the import

// const UploadImg = ({
//   propertyDetails,
//   setPropertyDetails,
//   prevStep,
//   nextStep,
// }) => {
//   const [imgURL, setImgURL] = useState(propertyDetails?.image);
//   const apiKey = "YOUR_FILESTACK_API_KEY"; // Replace with your Filestack API key

//   const handleNext = () => {
//     setPropertyDetails((prev) => ({ ...prev, image: imgURL }));
//     nextStep();
//   };

//   const handleUpload = () => {
//     const filestackClient = new Filestack(apiKey); // Create an instance
//     filestackClient
//       .picker({
//         onUploadDone: (res) => {
//           setImgURL(res.filesUploaded[0].url);
//         },
//         maxFiles: 1,
//       })
//       .open();
//   };

//   return (
//     <div className="flexColCenter uploadWrapper">
//       {!imgURL ? (
//         <div className="flexColCenter uploadZone" onClick={handleUpload}>
//           <AiOutlineCloudUpload size={50} color={"grey"} />
//           <span>Upload Image</span>
//         </div>
//       ) : (
//         <div className="uploadedImage" onClick={handleUpload}>
//           <img src={imgURL} alt="Uploaded" />
//         </div>
//       )}
//       <Group position="center" mt={"xl"}>
//         <Button variant="default" onClick={prevStep}>
//           Back
//         </Button>
//         <Button onClick={handleNext} disabled={!imgURL}>
//           Next
//         </Button>
//       </Group>
//     </div>
//   );
// };

// export default UploadImg;
// import React from "react";
// import { useDropzone } from "react-dropzone";

// const UploadImg = ({ setPropertyDetails, nextStep }) => {
//   const onDrop = (acceptedFiles) => {
//     const file = acceptedFiles[0];
//     const url = URL.createObjectURL(file);
//     setPropertyDetails((prev) => ({ ...prev, image: url }));
//     nextStep();
//   };

//   const { getRootProps, getInputProps } = useDropzone({ onDrop });

//   return (
//     <div {...getRootProps()} className="uploadZone">
//       <input {...getInputProps()} />
//       <p>Drag 'n' drop some files here, or click to select files</p>
//     </div>
//   );
// };

// export default UploadImg;
