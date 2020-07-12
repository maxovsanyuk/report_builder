import React, { memo, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Dustbin } from "./Dustbin";
import { Widget } from "./Widget";
import { useDispatch, useSelector } from "react-redux";
import {
  showAlert,
  sideBarHandleOpen,
  setNewDataSetState,
  savedNewDataSetSettings,
} from "../../redux/actions/app_action";

import styled from "styled-components";

// MATERIAL UI
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import { Alert } from "@material-ui/lab";
import Button from "@material-ui/core/Button";

const WidgetsToolBar = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 165px;
  max-width: 165px;
  height: calc(100% - 60px);
  position: absolute;
  overflow-y: auto;
  background: #fff;
  left: 0;
  top: 60px;
`;

const toolBarCfg = [
  {
    title: "Basic items",
    widgetsList: [
      { name: "text" },
      { name: "image" },
      { name: "line" },
      { name: "rectangle" },
    ],
  },
  {
    title: "Comparison",
    widgetsList: [
      { name: "column" },
      { name: "bar" },
      { name: "stacked-column" },
      { name: "stacked-bar" },
      { name: "stacked-column-100" },
      { name: "stacked-bar-100" },
    ],
  },
  {
    title: "Data regions",
    widgetsList: [{ name: "table" }, { name: "list" }],
  },

  {
    title: "KPI",
    widgetsList: [
      { name: "data-bar" },
      { name: "sparkline" },
      { name: "indicator" },
    ],
  },

  {
    title: "Deviation",
    widgetsList: [{ name: "radial-gauge" }, { name: "linear-gauge" }],
  },

  {
    title: "Proportion",
    widgetsList: [
      { name: "pie" },
      { name: "exploded-pie" },
      { name: "doughnut" },
      { name: "pyramid" },
      { name: "funnel" },
    ],
  },

  {
    title: "Distribution",
    widgetsList: [
      { name: "area" },
      { name: "smooth-area" },
      { name: "stacked-area" },
      { name: "stacked-area-100" },
      { name: "line-d" },
      { name: "smooth-line" },
      { name: "stepped-line" },
      { name: "line-with-markers" },
      { name: "smoothLine-with-markers" },
      { name: "bubble" },
      { name: "polar" },
      { name: "scatter" },
      { name: "radar" },
    ],
  },
  {
    title: "SubReports",
    widgetsList: [{ name: "subReports" }],
  },

  {
    title: "Barcodes",
    widgetsList: [{ name: "1D-Barcode" }, { name: "QR-Barcode" }],
  },
];

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
    z-index: 200;
    background: #fff;
    transition: 0.3s;
    margin: 0 0 2px 0;
    &:hover {
      transition: 0.3s;
      background: silver;
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
    justify-content: center;
    position: relative;
    flex-wrap: wrap;
    background: #fff;
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

const ToolbarRow = ({ toolData, zIndex }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Row zIndex={zIndex} isOpen={isOpen}>
      <div className="title-box">
        <sapn className="title">{toolData?.title}</sapn>

        <div className="btns-box">
          {isOpen ? (
            <RemoveOutlinedIcon onClick={() => setIsOpen(false)} />
          ) : (
            <AddOutlinedIcon onClick={() => setIsOpen(true)} />
          )}
        </div>
      </div>

      <div className="widgets-box">
        {toolData?.widgetsList?.map((w, i) => {
          return <Widget key={w.name} name={w.name} />;
        })}
      </div>
    </Row>
  );
};

const Container = memo(function Container() {
  return (
    <>
      <Dustbin />

      <WidgetsToolBar>
        {/*<input type="search" />*/}

        {toolBarCfg.map((t, i) => {
          return <ToolbarRow key={t.title} toolData={t} zIndex={50 - i} />;
        })}
      </WidgetsToolBar>
    </>
  );
});

const WorkSpaceComp = styled.div`
  background: #eee;
  width: calc(100% - 120px);
  height: calc(100% - 60px);
  margin: 60px 0 0 0;
`;

const AlertCont = styled.div`
  position: fixed;
  top: 10px;
  z-index: 500;
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
        <DndProvider backend={HTML5Backend}>
          <Container />
        </DndProvider>
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
