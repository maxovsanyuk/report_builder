import React, { useState } from "react";

import styled from "styled-components";

// MATERIAL UI

import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { SketchPicker } from "react-color";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";

// LODASH

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

const ImgSettingsComp = ({ choosenWidget }) => {
  const [currentState, setCurrentState] = useState({});
  const [colorPickerOpen, setColorPickerOpen] = useState(false);

  const state = useSelector((state) => state.app);
  const { widgetsList } = state;

  const dispatch = useDispatch();

  const choosenWg = widgetsList.find((w) => w?.id === choosenWidget?.id);

  console.log(choosenWg, "choosenWg");

  return (
    <>
      <h3 style={{ textAlign: "center" }}>{choosenWidget?.name} Settings</h3>

      <Paper style={{ padding: "20px", margin: "10px 0" }}>
        <TextField
          style={{
            width: "100%",
            margin: "15px 0",
          }}
          label="Name"
          name="widgetName"
          value={get(choosenWg, "displayName", "")}
          onChange={(e) => {
            dispatch(
              setWidgetsList(
                widgetsList.map((w) => {
                  return w?.id === choosenWidget?.id
                    ? { ...choosenWg, displayName: e.target.value }
                    : w;
                })
              )
            );
          }}
        />
        <h3 style={{ textAlign: "center", margin: "15px 0 0 0" }}>Basic</h3>

        <TextField
          style={{
            width: "100%",
            margin: "15px 0",
          }}
          label="Value"
          name="widgetName"
          value={get(choosenWg, "value", "")}
          onChange={(e) => {
            dispatch(
              setWidgetsList(
                widgetsList.map((w) => {
                  return w?.id === choosenWidget?.id
                    ? { ...choosenWg, value: e.target.value }
                    : w;
                })
              )
            );
          }}
        />

        <FormControl style={{ margin: "0 20px 0 0" }}>
          <InputLabel htmlFor="source-label">Source</InputLabel>
          <Select
            name="Source"
            value={get(choosenWg, "source", "")}
            onChange={(e) => {
              dispatch(
                setWidgetsList(
                  widgetsList.map((w) => {
                    return w?.id === choosenWidget?.id
                      ? { ...choosenWg, source: e.target.value }
                      : w;
                  })
                )
              );
            }}
            style={{
              width: "100px",
              maxWidth: "100px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            inputProps={{
              id: "source-label",
            }}
          >
            {["Embedded", "External", "Database"].map((i) => {
              return (
                <MenuItem key={i} value={i}>
                  {i}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl style={{ margin: "0 20px 0 0" }}>
          <InputLabel htmlFor="link-label">Link to</InputLabel>
          <Select
            name="Link"
            value={get(choosenWg, "linkTo", "")}
            onChange={(e) => {
              dispatch(
                setWidgetsList(
                  widgetsList.map((w) => {
                    return w?.id === choosenWidget?.id
                      ? { ...choosenWg, linkTo: e.target.value }
                      : w;
                  })
                )
              );
            }}
            style={{
              width: "100px",
              maxWidth: "100px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            inputProps={{
              id: "link-label",
            }}
          >
            {["None", "Report", "URL"].map((i) => {
              return (
                <MenuItem key={i} value={i}>
                  {i}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl style={{ margin: "0 20px 0 0" }}>
          <InputLabel htmlFor="border-label">Border</InputLabel>
          <Select
            name="Border"
            value={get(choosenWg, "border", "")}
            onChange={(e) => {
              dispatch(
                setWidgetsList(
                  widgetsList.map((w) => {
                    return w?.id === choosenWidget?.id
                      ? { ...choosenWg, border: e.target.value }
                      : w;
                  })
                )
              );
            }}
            style={{
              width: "100px",
              maxWidth: "100px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            inputProps={{
              id: "border-label",
            }}
            renderValue={() => {
              return (
                <div
                  style={{
                    maxWidth: "100px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {choosenWg?.border}
                </div>
              );
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

        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "20px 20px 0 0",
            position: "relative",
          }}
        >
          <span style={{ margin: "0 10px 0 0" }}>Border Color</span>

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
                color={get(choosenWg, "borderColor") || "#CCC"}
                value={get(choosenWg, "borderColor", "#fff")}
                onChangeComplete={(color) => {
                  dispatch(
                    setWidgetsList(
                      widgetsList.map((w) => {
                        return w?.id === choosenWidget?.id
                          ? { ...choosenWg, borderColor: color?.hex }
                          : w;
                      })
                    )
                  );
                }}
              />
            </div>
          )}

          <div
            onClick={() => setColorPickerOpen(!colorPickerOpen)}
            className="color-box"
            style={{
              background: get(choosenWg, "borderColor", "#fff"),
            }}
          />
        </div>

        <FormControl style={{ margin: "0 20px 0 0" }}>
          <InputLabel htmlFor="size-label">Sizing</InputLabel>
          <Select
            name="sizing"
            value={get(choosenWg, "sizing", "")}
            onChange={(e) => {
              dispatch(
                setWidgetsList(
                  widgetsList.map((w) => {
                    return w?.id === choosenWidget?.id
                      ? { ...choosenWg, sizing: e.target.value }
                      : w;
                  })
                )
              );
            }}
            style={{
              width: "100px",
              maxWidth: "100px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            inputProps={{
              id: "size-label",
            }}
          >
            {["AutoSize", "Fit", "FitPropotional", "Clip"].map((i) => {
              return (
                <MenuItem key={i} value={i}>
                  {i}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <SettingsBox>
          <h3 style={{ textAlign: "center", margin: "15px 0 0 0" }}>
            Position
          </h3>
          <div style={{ display: "flex" }}>
            {["top", "left"].map((i) => {
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    margin: "0 20px 0 0",
                  }}
                >
                  <TextField
                    type="number"
                    style={{
                      width: "70px",
                      margin: "0 10px 0 0",
                    }}
                    label={i}
                    name={i}
                    value={get(choosenWg, `position.${i}`)}
                    onChange={(e) => {
                      dispatch(
                        setWidgetsList(
                          widgetsList.map((w) => {
                            return w?.id === choosenWidget?.id
                              ? {
                                  ...choosenWg,
                                  position: {
                                    ...choosenWg.position,
                                    [i]: e.target.value,
                                  },
                                }
                              : w;
                          })
                        )
                      );
                    }}
                  />
                  px
                </div>
              );
            })}
          </div>
        </SettingsBox>
        <SettingsBox>
          <h3 style={{ textAlign: "center", margin: "15px 0 0 0" }}>Size</h3>
          <div style={{ display: "flex" }}>
            {["height", "width"].map((i) => {
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    margin: "0 20px 0 0",
                  }}
                >
                  <TextField
                    type="number"
                    style={{
                      width: "70px",
                      margin: "0 10px 0 0",
                    }}
                    label={i}
                    name={i}
                    value={get(choosenWg, `size.${i}`)}
                    onChange={(e) => {
                      dispatch(
                        setWidgetsList(
                          widgetsList.map((w) => {
                            return w?.id === choosenWidget?.id
                              ? {
                                  ...choosenWg,
                                  size: { [i]: e.target.value },
                                }
                              : w;
                          })
                        )
                      );
                    }}
                  />
                  px
                </div>
              );
            })}
          </div>
        </SettingsBox>
        <FormControlLabel
          control={
            <Checkbox
              style={{ margin: "10px 0" }}
              defaultChecked
              checked={get(choosenWg, "visibility")}
              onChange={(e) => {
                dispatch(
                  setWidgetsList(
                    widgetsList.map((w) => {
                      return w?.id === choosenWidget?.id
                        ? { ...choosenWg, visibility: e.target.checked }
                        : w;
                    })
                  )
                );
              }}
              name="checkedB"
              color="primary"
            />
          }
          label="Visibility"
        />

        <TextField
          style={{
            width: "100%",
          }}
          label="Toggle item"
          name="widgetName"
          // value={
          //   get(currentState, "name") || get(settings, "generalSettings.name")
          // }
          // onChange={(e) => {
          //   setCurrentState({ ...currentState, name: e.target.value });
          //
          //   dispatch(
          //     setSettings({
          //       ...settings,
          //       generalSettings: {
          //         ...settings?.generalSettings,
          //         name: e.target.value,
          //       },
          //     })
          //   );
          // }}
        />
        <h3 style={{ textAlign: "center", margin: "15px 0 0 0" }}>
          Miscellaneous
        </h3>
        <TextField
          style={{
            width: "100%",
          }}
          label="Tooltip"
          name="widgetName"
          value={get(choosenWg, "tooltip", "")}
          onChange={(e) => {
            dispatch(
              setWidgetsList(
                widgetsList.map((w) => {
                  return w?.id === choosenWidget?.id
                    ? { ...choosenWg, tooltip: e.target.value }
                    : w;
                })
              )
            );
          }}
        />

        <SpecifyComponent>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <button className="btn-title">Add Custom Attributes</button>
            <button
              className="add-btn"
              // disabled={parametersList && parametersList.length && !isFullForm}
              // style={{
              //   opacity:
              //     parametersList && parametersList.length && !isFullForm
              //       ? ".3"
              //       : 1,
              // }}
              // onClick={() => {
              //   setParametersList([
              //     ...parametersList,
              //     { id: new Date().getTime(), value: "", label: "" },
              //   ]);
              //   setIsfullForm(false);
              //   setNewList({});
              // }}
            >
              + ADD
            </button>
          </div>

          <div className="parameters-box">
            {[2, 3].map(({ label, value, id }) => {
              return (
                <Paper
                  key={id}
                  style={{
                    margin: "20px 20px 10px 20px",
                  }}
                >
                  <form
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      // register={register}
                      style={{
                        width: "200px",
                        margin: "5px 0 15px 15px",
                      }}
                      label="Default Value"
                      name="DefaultValue"
                      // onChange={(e) => {
                      //   setNewList({
                      //     ...newList,
                      //     defaultValue: e.target.value,
                      //   });
                      //
                      //   setParametersList(
                      //     parametersList.map((p) => {
                      //       return p.id === id
                      //         ? { ...p, value: e.target.value }
                      //         : p;
                      //     })
                      //   );
                      //
                      //   dispatch(
                      //     setNewParametersSetState({
                      //       ...newParametersSet,
                      //       [name]: {
                      //         ...newParametersSet[name],
                      //         specify: {
                      //           ...newParametersSet[name].specify,
                      //           items: parametersList,
                      //         },
                      //       },
                      //     })
                      //   );
                      // }}
                      // value={value || get(newList, "value")}
                    />

                    <IconButton
                      component="span"
                      // onClick={() => {
                      //   setParametersList(
                      //     parametersList.filter((l) => l.id !== id)
                      //   );
                      //   setIsfullForm(true);
                      //
                      //   dispatch(
                      //     setNewParametersSetState({
                      //       ...newParametersSet,
                      //       [name]: {
                      //         ...newParametersSet[name],
                      //         specify: {
                      //           ...newParametersSet[name].specify,
                      //           items: parametersList.filter(
                      //             (l) => l.id !== id
                      //           ),
                      //         },
                      //       },
                      //     })
                      //   );
                      // }}
                      style={{
                        maxWidth: "28px",
                        marginRight: "10px",
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </form>
                </Paper>
              );
            })}
          </div>
        </SpecifyComponent>
      </Paper>
    </>
  );
};

export default ImgSettingsComp;
