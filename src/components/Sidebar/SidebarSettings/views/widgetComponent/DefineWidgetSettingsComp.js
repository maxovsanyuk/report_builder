import React from "react";
import ImgSettingsComp from "./views/ImgSettingsComp";
import LineSettingsComp from "./views/LineSettingsComp";

const DefineWidgetSettingsComp = ({ choosenWidget }) => {
  console.log(choosenWidget, "choosenWidget");
  const { name } = choosenWidget;

  switch (name) {
    case "image":
      return <ImgSettingsComp choosenWidget={choosenWidget} />;
    case "line":
      return <LineSettingsComp choosenWidget={choosenWidget} />;
    // case "rectangle":
    //   return <ImgSettingsComp />;
    // case "text_box":
    //   return <ImgSettingsComp />;
    default:
      return `${name} comming soon`;
  }
};

export default DefineWidgetSettingsComp;
