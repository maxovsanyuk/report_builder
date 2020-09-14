import React, { useState } from "react";
import { setWidgetsList } from "../../../../../../../redux/actions/app_action";

import { SketchPicker } from "react-color";

// LODASH

import get from "lodash/get";
import { useDispatch, useSelector } from "react-redux";

const ChooseColorComp = ({ choosenWidget, param, objParam }) => {
  const [colorPickerOpen, setColorPickerOpen] = useState(false);

  const state = useSelector((state) => state.app);
  const { widgetsList } = state;

  const dispatch = useDispatch();
  const choosenWg = widgetsList.find((w) => w?.id === choosenWidget?.id);

  return (
    <>
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
            color={get(
              choosenWg,
              `${objParam ? `${objParam}.${param}` : param}`,
              ""
            )}
            value={get(
              choosenWg,
              `${objParam ? `${objParam}.${param}` : param}`,
              ""
            )}
            onChangeComplete={(color) => {
              dispatch(
                setWidgetsList(
                  widgetsList.map((w) => {
                    return w?.id === choosenWidget?.id
                      ? objParam
                        ? {
                            ...choosenWg,
                            [objParam]: {
                              ...choosenWg[objParam],
                              [param]: color?.hex,
                            },
                          }
                        : { ...choosenWg, [param]: color?.hex }
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
          background: get(choosenWg, `${param}`, "#fff"),
        }}
      />
    </>
  );
};

export default ChooseColorComp;
