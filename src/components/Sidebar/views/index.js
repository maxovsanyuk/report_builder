import React from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import StorageIcon from "@material-ui/icons/Storage";
import FilterListIcon from "@material-ui/icons/FilterList";
import WallpaperIcon from "@material-ui/icons/Wallpaper";
import SidebarSettings from "../SidebarSettings/SidebarSettings";
import SidebarData from "../SidebarData/SideBarData";
import SidebarParameters from "../SidebarParameters/SidebarParameters-redux";
import SidebarImageManager from "../SidebarImageManager/SidebarImageManager";

export const DefineIconComp = ({ name }) => {
  switch (name) {
    case "properties":
      return <SettingsIcon />;

    case "data":
      return <StorageIcon />;

    case "parameters":
      return <FilterListIcon />;

    case "image":
      return <WallpaperIcon />;

    default:
      return "Not found";
  }
};

export const DefineActiveComp = ({ name }) => {
  switch (name) {
    case "properties":
      return <SidebarSettings />;

    case "data":
      return <SidebarData />;

    case "parameters":
      return <SidebarParameters />;

    case "image":
      return <SidebarImageManager />;

    default:
      return "Not found";
  }
};
