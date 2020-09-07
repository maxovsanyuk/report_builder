import React from "react";

// import styled from "styled-components";

import { setWidgetsList } from "../../../redux/actions/app_action";
import { useDispatch, useSelector } from "react-redux";

// MATERIAL

import TextField from "@material-ui/core/TextField";

// LODASH

import get from "lodash/get";

const DefineWidgetAddComp = ({ widget }) => {
  const state = useSelector((state) => state.app);
  const { widgetsList } = state;

  const dispatch = useDispatch();

  switch (widget?.name) {
    case "text":
      return (
        <TextField
          style={{ maxWidth: "80%", maxHeight: "80%", margin: "30px 0 0 0" }}
          label="Text"
          multiline
          rows={4}
          defaultValue="Default Text"
          variant="filled"
          value={get(widget, "text")}
          onChange={(e) => {
            dispatch(
              setWidgetsList(
                widgetsList.map((w) => {
                  return w?.id === widget?.id
                    ? { ...widget, text: e.target.value }
                    : w;
                })
              )
            );
          }}
        />
      );

    default:
      return null;
  }
};

export default DefineWidgetAddComp;
