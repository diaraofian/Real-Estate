import React from "react";
import { useForm } from "@mantine/form";
import { validateString } from "../../utils/common";
import { Group, Select, TextInput, Button } from "@mantine/core";
import useCountries from "../../hooks/useCountries";
import Map from "../Map/Map.jsx";

const AddLocation = ({ propertyDetails, setPropertyDetails, nextStep }) => {
  const { getAll } = useCountries();
  const form = useForm({
    initialValues: {
      country: propertyDetails?.country,
      city: propertyDetails?.city,
      address: propertyDetails?.address,
    },
    validate: {
      //make valdate string in common js
      country: (value) => validateString(value),
      city: (value) => validateString(value),
      address: (value) => validateString(value),
    },
  });
  const hndleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({ ...prev, city, address, country }));
      nextStep();
    }
  };

  const { country, city, address } = form.values;
  return (
    //this form has two section
    <form
      onSubmit={(e) => {
        e.preventDefault();
        hndleSubmit();
      }}
    >
      {/*left side */}
      <div
        className="flexCenter"
        style={{
          justifyContent: "space-between",
          gap: "3rem",
          marginTop: "3rem",
        }}
      >
        {/*inputs */}
        {/*selectable state of countries */}
        <div className="flexColStart" style={{ flex: 1, gap: "1rem" }}>
          <Select
            w={"100%"}
            withAsterisk
            label="Country"
            clearable
            searchable
            data={getAll()}
            {...form.getInputProps("country", { type: "input" })}
          />
          <TextInput
            w={"100%"}
            withAsterisk
            label="city"
            {...form.getInputProps("city", { type: "input" })}
          />
          <TextInput
            w={"100%"}
            withAsterisk
            label="address"
            {...form.getInputProps("address", { type: "input" })}
          />
        </div>

        {/* right side */}
        <div style={{ flex: 1 }}>
          <Map address={address} city={city} country={country}></Map>
        </div>
      </div>
      <Group position="center" mt={"xl"}>
        <Button type="submit">Next Step</Button>
      </Group>
    </form>
  );
};
export default AddLocation;
