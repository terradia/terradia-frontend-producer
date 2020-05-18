import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { allCountries } from "country-telephone-data";
import FlagIconFactory from "react-flag-icon-css";

const FlagIcon = FlagIconFactory(React, { useCssModules: false });

const CountryCode = () => {
  const [countryDialCodes, setCountryDialCodes] = useState([]);

  useEffect(() => {
    setCountryDialCodes(
      allCountries.map((country) => {
        if (country.iso2 === "xk") {
          return null;
        }
        return (
          <Select.Option
            key={country.name + "-" + country.dialCode}
            value={country.name}
          >
            <FlagIcon code={country.iso2} />
            {"+" + country.dialCode}
          </Select.Option>
        );
      })
    );
  }, []);

  return (
    <Select defaultValue={"France"} className={"select-before"}>
      {countryDialCodes}
    </Select>
  );
};

export default CountryCode;
