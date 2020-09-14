import React from "react";

// import styled from "styled-components";

import { setWidgetsList } from "../../../redux/actions/app_action";
import { useDispatch, useSelector } from "react-redux";

// LODASH

import get from "lodash/get";

const DefineWidgetAddComp = ({ widget }) => {
  const state = useSelector((state) => state.app);
  const { widgetsList } = state;

  const dispatch = useDispatch();

  switch (widget?.name) {
    case "text":
      return (
        <textarea
          value={get(widget, "text")}
          style={{
            minWidth: "80%",
            maxWidth: "80%",
            minHeight: "50%",
            maxHeight: "50%",
            margin: "30px 0 0 0",
            textDecoration: get(widget, "textDecoration", "none"),
            textAlign: get(widget, "textAlignment", "left"),
            color: get(widget, "textColor", "#000"),
            verticalAlign: get(widget, "verticalAlignment", "top"),
            fontFamily: get(widget, "fontName", ""),
            fontStyle: get(widget, "italic", ""),
            fontSize: `${get(widget, "fontSize", "14")}px`,
          }}
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
