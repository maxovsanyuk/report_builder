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
import isEmpty from "lodash/isEmpty";
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

const NewEntities = ({
  entitie,
  register,
  control,
  isFullEntitie,
  setIsFullEntitie,
}) => {
  const [entitiState, setEntitiState] = useState(entitie);
  const [logicalTypeName, setLogicalTypeName] = useState("");
  const [isModalOpen, setIsMadalOpen] = useState(false);

  const state = useSelector((state) => state.app);
  const { newDataSet } = state;
  const dispatch = useDispatch();

  const checkedFilters =
    get(entitiState, "filtersList") &&
    entitiState?.filtersList?.filter((f) => get(f, "checked"));

  useEffect(() => {
    setEntitiState({ ...entitie });

    async function getDataSetFieldsList() {
      dispatch(setLoading(true));
      dispatch(savedNewDataSetSettings(false));
      try {
        const dataSetFields = await getDataSetFields(
          entitiState?.selectedEntity?.logicalName
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
    get(entitiState, "filterChangedId") && entitiState.filterChangedId,
    get(entitiState, "filtersList") && entitiState.filtersList.length,
    get(entitiState, "dataSetFields.id"),
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
              name="selectedEntity"
              inputRef={register}
              control={control}
              value={entitiState?.selectedEntity?.label || ""}
              renderValue={() => {
                return (
                  <div
                    style={{
                      maxWidth: "100px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {entitiState?.selectedEntity?.label}
                  </div>
                );
              }}
              style={{
                minWidth: "100px",
              }}
              onChange={(e) => {
                setEntitiState({
                  ...entitiState,
                  selectedEntity: e.target.value,
                  filtersList: [],
                });

                setIsFullEntitie(true);
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
          {get(entitiState, "selectedEntity") && (
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
                  !isFullEntitie
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
                  setIsFullEntitie(false);
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
                    setIsFullEntitie(true);
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
                    checkedFilters: 0,
                    filtersList: [
                      ...entitiState?.filtersList?.filter((f) => !f.checked),
                      {
                        filterId: new Date().getTime(),
                        items: [...checkedFilters],
                        selectedlogicalOperator: "or",
                      },
                    ],
                  });
                setIsFullEntitie(true);
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
                    checkedFilters: 0,
                    filtersList: [
                      ...entitiState?.filtersList?.filter((f) => !f.checked),
                      {
                        filterId: new Date().getTime(),
                        items: [...checkedFilters],
                        selectedlogicalOperator: "and",
                      },
                    ],
                  });
                setIsFullEntitie(true);
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
                    isFullEntitie={isFullEntitie}
                    setIsFullEntitie={setIsFullEntitie}
                    register={register}
                    control={control}
                    key={get(f, "filterId")}
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
