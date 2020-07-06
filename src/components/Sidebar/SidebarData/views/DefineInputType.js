import TextField from "@material-ui/core/TextField";
import get from "lodash/get";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";

export const DefineInputType = ({
  type,
  filterState,
  setFilterState,
  register,
  control,
}) => {
  switch (type) {
    case "number":
      return (
        <TextField
          label="Number"
          type="number"
          disabled={!get(filterState, "operatorsField")}
          style={{
            width: "100px",
          }}
          inputRef={register}
          control={control}
          value={get(filterState, "operatorValue")}
          required
          onChange={(e) => {
            setFilterState({
              ...filterState,
              operatorValue: e.target.value >= 0 ? e.target.value : 0,
            });
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      );

    default:
      return (
        <>
          <InputLabel htmlFor="select-filter-value">Value*</InputLabel>
          <Select
            inputRef={register}
            control={control}
            disabled={!get(filterState, "operatorsField")}
            value={get(filterState, "operatorValue")}
            style={{
              width: "100px",
            }}
            required
            onChange={(e) => {
              setFilterState({
                ...filterState,
                operatorValue: e.target.value,
              });
            }}
            inputProps={{
              id: "select-filter-value",
            }}
          >
            {get(filterState, "operatorsField.valueField.options") ? (
              filterState?.operatorsField?.valueField?.options.map(
                ({ value, label }) => {
                  return (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  );
                }
              )
            ) : (
              <MenuItem value={null}>Empty</MenuItem>
            )}
          </Select>
        </>
      );
  }
};

export const DefineInputTypeForCombinedFilter = ({
  type,
  filterState,
  setFilterState,
  register,
  control,
}) => {
  switch (type) {
    case "number":
      return (
        <TextField
          label="Number"
          type="number"
          disabled={!get(filterState, "operatorsField")}
          style={{
            width: "100px",
          }}
          inputRef={register}
          control={control}
          value={get(filterState, "operatorValue")}
          required
          // onChange={(e) => {
          //   setFilterState({
          //     ...filterState,
          //     operatorValue: e.target.value >= 0 ? e.target.value : 0,
          //   });
          // }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      );

    default:
      return (
        <>
          <InputLabel htmlFor="select-filter-value">Value*</InputLabel>
          <Select
            inputRef={register}
            control={control}
            disabled={!get(filterState, "operatorsField")}
            value={get(filterState, "operatorValue")}
            style={{
              width: "100px",
            }}
            required
            // onChange={(e) => {
            //   setFilterState({
            //     ...filterState,
            //     operatorValue: e.target.value,
            //   });
            // }}
            inputProps={{
              id: "select-filter-value",
            }}
          >
            {get(filterState, "operatorsField.valueField.options") ? (
              filterState?.operatorsField?.valueField?.options.map(
                ({ value, label }) => {
                  return (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  );
                }
              )
            ) : (
              <MenuItem value={null}>Empty</MenuItem>
            )}
          </Select>
        </>
      );
  }
};
