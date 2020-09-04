import React from "react";

// SETTINGS COMP

import CustomAttributeComp from "./settingsComponents/CustomAttributesComp";
import TextValueComp from "./settingsComponents/TextValueComp";
import SelectValueComp from "./settingsComponents/SelectValueComp";
import CheckBoxComp from "./settingsComponents/CheckBoxComp";
import ChooseColorComp from "./settingsComponents/ChooseColorComp";

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

const ImgSettingsComp = ({ choosenWidget }) => {
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

        <TextValueComp
          choosenWidget={choosenWidget}
          param="value"
          label="Value"
          style={{ width: "100%" }}
        />

        <SelectValueComp
          param="source"
          label="Source"
          choosenWidget={choosenWidget}
          arrOfValues={["Embedded", "External", "Database"]}
          style={selectStyle}
        />

        <SelectValueComp
          param="linkTo"
          label="Link To"
          choosenWidget={choosenWidget}
          arrOfValues={["None", "Report", "URL"]}
          style={selectStyle}
        />

        <SelectValueComp
          param="border"
          label="Border"
          choosenWidget={choosenWidget}
          arrOfValues={["Dashed", "Dotted", "Double", "None", "Solid"]}
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

        <SelectValueComp
          param="sizing"
          label="Sizing"
          choosenWidget={choosenWidget}
          arrOfValues={["AutoSize", "Fit", "FitPropotional", "Clip"]}
          style={selectStyle}
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
        </SettingsBox>
        <SettingsBox>
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

export default ImgSettingsComp;
