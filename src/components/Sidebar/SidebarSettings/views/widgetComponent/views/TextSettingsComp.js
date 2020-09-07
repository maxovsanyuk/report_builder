import React from "react";

// SETTINGS COMP

import TextValueComp from "./settingsComponents/TextValueComp";
import SelectValueComp from "./settingsComponents/SelectValueComp";
import CheckBoxComp from "./settingsComponents/CheckBoxComp";
import CustomAttributeComp from "./settingsComponents/CustomAttributesComp";

import styled from "styled-components";

// MATERIAL UI

import Paper from "@material-ui/core/Paper";
import ChooseColorComp from "./settingsComponents/ChooseColorComp";
import TextField from "@material-ui/core/TextField";
import get from "lodash/get";
import { setWidgetsList } from "../../../../../../redux/actions/app_action";

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

const TextSettingsComp = ({ choosenWidget }) => {
  return (
    <>
      <h3 style={{ textAlign: "center" }}>{choosenWidget?.name} Settings</h3>

      <Paper style={{ padding: "20px", margin: "10px 0" }}>
        <h3 style={{ textAlign: "center", margin: "15px 0 0 0" }}>Basic</h3>

        <TextValueComp
          choosenWidget={choosenWidget}
          param="text"
          label="Text"
          multiline
          rows={4}
          variant="filled"
          style={{ width: "100%" }}
        />

        <SelectValueComp
          param="fontName"
          label="Font Name"
          choosenWidget={choosenWidget}
          arrOfValues={["Arial", "2", "3", "4", "5"]}
        />
        <SelectValueComp
          param="fontStyle"
          label="Font Style"
          choosenWidget={choosenWidget}
          arrOfValues={["default", "normall", "italic"]}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "20px 20px 0 0",
            position: "relative",
          }}
        >
          <SelectValueComp
            param="textDecoration"
            label="Text Decoration"
            choosenWidget={choosenWidget}
            style={{ width: "140px", maxWidth: "140px" }}
            arrOfValues={[
              "default",
              "mone",
              "underline",
              "lineThrough",
              "overline",
            ]}
          />

          <span style={{ margin: "0 10px 0 0" }}>Text Color</span>

          <ChooseColorComp choosenWidget={choosenWidget} param="textColor" />
        </div>
        <h3 style={{ textAlign: "center", margin: "15px 0 0 0" }}>
          Format (Comming soon)
        </h3>
        <h3 style={{ textAlign: "center", margin: "15px 0 0 0" }}>Alignment</h3>
        <SelectValueComp
          param="textAlignment"
          label="Text Alignment"
          choosenWidget={choosenWidget}
          style={{ width: "140px", maxWidth: "140px" }}
          arrOfValues={["default", "left", "center", "right"]}
        />
        <SelectValueComp
          param="verticalAlignment"
          label="Vertical Alignment"
          choosenWidget={choosenWidget}
          style={{ width: "180px", maxWidth: "180px" }}
          arrOfValues={["default", "top", "middle", "bottom"]}
        />
        <h3 style={{ textAlign: "center", margin: "15px 0 0 0" }}>Padding</h3>
        <div style={{ display: "flex" }}>
          {["left", "right", "top", "bottom"].map((r) => (
            <TextValueComp
              key={r}
              type="number"
              choosenWidget={choosenWidget}
              param={r}
              objParam="padding"
              label={r}
              textAfter="px"
            />
          ))}
        </div>
        <TextValueComp
          type="number"
          choosenWidget={choosenWidget}
          param="lineHeight"
          objParam="padding"
          label="Line Height"
          textAfter="px"
          style={{ width: "160px", maxWidth: "160px" }}
        />
        <SelectValueComp
          param="writingMode"
          label="Writing mode"
          choosenWidget={choosenWidget}
          style={{ width: "180px", maxWidth: "180px" }}
          arrOfValues={["Default", "Horizontal", "Vertical", "Rotate270"]}
        />
        <h3 style={{ textAlign: "center", margin: "15px 0 0 0" }}>
          Appearence
        </h3>
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
        <SelectValueComp
          param="border"
          label="Border"
          choosenWidget={choosenWidget}
          arrOfValues={["Dashed", "Dotted", "Double", "None", "Solid"]}
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
          param="linkTo"
          label="Link To"
          choosenWidget={choosenWidget}
          arrOfValues={["none", "report", "url"]}
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

        <CheckBoxComp
          param="initialToggleState"
          label="Initial Toggle state"
          choosenWidget={choosenWidget}
        />

        <h3 style={{ textAlign: "center", margin: "15px 0 0 0" }}>
          Localization
        </h3>

        <SelectValueComp
          param="direction"
          label="Direction"
          choosenWidget={choosenWidget}
          arrOfValues={["default", "LTR", "RTL"]}
        />

        <SelectValueComp
          param="language"
          label="Language"
          choosenWidget={choosenWidget}
          arrOfValues={["EN", "UA", "PL"]}
        />

        <h3 style={{ textAlign: "center", margin: "15px 0 0 0" }}>
          Miscellaneous
        </h3>

        <CheckBoxComp
          param="canGrow"
          label="Can Grow"
          choosenWidget={choosenWidget}
        />

        <CheckBoxComp
          param="canShrink"
          label="Can Shrink"
          choosenWidget={choosenWidget}
        />

        <TextValueComp
          choosenWidget={choosenWidget}
          param="tooltip"
          label="Tooltip"
          style={{ width: "100%" }}
        />

        <SpecifyComponent>
          <CustomAttributeComp choosenWidget={choosenWidget} />
        </SpecifyComponent>
      </Paper>
    </>
  );
};

export default TextSettingsComp;
