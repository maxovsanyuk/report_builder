import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDataSets } from "../../../redux/actions/app_action";
import NewDataSetList from "./NewDataSetList/NewDataSetList";
import { AnimatedComponent } from "../../views/AnimatedComponent";
import EntityRow from "./views/EntitiRow";

import styled from "styled-components";

// MATERIAL UI

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

// LODASH

import isEmpty from "lodash/isEmpty";

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

const SideBarData = () => {
  const [editDataSetId, setEditDataSetId] = useState(null);
  const state = useSelector((state) => state.app);
  const { dataSets, newDataSet } = state;

  console.log(JSON.stringify(dataSets, null, 2));
  console.log(JSON.stringify(newDataSet, null, 2));

  console.log(dataSets, "dataSets");

  const dispatch = useDispatch();

  return (
    <AnimatedComponent>
      <h2 style={{ textAlign: "center" }}>
        {!isEmpty(dataSets) ? "Data sets list" : "Create first DataSet"}
      </h2>

      <>
        <div style={{ maxHeight: "70vh", overflow: "auto" }}>
          {!isEmpty(dataSets) &&
            dataSets.map((d, i) => {
              if (editDataSetId === d.id) {
                return (
                  <NewDataSetList
                    key={d.id}
                    editedDataSet={d}
                    isHiddenControlBtn
                    setEditDataSetId={setEditDataSetId}
                  />
                );
              }

              return (
                !editDataSetId && (
                  <DataSetListCont key={d.id}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span style={{ margin: "0 0 5px 0", fontWeight: 600 }}>
                        {d.dataSetName}
                      </span>

                      {d?.entities?.map((e) => {
                        return <EntityRow key={e.id} entiti={e} />;
                      })}
                    </div>
                    <div>
                      <IconButton
                        component="span"
                        onClick={() => {
                          setEditDataSetId(d.id);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          dispatch(
                            setDataSets(
                              dataSets?.filter((dataSet) => dataSet.id !== d.id)
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
        {!editDataSetId && <NewDataSetList />}
      </>
    </AnimatedComponent>
  );
};

export default SideBarData;
