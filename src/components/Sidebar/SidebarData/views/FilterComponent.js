import React from "react";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import get from "lodash/get";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { getFieldTypes } from "../AdvancedFinder/fieldTypes";
import ListSubheader from "@material-ui/core/ListSubheader";
import isEmpty from "lodash/isEmpty";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { DefineInputType } from "./DefineInputType";

const FilterComponent = ({
  filterState,
  entitiState,
  setFilterState,
  setEntitiState,
  register,
  control,
}) => {
  return (
    <Paper
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "10px 0",
        padding: "5px 10px 15px 10px",
      }}
    >
      {entitiState?.filtersList?.length > 1 && (
        <Checkbox
          // defaultChecked
          checked={filterState.checked}
          disabled={
            !entitiState.isFullNewFilter ||
            (!filterState?.checked && entitiState?.checkedFilters > 1)
          }
          color="primary"
          inputProps={{ "aria-label": "secondary checkbox" }}
          onChange={(e) => {
            setFilterState({ ...filterState, checked: e.target.checked });
            setEntitiState({
              ...entitiState,

              checkedFilters:
                get(entitiState, "checkedFilters") ||
                entitiState.checkedFilters === 0
                  ? e.target.checked
                    ? entitiState?.checkedFilters + 1
                    : entitiState?.checkedFilters - 1
                  : 1,
            });
          }}
        />
      )}
      <FormControl>
        <InputLabel htmlFor="select-filter-label">Filter fields*</InputLabel>
        <Select
          style={{
            width: "120px",
          }}
          defaultValue={filterState?.filterFieldType?.label}
          value={filterState?.filterFieldType?.label}
          required
          name="filterFieldType"
          inputRef={register}
          control={control}
          onChange={(e) => {
            setFilterState({
              ...filterState,
              filterFieldType: e.target.value,
              operatorsField: getFieldTypes(e.target.value.valueType),
            });
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
          inputRef={register}
          control={control}
          style={{
            width: "100px",
          }}
          defaultValue={filterState?.filterFieldType?.label}
          value={filterState?.filterFieldType?.label}
          required
          onChange={(e) => {
            setFilterState({
              ...filterState,
              operatorType: e.target.value,
            });
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
        <DefineInputType
          type={get(filterState, "operatorsField.type")}
          filterState={filterState}
          setFilterState={setFilterState}
          control={control}
          register={register}
        />
      </FormControl>
      <IconButton
        onClick={() => {
          setEntitiState({
            ...entitiState,
            isFullNewFilter: true,
            checkedFilters:
              get(filterState, "checked") && filterState.checked
                ? entitiState.checkedFilters - 1
                : entitiState.checkedFilters,
            filtersList: entitiState?.filtersList?.filter(
              (f) => f?.filterId !== filterState?.filterId
            ),
          });
        }}
        component="span"
      >
        <DeleteIcon />
      </IconButton>
    </Paper>
  );
};

export default FilterComponent;
