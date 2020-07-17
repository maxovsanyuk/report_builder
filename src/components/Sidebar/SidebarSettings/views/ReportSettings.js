import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSettings } from "../../../../redux/actions/app_action";

import styled from "styled-components";
import { SketchPicker } from "react-color";

// MATERIAL

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";

// LODASH

import get from "lodash/get";
import TextField from "@material-ui/core/TextField";

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
  const [currentState, setCurrentState] = useState({});
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [backgroundColorPickerOpen, setBackgroundColorPickerOpen] = useState(
    false
  );

  const state = useSelector((state) => state.app);
  const { settings } = state;
  const dispatch = useDispatch();

  console.log(settings, "SSSS");

  return (
    <SettingsBox>
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

      <Paper style={{ padding: "10px 10px 20px 10px", margin: "10px 0" }}>
        <h3 style={{ textAlign: "center", margin: "15px 0 10px 0" }}>
          Background Image
        </h3>
        <FormControl>
          <InputLabel htmlFor="source-label">Source</InputLabel>

          <Select
            name="source"
            value={
              get(currentState, "backgroundImage.source") ||
              get(settings, "reportSettings.backgroundImage.source")
            }
            onChange={(e) => {
              setCurrentState({
                ...currentState,
                backgroundImage: {
                  ...currentState?.basic,
                  source: e.target.value,
                },
              });

              dispatch(
                setSettings({
                  ...settings,
                  reportSettings: {
                    ...settings?.reportSettings,
                    backgroundImage: {
                      ...settings?.reportSettings?.backgroundImage,
                      source: e.target.value,
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
              id: "source-label",
            }}
          >
            {["External", "Embedded", "Dynamics 365"].map((i) => {
              return (
                <MenuItem key={i} value={i}>
                  {i}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <TextField
          style={{
            width: "180px",
            margin: "0 20px 0 20px",
          }}
          label="Value"
          name="Value"
          value={
            get(currentState, "backgroundImage.value") ||
            get(settings, "reportSettings.backgroundImage.value")
          }
          onChange={(e) => {
            setCurrentState({
              ...currentState,
              backgroundImage: {
                ...currentState?.basic,
                value: e.target.value,
              },
            });

            dispatch(
              setSettings({
                ...settings,
                reportSettings: {
                  ...settings?.reportSettings,
                  backgroundImage: {
                    ...settings?.reportSettings?.backgroundImage,
                    value: e.target.value,
                  },
                },
              })
            );
          }}
        />
        <FormControl>
          <InputLabel htmlFor="source-label">Repeat</InputLabel>

          <Select
            name="repeat"
            value={
              get(currentState, "backgroundImage.repeat") ||
              get(settings, "reportSettings.backgroundImage.repeat")
            }
            onChange={(e) => {
              setCurrentState({
                ...currentState,
                backgroundImage: {
                  ...currentState?.basic,
                  repeat: e.target.value,
                },
              });

              dispatch(
                setSettings({
                  ...settings,
                  reportSettings: {
                    ...settings?.reportSettings,
                    backgroundImage: {
                      ...settings?.reportSettings?.backgroundImage,
                      repeat: e.target.value,
                    },
                  },
                })
              );
            }}
            style={{ width: "100px" }}
            required
            inputProps={{
              id: "source-label",
            }}
          >
            {["Default", "Repeat", "RepeatX", "RepeatY", "Clip", "Fit"].map(
              (i) => {
                return (
                  <MenuItem key={i} value={i}>
                    {i}
                  </MenuItem>
                );
              }
            )}
          </Select>
        </FormControl>
      </Paper>
    </SettingsBox>
  );
};

export default ReportSettings;
