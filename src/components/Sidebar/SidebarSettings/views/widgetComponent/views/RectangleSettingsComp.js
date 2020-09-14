import React from "react";

// SETTINGS COMP

import CustomAttributeComp from "./settingsWidgetComponents/CustomAttributesComp";
import TextValueComp from "./settingsWidgetComponents/TextValueComp";
import SelectValueComp from "./settingsWidgetComponents/SelectValueComp";
import CheckBoxComp from "./settingsWidgetComponents/CheckBoxComp";
import ChooseColorComp from "./settingsWidgetComponents/ChooseColorComp";

import styled from "styled-components";

// MATERIAL UI

import Paper from "@material-ui/core/Paper";

const SettingsBox = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 20px);
  border-radius: 3px;
`;

const SpecifyComponent = styled.div`
  margin: 20px 0 0 0;

  .btn-title {
    font-size: 12px;
    background: none;
    border: none;
    &:hover {
      cursor: pointer;
    }
    &:focus {
      outline: none;
    }
  }

  .parameters-box {
    width: 100%;
    height: 250px;
    margin: 10px 0 0 0;
    border: 1px solid #ccc;
    border-radius: 3px;
    overflow: auto;
  }

  .add-btn {
    border: none;
    background: none;
    color: red;
    transition: 0.3s;
    &:hover {
      cursor: pointer;
      color: blue;
      transition: 0.3s;
    }
    &:focus {
      outline: none;
    }
  }
`;

const selectStyle = {
  width: "100px",
  maxWidth: "100px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const RectangleSettingsComp = ({ choosenWidget }) => {
  return (
    <>
      <h3 style={{ textAlign: "center" }}>{choosenWidget?.name} Settings</h3>

      <Paper style={{ padding: "20px", margin: "10px 0" }}>
        <TextValueComp
          choosenWidget={choosenWidget}
          param="displayName"
          label="Name"
          style={{ width: "100%" }}
        />

        <h3 style={{ textAlign: "center", margin: "15px 0 0 0" }}>Basic</h3>

        <SelectValueComp
          param="border"
          label="Border"
          choosenWidget={choosenWidget}
          arrOfValues={["dashed", "dotted", "double", "none", "solid"]}
          style={selectStyle}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "20px 20px 0 0",
            position: "relative",
          }}
        >
          <span style={{ margin: "0 10px 0 0" }}>Border Color</span>

          <ChooseColorComp choosenWidget={choosenWidget} param="borderColor" />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "20px 20px 0 0",
            position: "relative",
          }}
        >
          <span style={{ margin: "0 10px 0 0" }}>Background Color</span>

          <ChooseColorComp
            choosenWidget={choosenWidget}
            param="backgroundColor"
          />
        </div>

        <h3 style={{ textAlign: "center", margin: "15px 0 0 0" }}>
          Page Break
        </h3>

        <SelectValueComp
          param="breakLocation"
          label="Break Location"
          choosenWidget={choosenWidget}
          arrOfValues={["none", "start", "end", "startAndEnd", "between"]}
          style={{ ...selectStyle, width: "200px", maxWidth: "200px" }}
        />

        <CheckBoxComp
          param={"pageNumberReset"}
          label="Page Number Reset"
          choosenWidget={choosenWidget}
        />

        <SettingsBox>
          <h3 style={{ textAlign: "center", margin: "15px 0 0 0" }}>
            Position
          </h3>
          <div style={{ display: "flex" }}>
            {["top", "left"].map((i) => {
              return (
                <TextValueComp
                  key={i}
                  type="number"
                  choosenWidget={choosenWidget}
                  param={i}
                  objParam="position"
                  label={i}
                  textAfter="px"
                />
              );
            })}
          </div>

          <h3 style={{ textAlign: "center", margin: "15px 0 0 0" }}>Size</h3>
          <div style={{ display: "flex" }}>
            {["height", "width"].map((i) => {
              return (
                <TextValueComp
                  key={i}
                  type="number"
                  choosenWidget={choosenWidget}
                  param={i}
                  objParam="size"
                  label={i}
                  textAfter="px"
                />
              );
            })}
          </div>
        </SettingsBox>

        <h3 style={{ textAlign: "center", margin: "15px 0 0 0" }}>
          Visibility
        </h3>

        <CheckBoxComp
          param={"visibility"}
          label="Visibility"
          choosenWidget={choosenWidget}
        />

        <TextValueComp
          choosenWidget={choosenWidget}
          param="toggleItem"
          label="Toggle item"
          style={{ width: "100%" }}
        />

        <h3 style={{ textAlign: "center", margin: "15px 0 0 0" }}>
          Miscellaneous
        </h3>

        <CheckBoxComp
          param={"keepTogether"}
          label="Keep Together"
          choosenWidget={choosenWidget}
        />

        <TextValueComp
          choosenWidget={choosenWidget}
          param="pageName"
          label="Page Name"
          style={{ width: "100%" }}
        />

        <TextValueComp
          choosenWidget={choosenWidget}
          param="tooltip"
          label="Tooltip"
          style={{ width: "100%" }}
        />

        <SpecifyComponent>
          <SpecifyComponent>
            <CustomAttributeComp choosenWidget={choosenWidget} />
          </SpecifyComponent>
        </SpecifyComponent>
      </Paper>
    </>
  );
};

export default RectangleSettingsComp;
