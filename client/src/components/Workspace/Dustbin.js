import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setChoosenSettingsType,
  setChoosenWidget,
  setSettings,
  sideBarHandleOpen,
} from "../../redux/actions/app_action";

import ResizibleImg from "../WidgetsToolBar/images/resizible.png";

import styled from "styled-components";

import Grid from "../../images/grid.png";

// DND

import { useDrop } from "react-dnd";
import ReactResizeDetector from "react-resize-detector";

// LODASH

import get from "lodash/get";

import DragableWgComponent from "./views/DragableWgComponent";

const DnDBox = styled.div`
  width: calc(100% - 60px);
  margin: 0 60px 0 0;
  height: calc(100vh - 60px);
  display: flex;
  flex-flow: nowrap column;
  overflow: auto;

  .react-draggable,
  .cursor {
    cursor: move;
  }
  .no-cursor {
    cursor: auto;
  }
  .cursor-y {
    cursor: ns-resize;
  }
  .cursor-x {
    cursor: ew-resize;
  }

  .box {
    min-height: 200px;
    min-width: 200px;
    float: left;
    z-index: 999;

    &:hover {
      cursor: default;
    }

    //&::-webkit-resizer {
    //}
  }

  .sidebar {
    border-radius: 2px;
    position: relative;
    z-index: 1000;
    resize: both;
    overflow: auto;
    box-sizing: border-box;
  }

  .wg-info {
    text-align: center;
    padding: 10px;
    background: #fff;
  }

  .close-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    position: absolute;
    top: -15px;
    right: -15px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid #ccc;
    background: #fff;
    transition: 0.3s;
    &:hover {
      cursor: pointer;
      transition: 0.3s;
      background: #4da6ff;
    }
    &:focus {
      outline: none;
    }
  }
  .remove-btn {
    margin: 5px 0 0 0;
    padding: 5px;
    border: none;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.8);
    background: #fff;
    transition: 0.3s;
    &:hover {
      transition: 0.3s;
      cursor: pointer;
      color: crimson;
    }
    &:focus {
      outline: none;
    }
  }

  .resizible-btn {
    position: absolute;
    height: 50px;
    width: 50px;
    background: #fff url(${ResizibleImg}) no-repeat center;
    background-size: 50%;
    border-radius: 50%;
    left: -10px;
    top: -10px;
    z-index: 100;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.8);
    transition: 0.3s;
    &:hover {
      transition: 0.3s;
      cursor: move;
      background: #4da6ff url(${ResizibleImg}) no-repeat center;
      background-size: 50%;
      transform: rotate(360deg);
    }
  }

  body,
  html {
    background: black;
  }
  .resizable {
    width: 100px;
    height: 100px;
    position: absolute;
    top: 100px;
    left: 100px;
  }

  .resizable .resizers {
    width: 100%;
    height: 100%;
    border: 3px dashed #4286f4;
    box-sizing: border-box;
  }

  .resizable .resizers .resizer {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: white;
    border: 3px solid #4286f4;
    position: absolute;
    z-index: 1000;
  }

  .resizable .resizers .resizer.top-right {
    right: -5px;
    top: -5px;
    cursor: nesw-resize;
  }
  .resizable .resizers .resizer.bottom-left {
    left: -5px;
    bottom: -5px;
    cursor: nesw-resize;
  }
  .resizable .resizers .resizer.bottom-right {
    right: -5px;
    bottom: -5px;
    cursor: nwse-resize;
  }
`;

export const Dustbin = () => {
  const [currentWidgetState, setCurrentWidgetState] = useState({
    isActive: false,
    name: null,
    draggable: true,
    isMenuOpen: false,
  });

  const state = useSelector((state) => state.app);
  const { widgetsList, settings } = state;
  const { reportSettings } = settings;

  useEffect(() => {
    async function a() {
      try {
        const d = await fetch(
          "https://reportbuilderaddon-api.dev.uds.systems/api/data-source/all-entities",
          {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            rejectUnauthorized: false,
            headers: {
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": true,
            },
          }
        );

        console.log(d, "AAAAA");
      } catch (err) {
        console.warn(err);
      }
    }

    a();
  }, []);

  const dispatch = useDispatch();

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "box",
    drop(item, monitor) {
      return { name: "Dustbin" };
    },

    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = canDrop && isOver;
  let background = `url(${Grid})`;
  if (isActive) {
    background = `lightskyblue url(${Grid})`;
  } else if (canDrop) {
    background = `lightgreen url(${Grid})`;
  }

  const [activeDrags, setActiveDrags] = useState(0);

  function onStart() {
    return currentWidgetState?.draggable;
  }

  function onStop() {
    setActiveDrags(activeDrags);
  }

  const dragHandlers = { onStart, onStop };

  return (
    <DnDBox reportSettings={reportSettings}>
      <div
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          dispatch(setChoosenWidget(null));
          dispatch(sideBarHandleOpen(true));
          dispatch(setChoosenSettingsType("report_settings"));
        }}
        style={{
          position: "relative",
          width: "fit-content",
          margin: "10px",
          background: `rgba(${reportSettings?.basic?.backgroundColor?.rgb.r}, ${reportSettings?.basic?.backgroundColor?.rgb.g},${reportSettings?.basic?.backgroundColor?.rgb.b}, 0.6)`,
        }}
      >
        <ReactResizeDetector
          handleWidth
          handleHeight
          onResize={(width, height) => {
            dispatch(
              setSettings({
                ...settings,
                reportSettings: {
                  ...settings.reportSettings,
                  position: {
                    ...settings?.reportSettings?.position,
                    width: width + 4,
                    height: height + 4,
                  },
                },
              })
            );
          }}
        >
          {({ width, height }) => {
            return (
              <div
                className="sidebar"
                ref={drop}
                style={{
                  background,
                  position: "relative",
                  overflow: "auto",
                  textAlign: "center",
                  width: `${reportSettings.position.width}px`,
                  height: `${reportSettings.position.height}px`,
                  minHeight: `${reportSettings.position.minHeight}px`,
                  minWidth: `${reportSettings.position.minWidth}px`,
                  border:
                    reportSettings?.basic?.border === "None"
                      ? "2px solid transparent"
                      : `2px ${reportSettings?.basic?.border || "solid"} ${
                          reportSettings?.basic?.color?.hex || "#ccc"
                        }`,
                }}
              >
                <div style={{ margin: "5px 0 0 0" }}>
                  W:{" "}
                  {get(
                    settings,
                    "reportSettings.position.width",
                    get(reportSettings, "basic.border") === "None"
                      ? width
                      : width + 4
                  )}{" "}
                  x H:{" "}
                  {get(
                    settings,
                    "reportSettings.position.height",
                    get(reportSettings, "basic.border") === "None"
                      ? height
                      : height + 4
                  )}
                </div>

                {widgetsList.map((w) => {
                  return (
                    <DragableWgComponent
                      key={w.id}
                      widget={w}
                      dragHandlers={dragHandlers}
                      setCurrentWidgetState={setCurrentWidgetState}
                      currentWidgetState={currentWidgetState}
                    />
                  );
                })}
              </div>
            );
          }}
        </ReactResizeDetector>
      </div>
    </DnDBox>
  );
};
