import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setSettings } from "../../../../../../../redux/actions/app_action";

// LODASH

import get from "lodash/get";

// MATERIAL UI

import TextField from "@material-ui/core/TextField";

const TextValueReportComp = ({
  param,
  objParam,
  type,
  label,
  textAfter,
  style,
}) => {
  const state = useSelector((state) => state.app);
  const { settings } = state;

  const dispatch = useDispatch();

  return (
    <div
      style={{ display: "flex", alignItems: "flex-end", margin: "0 20px 0 0" }}
    >
      <TextField
        type={type}
        style={{
          width: "80px",
          margin: "10px 0",
          ...style,
        }}
        label={label}
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
      />
      <span style={{ margin: "0 0 10px 10px" }}>{textAfter}</span>
    </div>
  );
};

export default TextValueReportComp;
