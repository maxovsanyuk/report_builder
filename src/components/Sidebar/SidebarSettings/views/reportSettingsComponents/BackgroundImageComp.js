import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import get from "lodash/get";
import { setSettings } from "../../../../../redux/actions/app_action";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const BackgroundImageComp = () => {
  const [currentState, setCurrentState] = useState({});

  const state = useSelector((state) => state.app);
  const { settings } = state;
  const dispatch = useDispatch();

  return (
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
  );
};

export default BackgroundImageComp;
