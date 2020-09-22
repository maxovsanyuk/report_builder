import React, { useEffect, useState } from "react";
import { useForm, ErrorMessage } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {
  savedNewParametersSetSettings,
  setNewParametersSetState,
  setReportParameters,
  showAlert,
} from "../../../redux/actions/app_action";

import styled from "styled-components";
import moment from "moment";

// LODASH

import isEmpty from "lodash/isEmpty";
import get from "lodash/get";

// material-ui

import MomentUtils from "@date-io/moment";
import TextField from "@material-ui/core/TextField";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import ParameterAssignValuesDialog from "./views/ParameterAssignValuesDialog";

const dateType = [
  {
    value: "string",
    label: "String",
  },
  {
    value: "boolean",
    label: "Boolean",
  },
  {
    value: "dateTime",
    label: "DateTime",
  },
  {
    value: "integer",
    label: "Integer",
  },
  {
    value: "float",
    label: "Float",
  },
];

const NewParametersComp = styled.div`
  width: calc(100% - 40px);
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px;
  background: aliceblue;

  .bts-box {
    display: flex;
    justify-content: flex-end;
    position: absolute;
    bottom: 100px;
    right: 20px;

    .save-btn,
    .close-btn {
      padding: 10px 25px;
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
  }

  .assign-values {
    margin: 20px 0;
    text-decoration: underline;
    font-size: 14px;
    color: dodgerblue;
    &:hover {
      cursor: pointer;
    }
  }
`;

const NewParameters = ({
  minNameLength,
  maxNameLength,
  editedParametersSet,
  isHiddenControlBtn,
  setEditParametersSetId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [parametersState, setParametersState] = useState({
    ...editedParametersSet,
  });

  const [isHiddenEditControlBtn, setHiddenEditControlBtn] = useState(
    isHiddenControlBtn
  );

  const state = useSelector((state) => state.app);
  const {
    newParametersSet,
    parameters,
    isShownAlert,
    isSavedNewParametersData,
  } = state;
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    errors,
    watch,
    control,
    onSubmit,
  } = useForm();

  let parametersSetName = watch("parametersSetName");
  let parametersPromptName = watch("parametersPromptName");

  useEffect(() => {
    editedParametersSet &&
      dispatch(setNewParametersSetState(editedParametersSet));
  }, [
    editedParametersSet,
    get(editedParametersSet, "entities") && editedParametersSet.entities.length,
  ]);

  useEffect(() => {
    isOpen &&
      dispatch(
        setNewParametersSetState({
          ...newParametersSet,
          id: new Date().getTime(),
        })
      );
  }, [isOpen]);

  if (!isOpen && isSavedNewParametersData && !isHiddenEditControlBtn) {
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
              setNewParametersSetState({
                id: new Date().getTime(),
              })
            );
          }}
          variant="contained"
          color="primary"
        >
          New parameters
        </Button>
      </div>
    );
  }

  return (
    <NewParametersComp>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <TextField
          error={
            errors?.parametersSetName?.type ||
            errors?.parametersSetName?.message ||
            errors?.parametersSetName
          }
          register={register}
          required
          style={{
            width: "100%",
            margin: "0 0 15px 0",
          }}
          onChange={(e) => {
            dispatch(
              setNewParametersSetState({
                ...newParametersSet,
                parametersSetName: e.target.value,
              })
            );
            dispatch(savedNewParametersSetSettings(false));
          }}
          label="Name"
          name="parametersSetName"
          value={
            parametersSetName || get(editedParametersSet, "parametersSetName")
          }
          inputRef={register({
            validate: (value) => {
              return isEmpty(
                parameters.filter((d) => {
                  if (
                    d.parametersSetName ===
                    get(editedParametersSet, "parametersSetName")
                  ) {
                    return false;
                  }

                  return d.parametersSetName === value;
                })
              );
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
          <ErrorMessage errors={errors} name="parametersSetName" />

          {errors.parametersSetName &&
            errors.parametersSetName.type === "validate" &&
            "Parameters name already exists!"}
        </div>

        <TextField
          error={
            errors?.parametersPromptName?.type ||
            errors?.parametersPromptName?.message ||
            errors?.parametersPromptName
          }
          register={register}
          required
          style={{
            width: "100%",
            margin: "0 0 15px 0",
          }}
          onChange={(e) => {
            dispatch(savedNewParametersSetSettings(false));
            dispatch(
              setNewParametersSetState({
                ...newParametersSet,
                parametersPromptName: e.target.value,
              })
            );
          }}
          label="Prompt"
          name="parametersPromptName"
          value={
            parametersPromptName ||
            get(editedParametersSet, "parametersPromptName")
          }
          inputRef={register({
            validate: (value) => {
              return isEmpty(
                parameters.filter((d) => {
                  if (
                    d.parametersSetName ===
                    get(editedParametersSet, "parametersPromptName")
                  ) {
                    return false;
                  }

                  return d.parametersSetName === value;
                })
              );
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
          <ErrorMessage errors={errors} name="parametersPromptName" />

          {errors.parametersPromptName &&
            errors.parametersPromptName.type === "validate" &&
            "Prompt name already exists!"}
        </div>
        <div style={{ display: "flex", margin: "0 0 15px 0" }}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DateTimePicker
              name="parametersDate"
              format="DD MMM YYYY HH:mm"
              value={parametersState?.selectedDate || moment().utc().format()}
              reqared
              onChange={(date) => {
                dispatch(savedNewParametersSetSettings(false));

                setParametersState({
                  ...parametersState,
                  selectedDate: date?._d,
                });

                dispatch(
                  setNewParametersSetState({
                    ...newParametersSet,
                    date: date?._d,
                  })
                );
              }}
              style={{ marginRight: "40px" }}
              label="Date"
              showTodayButton
            />
          </MuiPickersUtilsProvider>
          <FormControl>
            <InputLabel htmlFor="select-filter-value">Date Type*</InputLabel>
            <Select
              inputRef={register}
              control={control}
              value={
                get(parametersState, "dateType") ||
                get(editedParametersSet, "dateType")
              }
              style={{
                width: "120px",
              }}
              required
              onChange={(e) => {
                dispatch(savedNewParametersSetSettings(false));
                setParametersState({
                  ...parametersState,
                  dateType: e.target.value,
                });
                dispatch(
                  setNewParametersSetState({
                    ...newParametersSet,
                    dateType: e.target.value,
                  })
                );
              }}
              inputProps={{
                id: "select-filter-value",
              }}
            >
              {dateType.map(({ value, label }) => {
                return (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>

        {[
          { name: "Allow blank value", type: "allowBlankValue" },
          { name: "Allow null value", type: "allowNullValue" },
          { name: "Allow multiple values", type: "allowMultipleValues" },
        ].map(({ name, type }) => {
          return (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                key={name}
                checked={get(parametersState, `${type}`)}
                onChange={(e) => {
                  dispatch(savedNewParametersSetSettings(false));

                  setParametersState({
                    ...parametersState,
                    [type]: e.target.checked,
                  });

                  dispatch(
                    setNewParametersSetState({
                      ...newParametersSet,
                      [type]: e.target.checked,
                    })
                  );
                }}
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
                style={{ margin: "0 10px 0 0" }}
              />
              {name}
            </div>
          );
        })}

        <FormControl>
          <InputLabel htmlFor="select-filter-value">Visibility*</InputLabel>
          <Select
            inputRef={register}
            control={control}
            value={
              get(parametersState, "visibility") ||
              get(editedParametersSet, "visibility")
            }
            style={{
              width: "120px",
            }}
            required
            onChange={(e) => {
              dispatch(savedNewParametersSetSettings(false));

              setParametersState({
                ...parametersState,
                visibility: e.target.value,
              });
              dispatch(
                setNewParametersSetState({
                  ...newParametersSet,
                  visibility: e.target.value,
                })
              );
            }}
            inputProps={{
              id: "select-filter-value",
            }}
          >
            {[
              { name: "Visible", type: "visible" },
              { name: "Hidden", type: "hidden" },
              { name: "Internal", type: "internal" },
            ].map(({ name, type }) => {
              return (
                <MenuItem key={name} value={type}>
                  {name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <div className="assign-values" onClick={() => setIsOpenDialog(true)}>
          Assign Values >>
        </div>

        <ParameterAssignValuesDialog
          isOpenDialog={isOpenDialog}
          setIsOpenDialog={setIsOpenDialog}
          setParametersState={setParametersState}
          parametersState={parametersState}
          newParametersSet={newParametersSet}
          dispatch={dispatch}
        />

        <div className="bts-box ">
          <input
            type="submit"
            className="save-btn"
            value="Save"
            onClick={() => {
              if (
                parametersSetName &&
                parametersSetName.length >= minNameLength &&
                parametersSetName.length <= maxNameLength &&
                parametersPromptName &&
                parametersPromptName.length >= minNameLength &&
                parametersPromptName.length <= maxNameLength &&
                get(parametersState, "dateType") &&
                get(parametersState, "visibility") &&
                isEmpty(
                  parameters.filter((d) => {
                    if (
                      d.parametersSetName ===
                      get(editedParametersSet, "parametersSetName")
                    ) {
                      return false;
                    }
                    return d.parametersSetName === parametersSetName;
                  })
                )
              ) {
                dispatch(savedNewParametersSetSettings(true));
                dispatch(
                  setReportParameters(
                    editedParametersSet
                      ? parameters.map((d) => {
                          return d?.id === editedParametersSet?.id
                            ? newParametersSet
                            : d;
                        })
                      : [
                          ...parameters,
                          {
                            ...newParametersSet,
                            date:
                              parametersState?.selectedDate ||
                              moment().utc().format(),
                          },
                        ]
                  )
                );
                editedParametersSet && setHiddenEditControlBtn(false);
                editedParametersSet && setEditParametersSetId(null);
                isShownAlert && dispatch(showAlert(false));
                dispatch(setNewParametersSetState({}));
                setIsOpen(false);
              }
            }}
          />
          <button
            className="close-btn"
            onClick={() => {
              isShownAlert && dispatch(showAlert(false));
              dispatch(savedNewParametersSetSettings(true));
              setIsOpen(false);
              dispatch(setNewParametersSetState({}));
              editedParametersSet && setEditParametersSetId(null);
            }}
          >
            Close
          </button>
        </div>
      </form>
    </NewParametersComp>
  );
};

NewParameters.defaultProps = {
  minNameLength: 4,
  maxNameLength: 20,
  hideNewBtn: false,
};

export default NewParameters;
