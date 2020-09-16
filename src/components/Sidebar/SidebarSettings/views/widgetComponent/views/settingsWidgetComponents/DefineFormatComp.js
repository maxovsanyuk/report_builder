import React from "react";

import NumberFormatComp from "./ formatComponents/NumberFormatComp";
import CurrencyFormatComp from "./ formatComponents/CurrencyFormatComp";
import SelectValueComp from "./SelectValueComp";
import moment from "moment";
import TextValueComp from "./TextValueComp";
import CheckBoxComp from "./CheckBoxComp";

const DefineFormatComp = ({ type, choosenWidget }) => {
  if (!type) {
    return "";
  }

  switch (type) {
    case "number":
      return <NumberFormatComp choosenWidget={choosenWidget} />;

    case "currency":
      return <CurrencyFormatComp choosenWidget={choosenWidget} />;

    case "date":
      return (
        <SelectValueComp
          param="date"
          style={{
            width: "100%",
            maxWidth: "100%",
          }}
          objParam="format"
          label="Date"
          choosenWidget={choosenWidget}
          arrOfValues={[
            moment().format("L"),
            moment().format("l"),
            moment().format("LL"),
            moment().format("ll"),
          ]}
        />
      );

    case "time":
      return (
        <SelectValueComp
          param="time"
          style={{
            width: "100%",
            maxWidth: "100%",
          }}
          objParam="format"
          label="Time"
          choosenWidget={choosenWidget}
          arrOfValues={[
            moment().format("LT"),
            moment().format("LTS"),

            moment().format("LLL"),
            moment().format("lll"),
            moment().format("LLLL"),
            moment().format("llll"),
          ]}
        />
      );

    case "percentage":
      return (
        <>
          <TextValueComp
            style={{
              width: "100%",
              maxWidth: "100%",
            }}
            type="number"
            choosenWidget={choosenWidget}
            param="decimalPlaces"
            objParam="format"
            label="Decimal Places"
          />

          <CheckBoxComp
            objParam="format"
            param="includeSpace"
            label="Include a space"
            choosenWidget={choosenWidget}
          />
        </>
      );

    case "scientific":
      return (
        <>
          <TextValueComp
            type="number"
            style={{
              width: "100%",
              maxWidth: "100%",
            }}
            choosenWidget={choosenWidget}
            param="decimalPlacesScientific"
            objParam="format"
            label="Decimal Places"
          />
        </>
      );

    case "custom":
      return (
        <>
          <TextValueComp
            style={{
              width: "100%",
              maxWidth: "100%",
            }}
            choosenWidget={choosenWidget}
            param="custom"
            objParam="format"
            label="Custom format"
          />
        </>
      );

    default:
      return (
        <div style={{ margin: "20px 0 0 0" }}>Type: {type} coming soon</div>
      );
  }
};

export default DefineFormatComp;
