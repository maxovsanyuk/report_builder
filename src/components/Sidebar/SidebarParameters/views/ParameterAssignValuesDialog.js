import React, { useState } from "react";
import { setNewParametersSetState } from "../../../../redux/actions/app_action";

import SpecifyRadioComponent from "./SpecifyRadioComponent";
import QueryValueRadioComponent from "./QueryValueRadioComponent";

// MATERIAL UI

import TabPanel from "@material-ui/lab/TabPanel";
import Radio from "@material-ui/core/Radio";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import TabContext from "@material-ui/lab/TabContext";
import AppBar from "@material-ui/core/AppBar";
import TabList from "@material-ui/lab/TabList";
import Tab from "@material-ui/core/Tab";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

// LODASH

import get from "lodash/get";

const TabPanelComponent = ({
  value,
  name,
  parametersState,
  setParametersState,
  dispatch,
  newParametersSet,
}) => {
  const [selectedValue, setSelectedValue] = useState(
    get(newParametersSet, `${name}.selected`) || "none"
  );

  const handleChange = (e) => {
    setSelectedValue(e.target.value);

    setParametersState({
      ...parametersState,
      [name]: e.target.value,
    });

    dispatch(
      setNewParametersSetState({
        ...newParametersSet,
        [name]: {
          ...newParametersSet[name],
          selected: e.target.value,
          [e.target.value]:
            e.target.value === "specify"
              ? {
                  items: get(
                    newParametersSet,
                    `${name}.${e.target.value}.items`
                  )
                    ? [...newParametersSet[name][e.target.value].items]
                    : [],
                  type: e.target.value,
                }
              : {
                  type: e.target.value,
                  ...get(newParametersSet, `${name}.${e.target.value}`),
                },
        },
      })
    );
  };

  return (
    <TabPanel style={{ width: "600px", height: "300px" }} value={value}>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {[
          { name: "None", type: "none" },
          { name: "Specify", type: "specify" },
          { name: "Query Value", type: "queryValue" },
        ].map(({ name, type }) => {
          return (
            <div
              key={name}
              style={{
                display: "flex",
                alignItems: "center",
                height: "fit-content",
                margin: "0 10px 0 0",
              }}
            >
              <Radio
                checked={selectedValue === type}
                onChange={handleChange}
                value={type}
                name="radio-button"
              />
              {name}
            </div>
          );
        })}
        <div style={{ width: "100%" }}>
          {selectedValue === "specify" && (
            <SpecifyRadioComponent
              dispatch={dispatch}
              newParametersSet={newParametersSet}
              name={name}
            />
          )}
          {selectedValue === "queryValue" && (
            <QueryValueRadioComponent
              dispatch={dispatch}
              newParametersSet={newParametersSet}
              name={name}
            />
          )}
        </div>
      </div>
    </TabPanel>
  );
};

const ParameterAssignValuesDialog = ({
  isOpenDialog,
  setIsOpenDialog,
  setParametersState,
  parametersState,
  newParametersSet,
  dispatch,
}) => {
  const [value, setValue] = useState(1);

  return (
    <Dialog
      maxWidth="xl"
      open={isOpenDialog}
      onClose={() => setIsOpenDialog(false)}
    >
      <DialogTitle>Parameter</DialogTitle>

      <TabContext value={value} style={{ width: "500px", height: "250px" }}>
        <AppBar
          position="static"
          style={{ background: "none", color: "#000", boxShadow: "none" }}
        >
          <TabList onChange={(e, newValue) => setValue(newValue)}>
            {[
              {
                label: "Available Value",
                value: 1,
              },
              {
                label: "Default Value",
                value: 2,
              },
            ].map(({ label, value }) => (
              <Tab key={label} value={value} label={label} />
            ))}
          </TabList>
        </AppBar>

        {[
          {
            name: "availableValue",
            value: 1,
          },
          {
            name: "defaultValue",
            value: 2,
          },
        ].map(({ name, label, value }) => (
          <TabPanelComponent
            key={name}
            name={name}
            label={label}
            value={value}
            dispatch={dispatch}
            parametersState={parametersState}
            setParametersState={setParametersState}
            newParametersSet={newParametersSet}
          />
        ))}
      </TabContext>

      <DialogActions>
        <Button onClick={() => setIsOpenDialog(false)} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ParameterAssignValuesDialog;
