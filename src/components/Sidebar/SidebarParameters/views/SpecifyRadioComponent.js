import styled from "styled-components";
import React, { useEffect, useState } from "react";
import get from "lodash/get";
import { useForm } from "react-hook-form";
import { setNewParametersSetState } from "../../../../redux/actions/app_action";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const SpecifyComponent = styled.div`
  .btn-title {
    font-size: 12px;
    background: none;
    border: none;
    &:hover {
      cursor: pointer;
    }
    &:focus {
      outline: none;
    }
  }

  .parameters-box {
    width: 100%;
    height: 250px;
    margin: 10px 0 0 0;
    border: 1px solid #ccc;
    border-radius: 3px;
    overflow: auto;
  }

  .add-btn {
    border: none;
    background: none;
    color: red;
    transition: 0.3s;
    &:hover {
      cursor: pointer;
      color: blue;
      transition: 0.3s;
    }
    &:focus {
      outline: none;
    }
  }
`;

const SpecifyRadioComponent = ({ dispatch, newParametersSet, name }) => {
  const [parametersList, setParametersList] = useState(
    get(newParametersSet, `${name}.specify.items`)
      ? newParametersSet[name].specify.items
      : []
  );

  const [newList, setNewList] = useState({});
  const [isFullForm, setIsfullForm] = useState(true);

  const { register } = useForm();

  useEffect(() => {
    get(newList, "value") && get(newList, "label") && setIsfullForm(true);
    get(newList, "defaultValue") && setIsfullForm(true);

    isFullForm &&
      get(newList, "value") &&
      get(newList, "label") &&
      dispatch(
        setNewParametersSetState({
          ...newParametersSet,
          [name]: {
            ...newParametersSet[name],
            specify: {
              ...newParametersSet[name].specify,
              items: parametersList,
            },
          },
        })
      );

    isFullForm &&
      get(newList, "defaultValue") &&
      dispatch(
        setNewParametersSetState({
          ...newParametersSet,
          [name]: {
            ...newParametersSet[name],
            specify: {
              ...newParametersSet[name].specify,
              items: parametersList,
            },
          },
        })
      );
  }, [
    get(newList, "value"),
    get(newList, "label"),
    get(newList, "defaultValue"),
    isFullForm,
    parametersList.length,
  ]);

  return (
    <SpecifyComponent>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button className="btn-title">
          Add the available values for the parameters:
        </button>
        <button
          className="add-btn"
          disabled={parametersList && parametersList.length && !isFullForm}
          style={{
            opacity:
              parametersList && parametersList.length && !isFullForm ? ".3" : 1,
          }}
          onClick={() => {
            setParametersList([
              ...parametersList,
              { id: new Date().getTime(), value: "", label: "" },
            ]);
            setIsfullForm(false);
            setNewList({});
          }}
        >
          + ADD
        </button>
      </div>

      <div className="parameters-box">
        {parametersList.map(({ label, value, id }) => {
          return (
            <Paper
              key={id}
              style={{
                margin: "20px 20px 10px 20px",
              }}
            >
              <form
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {name === "defaultValue" && (
                  <TextField
                    required
                    register={register}
                    style={{
                      width: "200px",
                      margin: "5px 0 15px 15px",
                    }}
                    label="Default Value"
                    name="DefaultValue"
                    onChange={(e) => {
                      setNewList({
                        ...newList,
                        defaultValue: e.target.value,
                      });

                      setParametersList(
                        parametersList.map((p) => {
                          return p.id === id
                            ? { ...p, value: e.target.value }
                            : p;
                        })
                      );

                      dispatch(
                        setNewParametersSetState({
                          ...newParametersSet,
                          [name]: {
                            ...newParametersSet[name],
                            specify: {
                              ...newParametersSet[name].specify,
                              items: parametersList,
                            },
                          },
                        })
                      );
                    }}
                    value={value || get(newList, "value")}
                  />
                )}

                {name === "availableValue" && (
                  <>
                    <TextField
                      required
                      register={register}
                      style={{
                        width: "200px",
                        margin: "0 0 15px 15px",
                      }}
                      label="Value"
                      name="value"
                      onChange={(e) => {
                        setNewList({
                          ...newList,
                          value: e.target.value,
                        });
                        setParametersList(
                          parametersList.map((p) => {
                            return p.id === id
                              ? { ...p, value: e.target.value }
                              : p;
                          })
                        );

                        dispatch(
                          setNewParametersSetState({
                            ...newParametersSet,
                            [name]: {
                              ...newParametersSet[name],
                              specify: {
                                ...newParametersSet[name].specify,
                                items: parametersList,
                              },
                            },
                          })
                        );
                      }}
                      value={value || get(newList, "value")}
                    />

                    <TextField
                      required
                      register={register}
                      style={{
                        width: "200px",
                        margin: "0 0 15px 15px",
                      }}
                      label="Label"
                      name="label"
                      onChange={(e) => {
                        setNewList({
                          ...newList,
                          label: e.target.value,
                        });
                        setParametersList(
                          parametersList.map((p) => {
                            return p.id === id
                              ? { ...p, label: e.target.value }
                              : p;
                          })
                        );
                      }}
                      value={label || get(newList, "lable")}
                    />
                  </>
                )}

                <IconButton
                  component="span"
                  onClick={() => {
                    setParametersList(
                      parametersList.filter((l) => l.id !== id)
                    );
                    setIsfullForm(true);

                    dispatch(
                      setNewParametersSetState({
                        ...newParametersSet,
                        [name]: {
                          ...newParametersSet[name],
                          specify: {
                            ...newParametersSet[name].specify,
                            items: parametersList.filter((l) => l.id !== id),
                          },
                        },
                      })
                    );
                  }}
                  style={{
                    maxWidth: "28px",
                    marginRight: "10px",
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </form>
            </Paper>
          );
        })}
      </div>
    </SpecifyComponent>
  );
};

export default SpecifyRadioComponent;
