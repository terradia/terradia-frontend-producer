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

  console.log(countryDialCodes);
  return (
    <Select defaultValue={"France"} className={"select-before"}>
      {countryDialCodes}
    </Select>
  );
};

export default CountryCode;
