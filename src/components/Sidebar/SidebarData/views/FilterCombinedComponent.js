import React, { useEffect, useState } from "react";

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
import { getFieldTypes } from "../halpers/getFieldTypes";
import { findChangedFilter } from "../halpers/findChangedFilter";

const FilterCombinedComponent = ({
  filterState,
  entitiState,
  setEntitiState,
  setIsFullEntitie,
  filterData,
  register,
  control,
  filterId,
}) => {
  const [combinedFiltertstate, setCombinedFiltertstate] = useState(filterState);

  useEffect(() => {
    combinedFiltertstate && !combinedFiltertstate?.operatorValue
      ? setIsFullEntitie(false)
      : setIsFullEntitie(true);
  }, [combinedFiltertstate && combinedFiltertstate.operatorValue]);

  console.log();

  return (
    <Paper
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "10px 0",
        padding: "5px 10px 15px 10px",
        minWidth: "400px",
      }}
    >
      <FormControl>
        <InputLabel htmlFor="select-filter-label">Filter fields*</InputLabel>
        <Select
          style={{
            width: "120px",
          }}
          value={combinedFiltertstate?.filterFieldType?.label}
          renderValue={() => {
            return (
              <div
                style={{
                  maxWidth: "80px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {get(combinedFiltertstate, "filterFieldType.label")}
              </div>
            );
          }}
          required
          name="filterFieldType"
          inputRef={register}
          control={control}
          onChange={(e) => {
            setCombinedFiltertstate({
              ...combinedFiltertstate,
              operatorValue: "",
              filterFieldType: e.target.value,
              operatorsField: getFieldTypes(get(e, "target.value.valueType")),
            });

            setEntitiState({
              ...entitiState,
              filterChangedId: new Date().getTime(),
              filtersList: entitiState?.filtersList.map((f) => {
                return f.filterId === filterData?.filterId
                  ? {
                      ...f,
                      items: f?.items?.map((i) => {
                        return i.filterId === filterId
                          ? {
                              ...i,
                              operatorValue: "",
                              filterFieldType: e.target.value,
                              operatorsField: getFieldTypes(
                                filterState?.filterFieldType?.valueType
                              ),
                            }
                          : i;
                      }),
                    }
                  : findChangedFilter(f, filterData?.filterId, filterId, {
                      operatorValue: "",
                      filterFieldType: e.target.value,
                      operatorsField: getFieldTypes(
                        filterState?.filterFieldType?.valueType
                      ),
                    });
              }),
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
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="select-filter-operators">Operators*</InputLabel>
        <Select
          value={combinedFiltertstate?.operatorType?.label}
          renderValue={() => {
            return (
              <div
                style={{
                  maxWidth: "80px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {combinedFiltertstate?.operatorType?.label}
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
            setEntitiState({
              ...entitiState,
              filterChangedId: new Date().getTime(),
              filtersList: entitiState?.filtersList.map((f) => {
                return f.filterId === filterData.filterId
                  ? {
                      ...f,
                      items: f?.items?.map((i) => {
                        return i.filterId === filterId
                          ? {
                              ...i,
                              operatorType: e.target.value,
                            }
                          : i;
                      }),
                    }
                  : findChangedFilter(f, filterData.filterId, filterId, {
                      operatorType: e.target.value,
                    });
              }),
            });

            setCombinedFiltertstate({
              ...combinedFiltertstate,
              operatorType: e.target.value,
            });
          }}
          inputProps={{
            id: "select-filter-operators",
            disabled: !get(combinedFiltertstate, "operatorsField"),
          }}
        >
          {get(combinedFiltertstate, "operatorsField.operatorsField") &&
          combinedFiltertstate?.operatorsField ? (
            combinedFiltertstate?.operatorsField?.operatorsField.map((o) => {
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
          type={combinedFiltertstate?.operatorsField?.type}
          filterState={combinedFiltertstate}
          setFilterState={setCombinedFiltertstate}
          setEntitiState={setEntitiState}
          entitiState={entitiState}
          filterData={filterData}
          filterId={filterId}
          control={control}
          register={register}
        />
      </FormControl>
    </Paper>
  );
};

export default FilterCombinedComponent;
