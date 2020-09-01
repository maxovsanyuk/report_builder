import React from "react";

const DefineBasicWidgetSettings = ({ choosenWidget }) => {
  console.log(choosenWidget, "choosenWidgetAAA");

  return `${choosenWidget?.name}`;
};

export default DefineBasicWidgetSettings;
