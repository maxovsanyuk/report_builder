import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWidgetsList } from "../../redux/actions/app_action";

import ImgMenu from "../../components/WidgetsToolBar/images/menu-icon.png";
import ResizibleImg from "../../components/WidgetsToolBar/images/resizible.png";

import styled from "styled-components";

// DND

import { useDrop } from "react-dnd";
import ResizePanel from "react-resize-panel";
import Draggable from "react-draggable";

// LODASH

import get from "lodash/get";
import { makeResizableDiv } from "./helpers/makeResizibleDiv";

const DnDBox = styled.div`
  width: 95%;
  margin: 0 60px 0 0;
  height: calc(100vh - 60px);
  display: flex;
  flex-flow: nowrap column;
  overflow: hidden;

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

  .handle-style {
    display: none;
  }

  .footer {
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: stretch;
    text-align: center;
    justify-content: flex-start;
    overflow: hidden;
  }

  .body {
    flex-grow: 2;
    min-height: 500px;
    display: flex;
    flex-flow: row nowrap;
    overflow-x: auto;
    overflow-y: hidden;
  }

  .sidebar {
    background: #fff;
    min-width: 800px;
    min-height: 500px;
    width: 100%;
    box-sizing: border-box;
    text-align: center;
    flex-grow: 1;
    border: 1px solid #ccc;
    border-radius: 2px;
    //resize: both;
    //overflow: auto;
  }

  .withMargin {
    margin: 10px;
    box-sizing: border-box;
  }

  .content {
    flex-grow: 2;
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
    background: white;
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

const WgMainBox = styled.div`
  min-height: 100%;
  min-width: 100%;
  background: #fff;

  .wg-menu {
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 40px;
    border-bottom-left-radius: 20%;
    z-index: 20;
    background: #ccc url(${ImgMenu}) no-repeat center;
    background-size: 60%;
    transition: 0.3s;

    &:hover {
      transition: 0.3s;
      cursor: pointer;
      background: #4da6ff url(${ImgMenu}) no-repeat center;
      background-size: 60%;
    }
  }
`;

const WgMenu = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  min-height: 140px;
  padding: 10px;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.8);
  background: #fff;
  position: absolute;
  z-index: 100;
  top: 20px;
  right: -80px;

  .input {
    margin: 0 0 10px 0;
  }
`;

const WidgetMenu = ({
  widget,
  setIsWgMwnuOpen,
  setCurrentWidgetState,
  currentWidgetState,
}) => {
  const state = useSelector((state) => state.app);
  const { widgetsList } = state;
  const dispatch = useDispatch();

  return (
    <WgMenu
      onMouseDown={(e) => {
        e.stopPropagation();
        setCurrentWidgetState({
          ...currentWidgetState,
          draggable: false,
        });
      }}
      className="wg-menu-bar"
      onMouseOver={(e) => e.stopPropagation()}
    >
      <div
        onMouseDown={(e) => {
          e.stopPropagation();
          setCurrentWidgetState({
            ...currentWidgetState,
            draggable: false,
          });
        }}
        className="close-btn"
        onClick={() => {
          setIsWgMwnuOpen(false);
          setCurrentWidgetState({
            ...currentWidgetState,
            isMenuOpen: false,
          });
        }}
      >
        X
      </div>
      {widget.name} {get(widget, "clone") && "(Clone)"}
      <button
        className="remove-btn"
        onClick={() => {
          dispatch(
            setWidgetsList(widgetsList.filter((w) => w?.id !== widget?.id))
          );
        }}
      >
        Remove {widget.name}
      </button>
      <button
        className="remove-btn"
        onClick={() => {
          setIsWgMwnuOpen(false);
          setCurrentWidgetState({
            ...currentWidgetState,
            isMenuOpen: false,
          });

          dispatch(
            setWidgetsList([
              ...widgetsList,
              {
                id: new Date().getTime(),
                name: widget.name,
                top: 20,
                left: 20,
                clone: true,
                draggable: false,
              },
            ])
          );
        }}
      >
        Clone
      </button>
    </WgMenu>
  );
};

const WgBox = ({ widget, currentWidgetState, setCurrentWidgetState }) => {
  const [isWgMenuOpen, setIsWgMwnuOpen] = useState(false);

  let currentWidget = document.getElementById(`${widget?.id}`);

  const state = useSelector((state) => state.app);
  const { widgetsList } = state;
  const dispatch = useDispatch();

  makeResizableDiv(`.${widget.name}_${widget.id}_resizable`);

  return (
    <>
      <WgMainBox
        className="resizers"
        id={widget?.id}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `#fff url(${require(`../WidgetsToolBar/images/${widget.name}.png`)}) no-repeat center`,
        }}
        onMouseOver={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setCurrentWidgetState({
            ...currentWidgetState,
            isActive: true,
            name: widget.name,
            draggable: false,
            id: widget.id,
          });

          dispatch(
            setWidgetsList(
              widgetsList.map((w) => {
                return w.id === widget.id
                  ? {
                      ...w,
                      height: currentWidget ? currentWidget.offsetHeight : 200,
                      width: currentWidget ? currentWidget.offsetWidth : 200,
                    }
                  : w;
              })
            )
          );
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          e.preventDefault();
          dispatch(
            setWidgetsList(
              widgetsList.map((w) => {
                return w.id === widget.id
                  ? {
                      ...w,
                      height: currentWidget ? currentWidget.offsetHeight : 200,
                      width: currentWidget ? currentWidget.offsetWidth : 200,
                    }
                  : w;
              })
            )
          );
          setCurrentWidgetState({
            ...currentWidgetState,
            isActive: false,
            name: null,
            draggable: true,
            id: null,
          });
        }}
      >
        {currentWidgetState?.isActive && currentWidgetState?.id === widget.id && (
          <div
            className="wg-menu"
            onClick={(e) => {
              e.stopPropagation();
              setIsWgMwnuOpen(!isWgMenuOpen);

              setCurrentWidgetState({
                ...currentWidgetState,
                draggable: false,
                isMenuOpen: !isWgMenuOpen,
              });
            }}
          />
        )}
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            position: "absolute",
            bottom: "5px",
            fontSize: "14px",
          }}
        >
          <span style={{ margin: "0 10px 0 0" }}>
            H: {currentWidget ? currentWidget.offsetHeight : widget?.height}px
          </span>
          <span>
            W: {currentWidget ? currentWidget.offsetWidth : widget?.width}px
          </span>
        </div>
        <div
          className="resizer top-right"
          onMouseMove={(e) => {
            e.stopPropagation();
            setCurrentWidgetState({
              ...currentWidgetState,
              draggable: false,
            });
          }}
          onMouseOver={(e) => e.stopPropagation()}
        />
        <div className="resizer bottom-left" />
        <div className="resizer bottom-right" />
      </WgMainBox>
      {isWgMenuOpen && (
        <WidgetMenu
          widget={widget}
          setIsWgMwnuOpen={setIsWgMwnuOpen}
          setCurrentWidgetState={setCurrentWidgetState}
          currentWidgetState={currentWidgetState}
        />
      )}
    </>
  );
};

export const Dustbin = () => {
  const [currentWidgetState, setCurrentWidgetState] = useState({
    isActive: false,
    name: null,
    draggable: true,
    isMenuOpen: false,
  });

  const state = useSelector((state) => state.app);
  const { widgetsList } = state;

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
  let backgroundColor = "#fff";
  if (isActive) {
    backgroundColor = "lightskyblue";
  } else if (canDrop) {
    backgroundColor = "lightgreen";
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
    <DnDBox>
      <div className="body">
        <ResizePanel
          direction="e"
          handleClass="handle-style"
          style={{ flexGrow: "1" }}
        >
          <div
            className="sidebar withMargin"
            ref={drop}
            style={{
              backgroundColor,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="smallGrid"
                  width="6"
                  height="6"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 8 0 L 0 0 0 8"
                    fill="none"
                    stroke="gray"
                    stroke-width="0.5"
                  />
                </pattern>
                <pattern
                  id="grid"
                  width="60"
                  height="60"
                  patternUnits="userSpaceOnUse"
                >
                  <rect width="60" height="60" fill="url(#smallGrid)" />
                  <path
                    d="M 60 0 L 0 0 0 60"
                    fill="none"
                    stroke="gray"
                    stroke-width="1"
                  />
                </pattern>
              </defs>

              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {widgetsList.map((w) => {
              return (
                <Draggable key={w.id} bounds="parent" {...dragHandlers}>
                  <div
                    onMouseOver={() => {
                      setCurrentWidgetState({
                        ...currentWidgetState,
                        draggable: false,
                        isActive: true,
                        id: w.id,
                      });
                    }}
                    className={`box resizable ${w.name}_${w.id}_resizable`}
                    style={{
                      position: "absolute",
                      left: `${w?.left}px`,
                      top: `${w?.top}px`,
                    }}
                  >
                    <div
                      onMouseOver={(e) => {
                        e.stopPropagation();
                        setCurrentWidgetState({
                          ...currentWidgetState,
                          draggable: true,
                        });
                      }}
                      className="resizible-btn"
                    />

                    <WgBox
                      widget={w}
                      setCurrentWidgetState={setCurrentWidgetState}
                      currentWidgetState={currentWidgetState}
                    />
                  </div>
                </Draggable>
              );
            })}
          </div>
        </ResizePanel>

        <div className="content" />
      </div>

      <ResizePanel
        handleClass="handle-style"
        direction="n"
        style={{ height: "100px" }}
      >
        <div className="footer" />
      </ResizePanel>
    </DnDBox>
  );
};
