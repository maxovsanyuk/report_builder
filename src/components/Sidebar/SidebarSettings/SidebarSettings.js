import React, { useState } from "react";
import { AnimatedComponent } from "../../views/AnimatedComponent";

import styled from "styled-components";

import GeneralSettings from "./views/GeneralSettings";
import Dynamics365Settings from "./views/Dynamics365Settings";
import ReportSettings from "./views/ReportSettings";
import Position from "./views/Position";

// MATERIAL

import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";

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
  "General Settings",
  "Dynamics 365 Settings",
  "Report Settings",
  "Position",
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

const DefineSettingsComponent = ({ title }) => {
  switch (title) {
    case "General Settings":
      return <GeneralSettings />;
    case "Dynamics 365 Settings":
      return <Dynamics365Settings />;
    case "Report Settings":
      return <ReportSettings />;
    case "Position":
      return <Position />;
    default:
      return "Coming Soon";
  }
};

const SettingsRow = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <SRow>
      <div className="header">
        {title}
        <div className="btns-box">
          {isOpen ? (
            <RemoveOutlinedIcon onClick={() => setIsOpen(false)} />
          ) : (
            <AddOutlinedIcon onClick={() => setIsOpen(true)} />
          )}
        </div>
      </div>

      {isOpen && <DefineSettingsComponent title={title} />}
    </SRow>
  );
};

const SidebarSettings = () => {
  return (
    <AnimatedComponent>
      <SettingsComp>
        <h2 style={{ textAlign: "center" }}>Settings</h2>

        {settingsRows.map((r) => (
          <SettingsRow key={r} title={r} />
        ))}
      </SettingsComp>
    </AnimatedComponent>
  );
};

export default SidebarSettings;
