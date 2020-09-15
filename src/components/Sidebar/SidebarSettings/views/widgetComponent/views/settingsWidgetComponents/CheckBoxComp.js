import React from "react";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import get from "lodash/get";
import { setWidgetsList } from "../../../../../../../redux/actions/app_action";
import { useDispatch, useSelector } from "react-redux";

const CheckBoxComp = ({ param, choosenWidget, label, objParam }) => {
  const state = useSelector((state) => state.app);
  const { widgetsList } = state;

  const dispatch = useDispatch();
  const choosenWg = widgetsList.find((w) => w?.id === choosenWidget?.id);

  return (
    <FormControlLabel
      control={
        <Checkbox
          style={{ margin: "10px 0" }}
          defaultChecked
          checked={get(
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
                            [param]: e.target.checked,
                          },
                        }
                      : { ...choosenWg, [param]: e.target.checked }
                    : w;
                })
              )
            );
          }}
          color="primary"
        />
      }
      label={label}
    />
  );
};

export default CheckBoxComp;
