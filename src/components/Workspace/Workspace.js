import React from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import {
  showAlert,
  sideBarHandleOpen,
  setNewDataSetState,
  savedNewDataSetSettings,
} from "../../redux/actions/app_action";

import { Alert } from "@material-ui/lab";
import Button from "@material-ui/core/Button";

const WorkSpaceComp = styled.div`
  background: #eee;
  width: 100%;
  height: calc(100% - 60px);
  margin: 60px 0 0 0;

  .canvas {
    background: #fff;
    height: 50%;
    width: 50%;
    margin: 15px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
`;

const AlertCont = styled.div`
  position: fixed;
  top: 10px;
  z-index: 20;
  animation: appearingBar 0.4s ease-in-out 0s 1 normal forwards;

  @keyframes appearingBar {
    0% {
      right: -100px;
    }
    100% {
      right: 70px;
    }
  }
`;

const Workspace = () => {
  const state = useSelector((state) => state.app);
  const { isOpenSideBar, isSavedNewDataSetData, isShownAlert } = state;
  const dispatch = useDispatch();

  return (
    <>
      <WorkSpaceComp
        onClick={() => {
          isOpenSideBar &&
            dispatch(
              isSavedNewDataSetData
                ? sideBarHandleOpen(false)
                : dispatch(showAlert(true))
            );
        }}
      >
        <div className="canvas" />
      </WorkSpaceComp>

      {isShownAlert && (
        <AlertCont>
          <Alert severity="warning">
            Please save new data set
            <Button
              variant="contained"
              size="small"
              color="secondary"
              style={{ margin: "0 0 0 10px" }}
              onClick={() => {
                dispatch(sideBarHandleOpen(false));
                dispatch(showAlert(false));
                dispatch(setNewDataSetState({}));
                dispatch(savedNewDataSetSettings(true));
              }}
            >
              remove
            </Button>
          </Alert>
        </AlertCont>
      )}
    </>
  );
};

export default Workspace;
