import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSettings } from "../../../../redux/actions/app_action";

import { SketchPicker } from "react-color";

// MATERIAL UI

import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

// LODASH

import get from "lodash/get";

const BasicSettingsComp = () => {
  const [currentState, setCurrentState] = useState({});
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [backgroundColorPickerOpen, setBackgroundColorPickerOpen] = useState(
    false
  );

  const state = useSelector((state) => state.app);
  const { settings } = state;
  const dispatch = useDispatch();

  return (
    <Paper style={{ padding: "10px 10px 20px 10px", margin: "10px 0" }}>
      <h3 style={{ textAlign: "center", margin: "15px 0 0 0" }}>Basic</h3>
      <FormControl style={{ margin: "0 20px 0 0" }}>
        <InputLabel htmlFor="border-label">Border</InputLabel>

        <Select
          name="Border"
          value={
            get(currentState, "basic.border") ||
            get(settings, "reportSettings.basic.border")
          }
          onChange={(e) => {
            setCurrentState({
              ...currentState,
              basic: { ...currentState?.basic, border: e.target.value },
            });

            dispatch(
              setSettings({
                ...settings,
                reportSettings: {
                  ...settings?.reportSettings,
                  basic: {
                    ...settings?.reportSettings?.basic,
                    border: e.target.value,
                  },
                },
              })
            );
          }}
          style={{
            width: "100px",
            maxWidth: "100px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          required
          inputProps={{
            id: "border-label",
          }}
        >
          {["Dashed", "Dotted", "Double", "None", "Solid"].map((i) => {
            return (
              <MenuItem key={i} value={i}>
                {i}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
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
                color={
                  get(currentState, "basic.color") ||
                  get(settings, "reportSettings.basic.color") ||
                  "#CCC"
                }
                onChangeComplete={(color) => {
                  setCurrentState({
                    ...currentState,
                    basic: { ...currentState?.basic, color },
                  });

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
                get(currentState, "basic.color.hex") ||
                get(settings, "reportSettings.basic.color.hex") ||
                "#CCC",
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
                  get(currentState, "basic.backgroundColor.hex") ||
                  get(settings, "reportSettings.basic.backgroundColor.hex") ||
                  "#CCC"
                }
                onChangeComplete={(color) => {
                  setCurrentState({
                    ...currentState,
                    basic: { ...currentState?.basic, backgroundColor: color },
                  });

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
                get(currentState, "basic.backgroundColor.hex") ||
                get(settings, "reportSettings.basic.backgroundColor.hex") ||
                "#CCC",
            }}
          />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end" }}>
        <div style={{ margin: "0 20px 0 0" }}>Size</div>
        {["height", "width"].map((i) => {
          return (
            <div key={i} style={{ display: "flex", alignItems: "flex-end" }}>
              <TextField
                type="number"
                style={{
                  width: "55px",
                  margin: "0 10px",
                }}
                label={i}
                name={i}
                value={
                  get(currentState, `basic.size.${i}`) ||
                  get(settings, `reportSettings.basic.size.${i}`)
                }
                onChange={(e) => {
                  e.target.value >= 0 &&
                    setCurrentState({
                      ...currentState,
                      basic: {
                        ...currentState?.basic,
                        size: {
                          ...get(currentState, "basic.size"),
                          [i]: e.target.value,
                        },
                      },
                    });

                  e.target.value >= 0 &&
                    dispatch(
                      setSettings({
                        ...settings,
                        reportSettings: {
                          ...settings?.reportSettings,
                          basic: {
                            ...get(settings, "reportSettings.basic"),
                            size: {
                              ...get(settings, "reportSettings.basic.size"),
                              [i]: e.target.value,
                            },
                          },
                        },
                      })
                    );
                }}
              />
              px
            </div>
          );
        })}
      </div>
    </Paper>
  );
};

export default BasicSettingsComp;
