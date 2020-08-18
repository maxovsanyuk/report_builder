import React, { useState } from "react";
import { useDrop } from "react-dnd";
import ResizePanel from "react-resize-panel";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import ImgMenu from "../../components/WidgetsToolBar/images/menu-icon.png";
import { setWidgetsList } from "../../redux/actions/app_action";

const DnDBox = styled.div`
  width: 95%;
  margin: 0 60px 0 0;
  height: calc(100vh - 60px);
  display: flex;
  flex-flow: nowrap column;
  overflow: hidden;

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

  .wg-menu-bar {
    display: flex;
    flex-direction: column;
    min-width: 200px;
    min-height: 140px;
    padding: 10px;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.8);
    background: #fff;
    position: absolute;
    top: 0;
    z-index: 100;
  }

  .close-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    position: absolute;
    top: -10px;
    right: -10px;
    width: 20px;
    height: 20px;
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
  }
`;

const WgMainBox = styled.div`
  min-height: 100px;
  min-width: 100px;
  max-width: 90%;
  max-height: 90%;
  background: #fff;
  resize: both;
  overflow: auto;
  outline: 2px dashed #999;

  //&::-webkit-resizer {
  //}

  .wg-menu {
    position: absolute;
    top: 0;
    right: 0;
    width: 30px;
    height: 30px;
    border-bottom-left-radius: 20%;
    z-index: 20;
    background: #ccc url(${ImgMenu}) no-repeat center;
    background-size: 70%;
    transition: 0.3s;

    &:hover {
      transition: 0.3s;
      cursor: pointer;
      background: #4da6ff url(${ImgMenu}) no-repeat center;
      background-size: 70%;
    }
  }
`;

const WgBox = ({ widget, widgetState, setWidgetState }) => {
  const [wgMenuState, setWgMenuState] = useState({
    isOpen: false,
    position: {},
  });

  const state = useSelector((state) => state.app);
  const { widgetsList } = state;

  const dispatch = useDispatch();

  return (
    <>
      <WgMainBox
        style={{
          position: "absolute",
          left: `${widget?.left}px`,
          top: `${widget?.top}px`,
          background: `#fff url(${require(`../WidgetsToolBar/images/${widget.name}.png`)}) no-repeat center`,
        }}
        // onMouseDown={() => alert("D")}
        onMouseOver={() => {
          setWidgetState({ isActive: true, name: widget.name });
        }}
        onMouseLeave={() => {
          setWidgetState({ isActive: false, name: null });
        }}
      >
        {widgetState?.isActive && widgetState?.name === widget.name && (
          <div
            className="wg-menu"
            onClick={(e) => {
              setWgMenuState({
                isOpen: !wgMenuState?.isOpen,
                position: { x: e.clientX, y: e.clientY },
              });
            }}
          />
        )}
      </WgMainBox>

      {wgMenuState?.isOpen && (
        <div
          style={{
            top: `${wgMenuState?.position?.y}px`,
            left: `${wgMenuState?.position?.x / 2}px`,
          }}
          className="wg-menu-bar"
        >
          <div
            className="close-btn"
            onClick={(e) => {
              setWgMenuState({
                isOpen: false,
                position: {},
              });
            }}
          >
            X
          </div>
          {widget.name}
          <button
            className="remove-btn"
            onClick={() =>
              dispatch(
                setWidgetsList(
                  widgetsList.filter((w) => w?.name !== widget?.name)
                )
              )
            }
          >
            Remove {widget.name}
          </button>
        </div>
      )}
    </>
  );
};

export const Dustbin = () => {
  const [widgetState, setWidgetState] = useState({
    isActive: false,
    name: null,
  });

  const state = useSelector((state) => state.app);
  const { widgetsList } = state;

  console.log(widgetsList, "widgetsList");

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
            style={{ backgroundColor, position: "relative" }}
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
                <WgBox
                  key={w.name}
                  widget={w}
                  setWidgetState={setWidgetState}
                  widgetState={widgetState}
                />
              );
            })}
          </div>
        </ResizePanel>

        {isActive ? "Release to drop" : "Drag a box here"}

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
