import React from "react";

// SETTINGS COMP

import TextValueComp from "./settingsComponents/TextValueComp";
import SelectValueComp from "./settingsComponents/SelectValueComp";
import CheckBoxComp from "./settingsComponents/CheckBoxComp";
import CustomAttributeComp from "./settingsComponents/CustomAttributesComp";

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

const LineSettingsComp = ({ choosenWidget }) => {
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
          param="line"
          label="Line"
          choosenWidget={choosenWidget}
          arrOfValues={["dashed", "dotted", "double", "none", "solid"]}
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
          </div>
        </SettingsBox>

        <CheckBoxComp
          param="visibility"
          label="Visibility"
          choosenWidget={choosenWidget}
        />

        <TextValueComp
          choosenWidget={choosenWidget}
          param="toggleItem"
          label="Toggle Item"
          style={{ width: "100%" }}
        />

        <h3 style={{ textAlign: "center", margin: "15px 0 0 0" }}>
          Miscellaneous
        </h3>

        <SpecifyComponent>
          <CustomAttributeComp choosenWidget={choosenWidget} />
        </SpecifyComponent>
      </Paper>
    </>
  );
};

export default LineSettingsComp;
