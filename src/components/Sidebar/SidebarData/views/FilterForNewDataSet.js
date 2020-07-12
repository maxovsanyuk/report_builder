import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getDataSetFields } from "../../../../services/get-fields";
import FilterComponent from "./FilterComponent";

import {
  setLoading,
  setNewDataSetState,
} from "../../../../redux/actions/app_action";

import styled from "styled-components";

// material-ui

import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

// LODASH

// import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import FilterCombinedComponent from "./FilterCombinedComponent";
import Checkbox from "@material-ui/core/Checkbox";
import CombinedFilters from "./CombinedFilters";

const CombinedFilter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: auto;

  b {
    text-transform: uppercase;
    padding: 10px;
    border: 1px dashed #ccc;
    border-radius: 5px;
    background: lightblue;
    color: slategray;
  }

  .combined-filters-box {
    display: flex;
    flex: 1;
    flex-direction: column;
    margin: 0 10px 0 20px;
  }
`;

const FilterForNewDataSet = ({
  register,
  control,
  entitiState,
  setEntitiState,
  isFullEntitie,
  filterData,
  setIsFullEntitie,
}) => {
  const [filterState, setFilterState] = useState({ ...filterData });
  const dispatch = useDispatch();

  const state = useSelector((state) => state.app);
  const { newDataSet } = state;

  useEffect(() => {
    setEntitiState({
      ...entitiState,
      filterChangedId: new Date().getTime(),

      filtersList:
        get(entitiState, "filtersList") &&
        entitiState?.filtersList.map((f) => {
          return f?.filterId === filterState?.filterId ? { ...filterState } : f;
        }),
    });

    setIsFullEntitie(
      filterState.logicalType
        ? true
        : filterState?.filterFieldType &&
          get(filterState, "operatorType") &&
          filterState.operatorType.value &&
          filterState?.operatorValue
        ? true
        : false
    );
  }, [
    filterState.filterFieldType,
    filterState.operatorValue,
    filterState.checked,
    get(filterState, "operatorType") && filterState.operatorType.value,
  ]);

  useEffect(() => {
    async function getDataSet() {
      dispatch(setLoading(true));
      try {
        const dataSetFields = await getDataSetFields(
          get(filterState, "filterFieldType.value")
        );

        dispatch(
          setNewDataSetState({
            ...newDataSet,
            entities: [
              ...newDataSet?.entities?.map((e) => {
                return {
                  ...e,
                  filtersList: e?.filtersList?.filter(
                    (f) => f.filterId !== filterState?.filterId
                  ),
                };
              }),
              {
                id: new Date().getTime(),
                selectType: get(filterState, "filterFieldType"),
                dataSetTypes: {
                  ...filterState?.dataSetFields,
                  items: entitiState?.dataSetFields?.items?.filter(
                    (d) => d.type === "related"
                  ),
                },
                dataSetFields,
              },
            ],
          })
        );

        dispatch(setLoading(false));
      } catch (e) {
        console.warn(e);
      }
    }

    if (get(filterState, "filterFieldType.type") === "related") {
      setEntitiState({
        ...entitiState,
        filtersList: entitiState?.filtersList?.filter(
          (f) => f?.filterId !== filterState?.filterId
        ),
      });
      setIsFullEntitie(true);
      getDataSet();
    }
  }, [get(filterState, "filterFieldType.type") === "related"]);

  if (filterState.logicalType) {
    return (
      <CombinedFilter>
        {entitiState?.filtersList?.length > 1 && (
          <Checkbox
            checked={filterState.checked}
            disabled={
              !isFullEntitie ||
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

        <b>{filterState?.logicalType}</b>

        <div className="combined-filters-box">
          {filterState?.items?.map((i) => {
            if (i.logicalType) {
              return (
                <CombinedFilters
                  key={i.filterId}
                  entitiState={entitiState}
                  setFilterState={setFilterState}
                  filterState={i}
                  setIsFullEntitie={setIsFullEntitie}
                  setEntitiState={setEntitiState}
                  register={register}
                  control={control}
                  filterId={i.filterId}
                  filterData={filterData}
                  isFullEntitie={isFullEntitie}
                />
              );
            }

            return (
              <FilterCombinedComponent
                key={i.filterId}
                entitiState={entitiState}
                setFilterState={setFilterState}
                filterState={i}
                setEntitiState={setEntitiState}
                setIsFullEntitie={setIsFullEntitie}
                register={register}
                control={control}
                filterId={i.filterId}
                filterItems={filterState?.items}
                filterData={filterData}
              />
            );
          })}
        </div>

        <IconButton
          onClick={() => {
            setEntitiState({
              ...entitiState,

              filtersList: entitiState?.filtersList?.filter(
                (f) => f?.filterId !== filterState?.filterId
              ),
            });

            setIsFullEntitie(true);
          }}
          component="span"
        >
          <DeleteIcon />
        </IconButton>
      </CombinedFilter>
    );
  }

  return (
    <FilterComponent
      filterState={filterState}
      entitiState={entitiState}
      setFilterState={setFilterState}
      setEntitiState={setEntitiState}
      isFullEntitie={isFullEntitie}
      setIsFullEntitie={setIsFullEntitie}
      register={register}
      control={control}
    />
  );
};

export default FilterForNewDataSet;
