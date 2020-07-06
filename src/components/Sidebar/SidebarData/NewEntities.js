import React, { useEffect, useState } from "react";

import {
  savedNewDataSetSettings,
  setLoading,
  setNewDataSetState,
} from "../../../redux/actions/app_action";

import { useDispatch, useSelector } from "react-redux";
import { getDataSetFields } from "../../../services/get-fields";

import styled from "styled-components";

// MATERIAL UI

import Paper from "@material-ui/core/Paper";
// import TextField from "@material-ui/core/TextField";
import isEmpty from "lodash/isEmpty";
import { useForm } from "react-hook-form";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import get from "lodash/get";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import FilterForNewDataSet from "./views/FilterForNewDataSet";
import ModalDataSetFields from "../modals/ModalDataSetFields";

const DataSetListComp = styled.div`
  .parameter {
    display: flex;
    justify-content: space-between;
    padding-left: 10px;
    border: 1px solid grey;
    border-radius: 5px;
    align-items: center;
    margin-bottom: 10px;

    p {
      margin: 0;
    }
  }
`;

const NewEntities = ({ entitie }) => {
  const [entitiState, setEntitiState] = useState({});
  const [logicalTypeName, setLogicalTypeName] = useState("");
  const [isModalOpen, setIsMadalOpen] = useState(false);

  const state = useSelector((state) => state.app);
  const { newDataSet } = state;
  const dispatch = useDispatch();

  const { register, control } = useForm();

  console.log(entitiState, "entitiState");
  console.log(newDataSet, "newDataSet");

  const checkedFilters =
    get(entitiState, "filtersList") &&
    entitiState?.filtersList?.filter((f) => f.checked);

  useEffect(() => {
    setEntitiState({ ...entitie });

    async function getDataSetFieldsList() {
      dispatch(setLoading(true));
      dispatch(savedNewDataSetSettings(false));
      try {
        const dataSetFields = await getDataSetFields(
          entitiState?.selectType?.logicalName
        );

        setEntitiState({ ...entitiState, dataSetFields });

        dispatch(
          setNewDataSetState({
            ...newDataSet,
            entities: newDataSet?.entities?.map((e) => {
              return e.id === entitiState?.id
                ? {
                    ...entitiState,
                    dataSetFields,
                    filtersList: [],
                    isFullNewFilter: true,
                    checkedFilters: 0,
                  }
                : e;
            }),
          })
        );

        dispatch(setLoading(false));
      } catch (e) {
        console.log(e);
      }
    }
    logicalTypeName && getDataSetFieldsList();
  }, [logicalTypeName]);

  useEffect(() => {
    dispatch(
      setNewDataSetState({
        ...newDataSet,
        entities: newDataSet?.entities?.map((e) => {
          return e.id === entitiState?.id ? { ...entitiState } : e;
        }),
      })
    );
  }, [
    entitiState.filterChangedId,
    entitiState.isFullNewFilter,
    get(entitiState, "filtersList") && entitiState.filtersList.length,
  ]);

  return (
    <DataSetListComp>
      <Paper
        style={{
          margin: "20px 0",
          padding: "15px",
        }}
        elevation={3}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <FormControl>
            <InputLabel htmlFor="select-label">Type*</InputLabel>

            <Select
              name="selectType"
              inputRef={register}
              control={control}
              value={entitiState?.selectType?.label || ""}
              renderValue={() => {
                return (
                  <div
                    style={{
                      maxWidth: "100px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {entitiState?.selectType?.label}
                  </div>
                );
              }}
              style={{
                minWidth: "100px",
              }}
              onChange={(e) => {
                setEntitiState({
                  ...entitiState,
                  selectType: e.target.value,
                  filtersList: [],
                });

                setLogicalTypeName(e.target.value.logicalName);
              }}
              required
              inputProps={{
                id: "select-label",
              }}
            >
              {!isEmpty(entitie?.dataSetTypes) &&
                entitie?.dataSetTypes.items.map((i) => {
                  return (
                    <MenuItem key={i.logicalName} value={i}>
                      {i.label}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
          {get(entitiState, "selectType") && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Button onClick={() => setIsMadalOpen(true)}>
                Choose fields (
                {(get(entitiState, "dataSetFields") &&
                  entitiState.dataSetFields?.items?.filter((i) => i.chosen)
                    .length) ||
                  0}
                )
              </Button>

              <IconButton
                disabled={
                  get(entitiState, "filtersList") &&
                  get(entitiState, "filtersList").length &&
                  !entitiState?.isFullNewFilter
                }
                onClick={() => {
                  setEntitiState({
                    ...entitiState,
                    filterChangedId: new Date().getTime(),
                    filtersList: get(entitiState, "filtersList")
                      ? [
                          ...entitiState?.filtersList,
                          { filterId: new Date().getTime() },
                        ]
                      : [{ filterId: new Date().getTime() }],
                  });
                }}
                color="primary"
                component="span"
                style={{
                  margin: "0 0 0 20px",
                }}
              >
                <AddIcon />
              </IconButton>
              {newDataSet?.entities?.length > 1 && (
                <IconButton
                  onClick={() => {
                    dispatch(
                      setNewDataSetState({
                        ...newDataSet,
                        entities: newDataSet?.entities.filter(
                          (e) => e?.id !== entitie?.id
                        ),
                      })
                    );
                  }}
                  component="span"
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </div>
          )}
        </div>

        {get(entitiState, "checkedFilters") &&
        entitiState?.checkedFilters > 1 ? (
          <div style={{ margin: "15px 0 5px 0" }}>
            <Button
              variant="contained"
              size="small"
              color="primary"
              style={{ margin: "0 10px 0 0" }}
              onClick={() => {
                checkedFilters.length &&
                  setEntitiState({
                    ...entitiState,
                    isFullNewFilter: true,
                    checkedFilters: 0,
                    filtersList: [
                      ...entitiState?.filtersList?.filter((f) => !f.checked),
                      {
                        filterId: new Date().getTime(),
                        items: [...checkedFilters],
                        logicalType: "or",
                      },
                    ],
                  });
              }}
            >
              Or
            </Button>

            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={() => {
                checkedFilters.length &&
                  setEntitiState({
                    ...entitiState,
                    isFullNewFilter: true,
                    checkedFilters: 0,
                    filtersList: [
                      ...entitiState?.filtersList?.filter((f) => !f.checked),
                      {
                        filterId: new Date().getTime(),
                        items: [...checkedFilters],
                        logicalType: "and",
                      },
                    ],
                  });
              }}
            >
              And
            </Button>
          </div>
        ) : null}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {get(entitiState, "filtersList") &&
          get(entitiState, "filtersList").length
            ? entitiState?.filtersList.map((f) => {
                return (
                  <FilterForNewDataSet
                    entitiState={entitiState}
                    setEntitiState={setEntitiState}
                    register={register}
                    control={control}
                    key={f.filterId}
                    filterData={f}
                  />
                );
              })
            : null}
        </div>
      </Paper>

      {isModalOpen && (
        <ModalDataSetFields
          entitiState={entitiState}
          setEntitiState={setEntitiState}
          setIsMadalOpen={setIsMadalOpen}
        />
      )}
    </DataSetListComp>
  );
};

NewEntities.defaultProps = {};

export default NewEntities;
