import React from "react";
import TextValueComp from "./TextValueComp";
import SelectValueComp from "./SelectValueComp";
import CheckBoxComp from "./CheckBoxComp";

const NumberFormatComp = ({ choosenWidget }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <TextValueComp
        style={{
          width: "140px",
        }}
        type="number"
        choosenWidget={choosenWidget}
        param="decimalPlaces"
        objParam="format"
        label="Decimal Places"
      />

      <SelectValueComp
        param="negativeValues"
        style={{
          width: "140px",
          maxWidth: "140px",
        }}
        objParam="format"
        label="Sizing"
        choosenWidget={choosenWidget}
        arrOfValues={["(12345)", "-12345", "- 12345", "12345-", "12345 -"]}
      />

      <SelectValueComp
        param="showZeroAs"
        style={{
          width: "140px",
          maxWidth: "140px",
        }}
        objParam="format"
        label="Show zero as"
        choosenWidget={choosenWidget}
        arrOfValues={[" ", "-", "none"]}
      />

      <SelectValueComp
        param="representation"
        style={{
          width: "140px",
          maxWidth: "140px",
        }}
        objParam="format"
        label="Representation"
        choosenWidget={choosenWidget}
        arrOfValues={["thousands", "millions", "billions"]}
      />

      <CheckBoxComp
        objParam="format"
        param="useRegionalFormatting"
        label="Use regional formatting"
        choosenWidget={choosenWidget}
      />

      <CheckBoxComp
        objParam="format"
        param="useThSeparator"
        label="Use 1000 Separator(,)"
        choosenWidget={choosenWidget}
      />
    </div>
  );
};

const DefineFormatComp = ({ type, choosenWidget }) => {
  if (!type) {
    return "";
  }

  switch (type) {
    case "number":
      return <NumberFormatComp choosenWidget={choosenWidget} />;
    default:
      return (
        <div style={{ margin: "20px 0 0 0" }}>Type: {type} coming soon</div>
      );
  }
};

export default DefineFormatComp;
