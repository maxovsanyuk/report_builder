import React from "react";
import { setWidgetsList } from "../../../../../../../redux/actions/app_action";
import { useDispatch, useSelector } from "react-redux";

// MATERIAL

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// LODASH

import get from "lodash/get";

const SelectValueComp = ({
  choosenWidget,
  param,
  objParam,
  arrOfValues,
  selectedValue,
  resetObjBefore,
  label,
  style,
}) => {
  const state = useSelector((state) => state.app);
  const { widgetsList } = state;

  const dispatch = useDispatch();
  const choosenWg = widgetsList.find((w) => w?.id === choosenWidget?.id);

  return (
    <FormControl style={{ margin: "5px 20px 0 0" }}>
      <InputLabel htmlFor={label}>{label}</InputLabel>
      <Select
        name={label}
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
                        [objParam]: resetObjBefore
                          ? { [param]: e.target.value }
                          : {
                              ...choosenWg[objParam],
                              [param]: e.target.value,
                            },
                      }
                    : resetObjBefore
                    ? { [param]: e.target.value }
                    : { ...choosenWg, [param]: e.target.value }
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
          ...style,
        }}
        inputProps={{
          id: label,
        }}
        // renderValue={() => {
        //   return (
        //     <div
        //       style={{
        //         maxWidth: "100px",
        //         overflow: "hidden",
        //         textOverflow: "ellipsis",
        //         ...style,
        //       }}
        //     >
        //       {get(choosenWg, `${param}`, selectedValue)}
        //     </div>
        //   );
        // }}
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
