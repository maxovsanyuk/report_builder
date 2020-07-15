import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setReportParameters } from "../../../redux/actions/app_action";
import { AnimatedComponent } from "../../views/AnimatedComponent";

import styled from "styled-components";

// MATERIAL UI

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

// LODASH

import isEmpty from "lodash/isEmpty";
import NewParameters from "./NewParameters";

const DataSetListCont = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  flex: 1;
  margin: 0 10px 20px 15px;
  font-size: 20px;
  padding: 10px;
  box-shadow: 0 3px 3px -2px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  transition: 0.3s;
  background: #fff;
  &:hover {
    cursor: pointer;
    box-shadow: 0 3px 3px -2px rgba(0, 0, 0, 0.2),
      0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12);
    transition: 0.3s;
  }
`;

const SideBarParameters = () => {
  const [editParametersSetId, setEditParametersSetId] = useState(null);
  const state = useSelector((state) => state.app);
  const { parameters } = state;

  const dispatch = useDispatch();

  return (
    <AnimatedComponent>
      <h2 style={{ textAlign: "center" }}>
        {parameters ? "Parameters List" : "New Parameters"}
      </h2>

      <>
        <div style={{ maxHeight: "70vh", overflow: "auto" }}>
          {!isEmpty(parameters) &&
            parameters.map((d, i) => {
              if (editParametersSetId === d.id) {
                return (
                  <NewParameters
                    key={d.id}
                    editedParametersSet={d}
                    isHiddenControlBtn
                    setEditParametersSetId={setEditParametersSetId}
                  />
                );
              }

              return (
                !editParametersSetId && (
                  <DataSetListCont key={d.id}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span style={{ margin: "0 0 5px 0", fontWeight: 600 }}>
                        {d.parametersSetName}
                      </span>
                    </div>
                    <div>
                      <IconButton
                        component="span"
                        onClick={() => {
                          setEditParametersSetId(d.id);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          dispatch(
                            setReportParameters(
                              parameters?.filter(
                                (dataSet) => dataSet.id !== d.id
                              )
                            )
                          );
                        }}
                        component="span"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </DataSetListCont>
                )
              );
            })}
        </div>
        {!editParametersSetId && <NewParameters />}
      </>
    </AnimatedComponent>
  );
};

export default SideBarParameters;
