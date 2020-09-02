import React from "react";
import ImgSettingsComp from "./views/ImgSettingsComp";

const DefineWidgetSettingsComp = ({ choosenWidget }) => {
  console.log(choosenWidget, "choosenWidget");
  const { name } = choosenWidget;

  switch (name) {
    case "image":
      return <ImgSettingsComp choosenWidget={choosenWidget} />;
    case "line":
      return <ImgSettingsComp />;
    case "rectangle":
      return <ImgSettingsComp />;
    case "text_box":
      return <ImgSettingsComp />;
    default:
      return `${name} comming soon`;
  }
};

export default DefineWidgetSettingsComp;

// const DEFAULT_WG_POSITION_TOP = 10;
// const DEFAULT_WG_POSITION_LEFT = 10;
//
// basicSettings: { name: "Source", value: "" },
// linkTo: null,
//     appearence: { border: "solid" },
// size: {
//     sizing: { width: DEFAULT_WG_WEIGHT, height: DEFAULT_WG_HEIGHT },
// },
// position: {
//     top: DEFAULT_WG_POSITION_TOP,
//         left: DEFAULT_WG_POSITION_LEFT,
// },
// visibility: { visible: true },
// miscellaneous: { tooltip: [] },
