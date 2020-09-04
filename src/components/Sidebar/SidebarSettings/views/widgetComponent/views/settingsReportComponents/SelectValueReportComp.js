import React from "react";

import { setSettings } from "../../../../../../../redux/actions/app_action";
import { useDispatch, useSelector } from "react-redux";

// MATERIAL

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// LODASH

import get from "lodash/get";

const SelectValueReportComp = ({ param, label, objParam, arrOfValues }) => {
  const state = useSelector((state) => state.app);
  const { settings } = state;

  const dispatch = useDispatch();

  return (
    <FormControl style={{ margin: "0 20px 0 0" }}>
      <InputLabel htmlFor={label}>{label}</InputLabel>
      <Select
        value={
          objParam
            ? get(settings, `reportSettings.${objParam}.${param}`)
            : get(settings, `reportSettings.${param}`)
        }
        onChange={(e) => {
          dispatch(
            setSettings({
              ...settings,
              reportSettings: objParam
                ? {
                    ...settings?.reportSettings,
                    [objParam]: {
                      ...settings?.reportSettings?.[objParam],
                      [param]: e.target.value,
                    },
                  }
                : {
                    ...settings?.reportSettings,
                    [param]: e.target.value,
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
        inputProps={{
          id: label,
        }}
      >
        {arrOfValues.map((i) => {
          return (
            <MenuItem key={i} value={i}>
              {i}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default SelectValueReportComp;
