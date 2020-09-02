import React, { useState } from "react";
import { AnimatedComponent } from "../../views/AnimatedComponent";

import styled from "styled-components";

import GeneralSettings from "./views/GeneralSettings";
import Dynamics365Settings from "./views/Dynamics365Settings";
import ReportSettings from "./views/ReportSettings";
import WidgetSettings from "./views/WidgetSettings";

// MATERIAL UI

import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import { useDispatch, useSelector } from "react-redux";
import { setChoosenSettingsType } from "../../../redux/actions/app_action";

const SettingsComp = styled.div`
  width: calc(100% - 40px);
  height: calc(100% - 80px);
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px;
  background: aliceblue;
  overflow: auto;
`;

const settingsRows = [
  { name: "General Settings", type: "general_settings" },
  { name: "Dynamics 365 Settings", type: "dynamics365_settings" },
  { name: "Report Settings", type: "report_settings" },
  { name: "Widget Settings", type: "widget_settings" },
];

const SRow = styled.div`
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 5px 0;
    padding: 5px 10px 5px 0;
    transition: 0.3s;

    &:hover {
      transition: 0.3s;
      background: gainsboro;
      color: dodgerblue;
      cursor: pointer;
      padding: 5px 10px 5px 10px;
      border-radius: 2px;
    }
  }

  .btns-box:hover {
    cursor: pointer;
  }
`;

const DefineSettingsComponent = ({ type }) => {
  switch (type) {
    case "general_settings":
      return <GeneralSettings />;
    case "dynamics365_settings":
      return <Dynamics365Settings />;
    case "report_settings":
      return <ReportSettings />;
    case "widget_settings":
      return <WidgetSettings />;
    default:
      return "Coming Soon";
  }
};

const SettingsRow = ({ type, name }) => {
  const [isOpen, setIsOpen] = useState(false);

  const state = useSelector((state) => state.app);
  const { choosenSettingsType } = state;

  const dispatch = useDispatch();

  if (type === "widget_settings" && choosenSettingsType !== type) {
    return null;
  }

  return (
    <SRow>
      <div className="header">
        {name}
        <div className="btns-box">
          {isOpen || choosenSettingsType === type ? (
            <RemoveOutlinedIcon
              onClick={() => {
                dispatch(setChoosenSettingsType(null));
                setIsOpen(false);
              }}
            />
          ) : (
            <AddOutlinedIcon onClick={() => setIsOpen(true)} />
          )}
        </div>
      </div>

      {(isOpen || choosenSettingsType === type) && (
        <DefineSettingsComponent type={type} />
      )}
    </SRow>
  );
};

const SidebarSettings = () => {
  return (
    <AnimatedComponent>
      <SettingsComp>
        <h2 style={{ textAlign: "center" }}>Settings</h2>

        {settingsRows.map(({ name, type }) => (
          <SettingsRow key={type} type={type} name={name} />
        ))}
      </SettingsComp>
    </AnimatedComponent>
  );
};

export default SidebarSettings;
