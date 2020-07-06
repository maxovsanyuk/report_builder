import React, { useState } from "react";

import { DefineInputTypeForCombinedFilter } from "./DefineInputType";

// MATERIAL UI

import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import ListSubheader from "@material-ui/core/ListSubheader";

// LODASH

import isEmpty from "lodash/isEmpty";
import get from "lodash/get";

const FilterCombinedComponent = ({
  filterState,
  entitiState,
  setFilterState,
  setEntitiState,
  register,
  control,
}) => {
  const [state, setState] = useState(filterState);

  console.log(state, "filterState");

  return (
    <Paper
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "10px 0",
        padding: "5px 10px 15px 10px",
      }}
    >
      <FormControl>
        <InputLabel htmlFor="select-filter-label">Filter fields*</InputLabel>
        <Select
          style={{
            width: "120px",
          }}
          value={state.filterFieldType.label}
          renderValue={() => {
            return (
              <div
                style={{
                  maxWidth: "80px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {state.filterFieldType.label}
              </div>
            );
          }}
          required
          name="filterFieldType"
          inputRef={register}
          control={control}
          onChange={(e) => {
            setState({ ...state, filterFieldType: e.target.value });

            // setFilterState({
            //   ...filterState,
            //   filterFieldType: e.target.value,
            //   operatorsField: getFieldTypes(e.target.value.valueType),
            // });
          }}
          inputProps={{
            id: "select-filter-label",
          }}
        >
          <ListSubheader>Fields</ListSubheader>
          {!isEmpty(entitiState) &&
            entitiState?.dataSetFields?.items
              .filter((i) => i.type === "field")
              .map((f) => {
                return (
                  <MenuItem key={f.value} value={f}>
                    {f.label}
                  </MenuItem>
                );
              })}

          <ListSubheader>Related</ListSubheader>
          {!isEmpty(entitiState) &&
            entitiState?.dataSetFields?.items
              .filter((i) => i.type === "related")
              .map((f) => {
                return (
                  <MenuItem key={f.value} value={f}>
                    {f.label}
                  </MenuItem>
                );
              })}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="select-filter-operators">Operators*</InputLabel>
        <Select
          value={state.operatorType.label}
          renderValue={() => {
            return (
              <div
                style={{
                  maxWidth: "80px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {state.operatorType.label}
              </div>
            );
          }}
          name="operatorType"
          inputRef={register}
          control={control}
          style={{
            width: "100px",
          }}
          required
          onChange={(e) => {
            setState({ ...state, operatorType: e.target.value });
            // setFilterState({
            //   ...filterState,
            //   operatorType: e.target.value,
            // });
          }}
          inputProps={{
            id: "select-filter-operators",
            disabled: !get(filterState, "operatorsField"),
          }}
        >
          {get(filterState, "operatorsField.operatorsField") &&
          filterState?.operatorsField ? (
            filterState?.operatorsField?.operatorsField.map((o) => {
              return (
                <MenuItem key={o.value} value={o}>
                  {o.label}
                </MenuItem>
              );
            })
          ) : (
            <MenuItem value={null}>Empty</MenuItem>
          )}
        </Select>
      </FormControl>
      <FormControl>
        <DefineInputTypeForCombinedFilter
          type={get(filterState, "operatorsField.type")}
          filterState={filterState}
          setFilterState={setFilterState}
          control={control}
          register={register}
        />
      </FormControl>
    </Paper>
  );
};

export default FilterCombinedComponent;
