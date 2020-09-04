import React from "react";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import get from "lodash/get";
import { setWidgetsList } from "../../../../../../../redux/actions/app_action";
import MenuItem from "@material-ui/core/MenuItem";
import { useDispatch, useSelector } from "react-redux";

const SelectValueComp = ({
  choosenWidget,
  param,
  arrOfValues,
  selectedValue,
  label,
}) => {
  const state = useSelector((state) => state.app);
  const { widgetsList } = state;

  const dispatch = useDispatch();
  const choosenWg = widgetsList.find((w) => w?.id === choosenWidget?.id);

  return (
    <FormControl style={{ margin: "0 20px 0 0" }}>
      <InputLabel htmlFor={label}>{label}</InputLabel>
      <Select
        name={label}
        value={get(choosenWg, `${param}`, "")}
        onChange={(e) => {
          dispatch(
            setWidgetsList(
              widgetsList.map((w) => {
                return w?.id === choosenWidget?.id
                  ? { ...choosenWg, [param]: e.target.value }
                  : w;
              })
            )
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
        renderValue={() => {
          return (
            <div
              style={{
                maxWidth: "100px",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {get(choosenWg, `${param}`, selectedValue)}
            </div>
          );
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

export default SelectValueComp;
