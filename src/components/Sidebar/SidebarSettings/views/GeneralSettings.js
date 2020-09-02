import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSettings } from "../../../../redux/actions/app_action";

import styled from "styled-components";

// MATERIAL

import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

// LODASH

import get from "lodash/get";

const SettingsBox = styled.div`
  width: calc(100% - 20px);
  margin: 10px 0 0 0;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 10px;
`;

const GeneralSettings = () => {
  const [currentState, setCurrentState] = useState({});

  const state = useSelector((state) => state.app);
  const { settings } = state;
  const dispatch = useDispatch();

  return (
    <SettingsBox>
      <Paper>
        <TextField
          required
          style={{
            width: "calc(100% - 30px)",
            margin: "15px 0 15px 15px",
          }}
          label="Name"
          name="GeneralSettingsName"
          value={
            get(currentState, "name") || get(settings, "generalSettings.name")
          }
          onChange={(e) => {
            setCurrentState({ ...currentState, name: e.target.value });

            dispatch(
              setSettings({
                ...settings,
                generalSettings: {
                  ...settings?.generalSettings,
                  name: e.target.value,
                },
              })
            );
          }}
        />

        <TextField
          style={{
            width: "calc(100% - 30px)",
            margin: "15px 0 15px 15px",
          }}
          label="Description"
          multiline
          rows={4}
          onChange={(e) => {
            setCurrentState({ ...currentState, description: e.target.value });

            dispatch(
              setSettings({
                ...settings,
                generalSettings: {
                  ...settings?.generalSettings,
                  description: e.target.value,
                },
              })
            );
          }}
          value={
            get(currentState, "description") ||
            get(settings, "generalSettings.description")
          }
          variant="outlined"
        />
      </Paper>
    </SettingsBox>
  );
};

export default GeneralSettings;
