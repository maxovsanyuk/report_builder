import React, { useEffect, useState } from "react";
import get from "lodash/get";
import { useForm } from "react-hook-form";
import { setNewParametersSetState } from "../../../../redux/actions/app_action";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import { useSelector } from "react-redux";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import isEmpty from "lodash/isEmpty";
import MenuItem from "@material-ui/core/MenuItem";

const QueryValueComponent = styled.div`
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

const QueryValueRadioComponent = ({ dispatch, newParametersSet, name }) => {
  const [queryValue, setQueryValue] = useState(
    get(newParametersSet, `${name}.queryValue.value`)
  );

  const [dataSetName, setDataSetName] = useState(
    get(newParametersSet, `${name}.dataSetName`)
  );

  const state = useSelector((state) => state.app);
  const { dataSets } = state;

  const { register } = useForm();

  useEffect(() => {
    queryValue &&
      dispatch(
        setNewParametersSetState({
          ...newParametersSet,
          [name]: {
            ...newParametersSet[name],

            queryValue: {
              ...newParametersSet[name].queryValue,
              value: queryValue,
            },
          },
        })
      );
  }, [queryValue]);

  return (
    <QueryValueComponent>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="parameters-box">
          <Paper
            style={{
              margin: "20px 20px 10px 20px",
            }}
          >
            <form
              style={{
                display: "flex",
                width: "100%",
              }}
            >
              <TextField
                required
                register={register}
                style={{
                  margin: "10px 0 15px 15px",
                }}
                label="Query Value"
                name="DefaultValue"
                onChange={(e) => {
                  dispatch(
                    setNewParametersSetState({
                      ...newParametersSet,
                      [name]: {
                        ...newParametersSet[name],

                        queryValue: {
                          ...newParametersSet[name].queryValue,
                          value: e.target.value,
                        },
                      },
                    })
                  );
                  setQueryValue(e.target.value);
                }}
                value={queryValue}
              />
              {dataSets.length ? (
                <FormControl style={{ margin: "0 0 0 20px" }}>
                  <InputLabel htmlFor="select-label">Dataset</InputLabel>

                  <Select
                    name="Dataset"
                    inputRef={register}
                    value={dataSetName}
                    renderValue={() => {
                      return (
                        <div
                          style={{
                            maxWidth: "100px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {dataSetName}
                        </div>
                      );
                    }}
                    style={{
                      minWidth: "100px",
                    }}
                    onChange={(e) => {
                      dispatch(
                        setNewParametersSetState({
                          ...newParametersSet,
                          [name]: {
                            ...newParametersSet[name],
                            dataSetName: e.target.value,
                          },
                        })
                      );
                      setDataSetName(e.target.value);
                    }}
                    required
                    inputProps={{
                      id: "select-label",
                    }}
                  >
                    {dataSets.map((i) => {
                      return (
                        <MenuItem key={i.dataSetName} value={i.dataSetName}>
                          {i.dataSetName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              ) : null}
            </form>
          </Paper>
        </div>
      </div>
    </QueryValueComponent>
  );
};

export default QueryValueRadioComponent;
