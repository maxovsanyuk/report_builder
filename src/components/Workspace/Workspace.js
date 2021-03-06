import React, { memo, useEffect, useState } from "react";

import styled from "styled-components";

import { Widget } from "./Widget";
import { Dustbin } from "./Dustbin";
import { useDispatch, useSelector } from "react-redux";
import {
  showAlert,
  sideBarHandleOpen,
  setNewDataSetState,
  savedNewDataSetSettings,
  savedNewParametersSetSettings,
} from "../../redux/actions/app_action";

import { widgetsConfig } from "./helpers/widgetsConfig";

// DND

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// MATERIAL UI

import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";

// LODASH

import get from "lodash/get";

const WidgetsToolBar = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 165px;
  max-width: 165px;
  height: 100%;
  position: absolute;
  overflow-x: hidden;
  overflow-y: auto;
  background: #fff;
  left: -166px;
  top: 0;
  z-index: 80;

  &::-webkit-scrollbar {
    display: none;
  }

  .input-wrapper {
    position: relative;
    background: dodgerblue;
    .input-icon {
      position: absolute;
      top: 50%;
      transform: translateY(-40%) scale(0.7);
      right: 5px;

      &:hover {
        cursor: pointer;
      }
    }

    .search-wg-input {
      width: 100%;
      padding: 10px 25px 10px 10px;
      border: none;
      border-bottom: 1px solid #ccc;

      &:focus {
        outline: 0 solid #ccc;
      }
    }
  }
`;

const WidgetInfoComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 10px;
  left: 10px;
  width: 150px;
  height: 100px;
  background: #fff;
  box-shadow: 0 3px 3px -2px rgba(0, 0, 0, 0.2);
  border: 1px solid silver;
  border-radius: 2px;
  color: #000;
  z-index: 1100;
  padding: 20px;
  transition: 0.5s;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: ${({ zIndex }) => zIndex};

  .title-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    z-index: 90;
    background: #fff;
    transition: 0.3s;
    margin: 0 0 2px 0;
    &:hover {
      transition: 0.3s;
      background: gainsboro;
      color: dodgerblue;
      cursor: pointer;
    }
  }

  .title {
    font-size: 12px;
    margin: 10px 0 10px 10px;
  }

  .btns-box {
    margin: 0 5px 0 0;
    &:hover {
      cursor: pointer;
    }
  }

  .widgets-box {
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    position: relative;
    flex-wrap: wrap;
    background: #fff;
    margin: 0 0 0 12px;
    animation: appearingComp 0.5s ease-in-out 0s 1 normal forwards;

    @keyframes appearingComp {
      0% {
        opacity: 0;
      }
      100% {
        margin-top: 0;
      }
    }
  }
`;

const WorkSpaceComp = styled.div`
  width: calc(100% - 120px);
  height: calc(100% - 60px);
  position: relative;
  z-index: 80;
  background: #eee;
  margin: 60px 0 0 0;
`;

const AlertCont = styled.div`
  position: fixed;
  top: 10px;
  z-index: 100;
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

const ToolbarRow = ({ toolBarData, zIndex, searchValue, setCurrentWgInfo }) => {
  const [isOpen, setIsOpen] = useState(false);

  const reg = new RegExp(searchValue, "gi");

  useEffect(() => {
    setIsOpen(!!searchValue);
  }, [searchValue]);

  return (
    <Row zIndex={zIndex} isOpen={isOpen}>
      <div className="title-box">
        <span className="title">{toolBarData?.title}</span>

        <div className="btns-box">
          {isOpen ? (
            <RemoveOutlinedIcon onClick={() => setIsOpen(false)} />
          ) : (
            <AddOutlinedIcon onClick={() => setIsOpen(true)} />
          )}
        </div>
      </div>

      <div className="widgets-box">
        {get(toolBarData, "widgetsList") &&
          toolBarData?.widgetsList
            .filter((u) => u.name.match(reg))
            .map((w, i) => {
              return (
                <Widget
                  key={w.name}
                  name={w.name}
                  wgConfig={w}
                  setCurrentWgInfo={setCurrentWgInfo}
                />
              );
            })}
      </div>
    </Row>
  );
};

const Container = memo(function Container() {
  const [searchValue, setSearchValue] = useState();
  const [currentWgInfo, setCurrentWgInfo] = useState();

  return (
    <>
      <Dustbin />

      <WidgetInfoComponent style={{ display: currentWgInfo ? "flex" : "none" }}>
        {currentWgInfo}
      </WidgetInfoComponent>

      <WidgetsToolBar>
        <div className="input-wrapper">
          <input
            type="search"
            id="search-input"
            placeholder="Search Widgets"
            className="search-wg-input"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <label htmlFor="search-input" className="input-icon">
            <SearchIcon />
          </label>
        </div>

        {widgetsConfig.map((t, i) => {
          return (
            <ToolbarRow
              key={t.title}
              toolBarData={t}
              zIndex={50 - i}
              searchValue={searchValue}
              setCurrentWgInfo={setCurrentWgInfo}
            />
          );
        })}
      </WidgetsToolBar>
    </>
  );
});

const Workspace = () => {
  const state = useSelector((state) => state.app);
  const {
    isOpenSideBar,
    isSavedNewDataSetData,
    isSavedNewParametersData,
    isShownAlert,
  } = state;
  const dispatch = useDispatch();

  return (
    <>
      <WorkSpaceComp
        onClick={() => {
          isOpenSideBar &&
            dispatch(
              isSavedNewDataSetData && isSavedNewParametersData
                ? sideBarHandleOpen(false)
                : dispatch(showAlert(true))
            );
        }}
      >
        <DndProvider backend={HTML5Backend}>
          <Container />
        </DndProvider>
      </WorkSpaceComp>

      {isShownAlert && (
        <AlertCont>
          <Alert severity="warning">
            {!isSavedNewParametersData && "Please save new parameters set"}
            {!isSavedNewDataSetData && "Please save new  data set"}
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
                dispatch(savedNewParametersSetSettings(true));
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
