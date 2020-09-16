import React from "react";

import TextValueComp from "../TextValueComp";
import SelectValueComp from "../SelectValueComp";
import CheckBoxComp from "../CheckBoxComp";

const NumberFormatComp = ({ choosenWidget }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
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

      <SelectValueComp
        param="negativeValues"
        style={{
          width: "100%",
          maxWidth: "100%",
        }}
        objParam="format"
        label="Negative values"
        choosenWidget={choosenWidget}
        arrOfValues={["(12345)", "-12345", "- 12345", "12345-", "12345 -"]}
      />

      <SelectValueComp
        param="showZeroAs"
        style={{
          width: "100%",
          maxWidth: "100%",
        }}
        objParam="format"
        label="Show zero as"
        choosenWidget={choosenWidget}
        arrOfValues={[" ", "-", "none"]}
      />

      <SelectValueComp
        param="representation"
        style={{
          width: "100%",
          maxWidth: "100%",
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

export default NumberFormatComp;
