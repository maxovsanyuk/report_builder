import React, { useEffect, useState } from "react";

import Button from "@material-ui/core/Button";
import styled from "styled-components";

// material-ui

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

import { useForm, ErrorMessage } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { getDataSetEntities } from "../../../../services/get-entities";
import {
  savedNewDataSetSettings,
  setNewDataSetState,
  setDataSets,
  setLoading,
  showAlert,
} from "../../../../redux/actions/app_action";

import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import NewEntities from "../NewEntities";

const NewDataSetComp = styled.div`
  width: calc(100% - 40px);
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px;
  background: aliceblue;

  .save-btn,
  .close-btn {
    padding: 5px 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 3px 3px -2px rgba(0, 0, 0, 0.2),
      0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12);
    margin: 0 0 0 15px;
    transition: 0.3s;
    &:hover {
      cursor: pointer;
      background: #ccc;
      transition: 0.3s;
    }
    &:focus {
      outline: none;
      background: #ccc;
    }
  }
`;

const NewDataSetList = ({ minNameLength, maxNameLength }) => {
  const [isOpen, setIsOpen] = useState(false);

  const state = useSelector((state) => state.app);
  const { dataSets, newDataSet, isShownAlert, isSavedNewDataSetData } = state;
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    errors,
    watch,
    control,
    onSubmit,
  } = useForm();

  let dataSetName = watch("dataSetName");
  let selectType = watch("selectType");

  // LOADING DATASETS OPT

  useEffect(() => {
    async function getDataSet() {
      dispatch(setLoading(true));
      try {
        const dataSetTypes = await getDataSetEntities();

        dispatch(
          setNewDataSetState({
            ...newDataSet,
            entities: get(newDataSet, "entities")
              ? [
                  {
                    id: new Date().getTime(),
                    dataSetTypes,
                  },
                ]
              : [...newDataSet?.entities],
          })
        );
        dispatch(setLoading(false));
      } catch (e) {
        console.warn(e);
      }
    }
    isOpen && getDataSet();
  }, [isOpen]);

  // SET DATASET NAME

  useEffect(() => {
    if (dataSetName) {
      dispatch(
        setNewDataSetState({
          ...newDataSet,
          dataSetName,
        })
      );
      dispatch(savedNewDataSetSettings(false));
    }
  }, [dataSetName]);

  if (!isOpen && isSavedNewDataSetData) {
    return (
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: "60px",
        }}
      >
        <Button
          onClick={() => {
            setIsOpen(true);
            dispatch(
              setNewDataSetState({
                id: new Date().getTime(),
                entities: [{ id: new Date().getTime() }],
              })
            );
          }}
          variant="contained"
          color="primary"
        >
          New dataset
        </Button>
      </div>
    );
  }

  return (
    <NewDataSetComp>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={
            errors?.dataSetName?.type ||
            errors?.dataSetName?.message ||
            errors?.dataSetName
          }
          register={register}
          required
          style={{
            width: "100%",
            margin: "0 0 15px 0",
          }}
          label="Name"
          name="dataSetName"
          value={dataSetName}
          inputRef={register({
            validate: (value) => {
              return isEmpty(dataSets.filter((d) => d.dataSetName === value));
            },
            maxLength: {
              value: maxNameLength,
              message: "Max 20 letters",
            },
            minLength: {
              value: minNameLength,
              message: "Min 4 letters",
            },
          })}
        />

        <div
          style={{
            margin: "0 0 10px 0",
            fontSize: "12px",
          }}
        >
          <ErrorMessage errors={errors} name="dataSetName" />

          {errors.dataSetName &&
            errors.dataSetName.type === "validate" &&
            "Data set name already exists!"}
        </div>

        {get(newDataSet, "entities") &&
          newDataSet?.entities?.map((e) => {
            return (
              <NewEntities
                register={register}
                control={control}
                key={e.id}
                entitie={e}
              />
            );
          })}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <input
            type="submit"
            className="save-btn"
            value="Save"
            onClick={() => {
              if (
                dataSetName &&
                dataSetName.length > minNameLength &&
                dataSetName.length < maxNameLength &&
                // !isExistedDataSetName &&
                selectType
                // !isFullNFilter
              ) {
                dispatch(savedNewDataSetSettings(true));
                dispatch(setDataSets([...dataSets, newDataSet]));
                isShownAlert && dispatch(showAlert(false));
                dispatch(setNewDataSetState({}));
                setIsOpen(false);
                dispatch(setNewDataSetState({}));
              }
            }}
          />
          <button
            className="close-btn"
            // onClick={() => {
            //     isShownAlert && dispatch(showAlert(false));
            //     dispatch(savedNewDataSetSettings(true));
            //     setIsOpen(false);
            //     dispatch(setNewDataSetState({}));
            // }}
          >
            Close
          </button>
        </div>
      </form>
    </NewDataSetComp>
  );
};

NewDataSetList.defaultProps = { minNameLength: 4, maxNameLength: 20 };

export default NewDataSetList;
