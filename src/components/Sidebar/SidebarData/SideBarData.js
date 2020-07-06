import React, { useState } from "react";
import { useSelector } from "react-redux";

import styled from "styled-components";

// MATERIAL

import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import NewDataSetList from "./NewDataSetList/NewDataSetList";
import { AnimatedComponent } from "../../views/AnimatedComponent";

import isEmpty from "lodash/isEmpty";

const DataSetListCont = styled.div`
  display: flex;
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
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const state = useSelector((state) => state.app);
  const { dataSets } = state;

  console.log(dataSets, "dataSets");

  return (
    <AnimatedComponent>
      <h2 style={{ textAlign: "center" }}>
        {!isEmpty(dataSets) ? "Data sets list" : "Create first DataSet"}
      </h2>
      <>
        <div style={{ maxHeight: "70vh", overflow: "auto" }}>
          {!isEmpty(dataSets) &&
            dataSets.map((d, i) => {
              return (
                <DataSetListCont key={i}>
                  <span>{d.dataSetName}</span>

                  <IconButton
                    style={{ position: "absolute", right: "5px", top: "5px" }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </DataSetListCont>
              );
            })}
        </div>
        <NewDataSetList />
      </>
    </AnimatedComponent>
  );
};

export default SideBarData;
