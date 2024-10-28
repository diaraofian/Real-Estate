import React from "react";
import Companies from "../components/companies/companies";
import Contact from "../components/contact/contact";
import GetStarted from "../components/getStarted/getStarted";

import Hero from "../components/hero/hero";
import Residencies from "../components/residencies/residencies";
import Value from "../components/value/value";

const Website = () => {
  return (
    <div className="App">
      <div>
        <div className="white-gradient" />

        <Hero />
      </div>
      <Companies />
      <Residencies />
      <Value />
      <Contact />
      <GetStarted />
    </div>
  );
};

export default Website;
