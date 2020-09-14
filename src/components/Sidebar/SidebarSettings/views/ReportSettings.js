import React, { useState } from "react";

import SelectValueReportComp from "./widgetComponent/views/settingsReportComponents/SelectValueReportComp";
import TextValueReportComp from "./widgetComponent/views/settingsReportComponents/TextValueReportComp";

import styled from "styled-components";

// MATERIAL

import Paper from "@material-ui/core/Paper";
import { SketchPicker } from "react-color";
import get from "lodash/get";
import { setSettings } from "../../../../redux/actions/app_action";
import { useDispatch, useSelector } from "react-redux";

const SettingsBox = styled.div`
  width: calc(100% - 20px);
  margin: 10px 0 0 0;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 10px;

  .color-picker {
    &:hover {
      cursor: pointer;
    }
  }

  .close-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    position: absolute;
    top: -10px;
    right: -10px;
    border-radius: 50%;
    border: 1px solid #ccc;
    background: #fff;
    font-size: 12px;
    color: #999;
    z-index: 30;
    transition: 0.3s;
    &:hover {
      transition: 0.3s;
      cursor: pointer;
      color: #000;
    }
  }

  .color-box {
    min-width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid #ccc;
    transition: 0.6s;

    &:hover {
      cursor: pointer;
    }
  }
`;

const ReportSettings = () => {
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [backgroundColorPickerOpen, setBackgroundColorPickerOpen] = useState(
    false
  );

  const state = useSelector((state) => state.app);
  const { settings } = state;

  const dispatch = useDispatch();

  console.log(settings, "SS");

  return (
    <SettingsBox>
      <Paper style={{ padding: "10px 10px 20px 10px", margin: "10px 0" }}>
        <h3 style={{ textAlign: "center", margin: "15px 0 0 0" }}>Basic</h3>

        <SelectValueReportComp
          param="border"
          arrOfValues={["dashed", "dotted", "double", "none", "solid"]}
          label="Border"
          objParam="basic"
        />

        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "20px 20px 0 0",
              position: "relative",
            }}
          >
            <span style={{ margin: "0 10px 0 0" }}>Color</span>

            {colorPickerOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "-30px",
                  left: "120px",
                  zIndex: 20,
                }}
              >
                <span
                  className="close-btn"
                  onClick={() => setColorPickerOpen(!colorPickerOpen)}
                >
                  X
                </span>
                <SketchPicker
                  className="color-picker"
                  color={get(settings, "reportSettings.basic.color") || "#CCC"}
                  onChangeComplete={(color) => {
                    dispatch(
                      setSettings({
                        ...settings,
                        reportSettings: {
                          ...settings?.reportSettings,
                          basic: {
                            ...settings?.reportSettings?.basic,
                            color,
                          },
                        },
                      })
                    );
                  }}
                />
              </div>
            )}

            <div
              onClick={() => setColorPickerOpen(!colorPickerOpen)}
              className="color-box"
              style={{
                background:
                  get(settings, "reportSettings.basic.color.hex") || "#CCC",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "fit-content",
              margin: "20px 0 0 0",
              position: "relative",
            }}
          >
            <span style={{ margin: "0 10px 0 0" }}>Pick Background Color</span>
            {backgroundColorPickerOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "-30px",
                  left: "120px",
                  zIndex: 20,
                }}
              >
                <span
                  className="close-btn"
                  onClick={() =>
                    setBackgroundColorPickerOpen(!backgroundColorPickerOpen)
                  }
                >
                  X
                </span>
                <SketchPicker
                  className="color-picker"
                  color={
                    get(settings, "reportSettings.basic.backgroundColor.hex") ||
                    "#CCC"
                  }
                  onChangeComplete={(color) => {
                    dispatch(
                      setSettings({
                        ...settings,
                        reportSettings: {
                          ...settings?.reportSettings,
                          basic: {
                            ...settings?.reportSettings?.basic,
                            backgroundColor: color,
                          },
                        },
                      })
                    );
                  }}
                />
              </div>
            )}

            <div
              onClick={() =>
                setBackgroundColorPickerOpen(!backgroundColorPickerOpen)
              }
              className="color-box"
              style={{
                background:
                  get(settings, "reportSettings.basic.backgroundColor.hex") ||
                  "#CCC",
              }}
            />
          </div>
        </div>
      </Paper>

      <Paper style={{ padding: "15px" }}>
        <h3 style={{ textAlign: "center", margin: "15px 0 10px 0" }}>
          Background Image
        </h3>

        <div style={{ display: "flex", alignItems: "center" }}>
          <SelectValueReportComp
            param="source"
            arrOfValues={["External", "Embedded", "Dynamics 365"]}
            label="Source"
            objParam="backgroundImage"
          />

          <TextValueReportComp
            objParam="backgroundImage"
            label="Value"
            param="value"
            style={{
              width: "180px",
              margin: "0 20px 0 20px",
            }}
            type="text"
          />

          <SelectValueReportComp
            param="repeat"
            arrOfValues={[
              "default",
              "repeat",
              "repeatX",
              "repeatY",
              "clip",
              "fit",
            ]}
            label="Repeat"
            objParam="backgroundImage"
          />
        </div>
      </Paper>
      <Paper style={{ padding: "15px" }}>
        <h3 style={{ textAlign: "center", margin: "15px 0 10px 0" }}>
          Position
        </h3>

        <div style={{ display: "flex", alignItems: "center" }}>
          {["height", "width"].map((r) => {
            return (
              <TextValueReportComp
                key={r}
                objParam="position"
                label={r}
                param={r}
                type="number"
                textAfter="px"
              />
            );
          })}
        </div>
      </Paper>
    </SettingsBox>
  );
};

export default ReportSettings;

// <div style={{ display: "flex", alignItems: "center" }}>
//   {["height", "width"].map((r) => {
//     return (
//       <TextValueReportComp
//         key={r}
//         objParam="basic"
//         label={r}
//         param={r}
//         style={{
//           display: "flex",
//           alignItems: "flex-end",
//           margin: "0 20px 0 0",
//         }}
//         type="number"
//         textAfter="px"
//       />
//     );
//   })}
// </div>;
