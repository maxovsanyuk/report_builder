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

  return (
    <>
      <h3 style={{ textAlign: "center" }}>{choosenWidget?.name} Settings</h3>

      <Paper style={{ padding: "20px", margin: "10px 0" }}>
        <TextField
          required
          style={{
            width: "100%",
            margin: "15px 0",
          }}
          label="Name"
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
        <h3 style={{ textAlign: "center", margin: "15px 0 0 0" }}>Basic</h3>

        <TextField
          required
          style={{
            width: "100%",
            margin: "15px 0",
          }}
          label="Value"
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

        <FormControl style={{ margin: "0 20px 0 0" }}>
          <InputLabel htmlFor="source-label">Source</InputLabel>
          <Select
            name="Source"
            // value={
            //   get(currentState, "basic.border") ||
            //   get(settings, "reportSettings.basic.border")
            // }
            // onChange={(e) => {
            //   setCurrentState({
            //     ...currentState,
            //     basic: { ...currentState?.basic, border: e.target.value },
            //   });
            //
            //   dispatch(
            //     setSettings({
            //       ...settings,
            //       reportSettings: {
            //         ...settings?.reportSettings,
            //         basic: {
            //           ...settings?.reportSettings?.basic,
            //           border: e.target.value,
            //         },
            //       },
            //     })
            //   );
            // }}
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
            // value={
            //   get(currentState, "basic.border") ||
            //   get(settings, "reportSettings.basic.border")
            // }
            // onChange={(e) => {
            //   setCurrentState({
            //     ...currentState,
            //     basic: { ...currentState?.basic, border: e.target.value },
            //   });
            //
            //   dispatch(
            //     setSettings({
            //       ...settings,
            //       reportSettings: {
            //         ...settings?.reportSettings,
            //         basic: {
            //           ...settings?.reportSettings?.basic,
            //           border: e.target.value,
            //         },
            //       },
            //     })
            //   );
            // }}
            style={{
              width: "100px",
              maxWidth: "100px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            required
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
            // value={
            //   get(currentState, "basic.border") ||
            //   get(settings, "reportSettings.basic.border")
            // }
            // onChange={(e) => {
            //   setCurrentState({
            //     ...currentState,
            //     basic: { ...currentState?.basic, border: e.target.value },
            //   });
            //
            //   dispatch(
            //     setSettings({
            //       ...settings,
            //       reportSettings: {
            //         ...settings?.reportSettings,
            //         basic: {
            //           ...settings?.reportSettings?.basic,
            //           border: e.target.value,
            //         },
            //       },
            //     })
            //   );
            // }}
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
                // color={
                //   get(currentState, "basic.color") ||
                //   get(settings, "reportSettings.basic.color") ||
                //   "#CCC"
                // }
                // onChangeComplete={(color) => {
                //   setCurrentState({
                //     ...currentState,
                //     basic: { ...currentState?.basic, color },
                //   });
                //
                //   dispatch(
                //     setSettings({
                //       ...settings,
                //       reportSettings: {
                //         ...settings?.reportSettings,
                //         basic: {
                //           ...settings?.reportSettings?.basic,
                //           color,
                //         },
                //       },
                //     })
                //   );
                // }}
              />
            </div>
          )}

          <div
            onClick={() => setColorPickerOpen(!colorPickerOpen)}
            className="color-box"
            // style={{
            //   background:
            //     get(currentState, "basic.color.hex") ||
            //     get(settings, "reportSettings.basic.color.hex") ||
            //     "#CCC",
            // }}
          />
        </div>

        <FormControl style={{ margin: "0 20px 0 0" }}>
          <InputLabel htmlFor="size-label">Sizing</InputLabel>
          <Select
            name="Link"
            // value={
            //   get(currentState, "basic.border") ||
            //   get(settings, "reportSettings.basic.border")
            // }
            // onChange={(e) => {
            //   setCurrentState({
            //     ...currentState,
            //     basic: { ...currentState?.basic, border: e.target.value },
            //   });
            //
            //   dispatch(
            //     setSettings({
            //       ...settings,
            //       reportSettings: {
            //         ...settings?.reportSettings,
            //         basic: {
            //           ...settings?.reportSettings?.basic,
            //           border: e.target.value,
            //         },
            //       },
            //     })
            //   );
            // }}
            style={{
              width: "100px",
              maxWidth: "100px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            required
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
                    // value={
                    //   get(currentState, `${i}`) ||
                    //   get(settings, `reportSettings.position.${i}`)
                    // }
                    // onChange={(e) => {
                    //   setCurrentState({
                    //     ...currentState,
                    //     [i]: e.target.value >= 600 ? e.target.value : 600,
                    //   });
                    //
                    //   dispatch(
                    //     setSettings({
                    //       ...settings,
                    //       reportSettings: {
                    //         ...settings.reportSettings,
                    //         position: {
                    //           ...settings?.reportSettings?.position,
                    //           [i]:
                    //             e.target.value >= 600
                    //               ? parseInt(e.target.value)
                    //               : 600,
                    //         },
                    //       },
                    //     })
                    //   );
                    // }}
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
                    // value={
                    //   get(currentState, `${i}`) ||
                    //   get(settings, `reportSettings.position.${i}`)
                    // }
                    // onChange={(e) => {
                    //   setCurrentState({
                    //     ...currentState,
                    //     [i]: e.target.value >= 600 ? e.target.value : 600,
                    //   });
                    //
                    //   dispatch(
                    //     setSettings({
                    //       ...settings,
                    //       reportSettings: {
                    //         ...settings.reportSettings,
                    //         position: {
                    //           ...settings?.reportSettings?.position,
                    //           [i]:
                    //             e.target.value >= 600
                    //               ? parseInt(e.target.value)
                    //               : 600,
                    //         },
                    //       },
                    //     })
                    //   );
                    // }}
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
              // checked={state.checkedB}
              // onChange={handleChange}
              name="checkedB"
              color="primary"
            />
          }
          label="Visibility"
        />

        <TextField
          required
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
          required
          style={{
            width: "100%",
          }}
          label="Tooltip"
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
                      required
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
