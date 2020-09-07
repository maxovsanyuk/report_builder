import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setWidgetsList } from "../../../../../../../redux/actions/app_action";

// MATERIAL

import TextField from "@material-ui/core/TextField";

// LODASH

import get from "lodash/get";

const TextValueComp = ({
  choosenWidget,
  param,
  objParam,
  type,
  label,
  textAfter,
  style,
  defaultValue,
  multiline,
  rows,
  variant,
}) => {
  const state = useSelector((state) => state.app);
  const { widgetsList } = state;

  const dispatch = useDispatch();
  const choosenWg = widgetsList.find((w) => w?.id === choosenWidget?.id);

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
        multiline={multiline}
        defaultValue={defaultValue}
        rows={rows}
        variant={variant}
        value={get(
          choosenWg,
          `${objParam ? `${objParam}.${param}` : param}`,
          ""
        )}
        onChange={(e) => {
          dispatch(
            setWidgetsList(
              widgetsList.map((w) => {
                return w?.id === choosenWidget?.id
                  ? objParam
                    ? {
                        ...choosenWg,
                        [objParam]: {
                          ...choosenWg[objParam],
                          [param]: e.target.value,
                        },
                      }
                    : { ...choosenWg, [param]: e.target.value }
                  : w;
              })
            )
          );
        }}
      />
      <span style={{ margin: "0 0 10px 10px" }}>{textAfter}</span>
    </div>
  );
};

export default TextValueComp;
