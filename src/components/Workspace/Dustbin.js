import React, { useState } from "react";
import { useDrop } from "react-dnd";
import ResizePanel from "react-resize-panel";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import update from "immutability-helper";

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
    display: none;
  }

  .widget {
    min-height: 100px;
    min-width: 100px;
    max-width: 90%;
    max-height: 90%;
    background: #fff;
    resize: both;
    overflow: auto;
    outline: 2px dashed #999;

    &::-webkit-resizer {
    }
  }

  .wg-info {
    text-align: center;
    padding: 10px;
    background: #fff;
  }
`;

export const Dustbin = () => {
  const state = useSelector((state) => state.app);
  const { widgetsList } = state;

  console.log(widgetsList, "widgetsList");

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
                <div
                  key={w.name}
                  className="widget"
                  style={{
                    position: "absolute",
                    left: `${w?.left}px`,
                    top: `${w?.top}px`,
                    background: `#fff url(${require(`../WidgetsToolBar/images/${w.name}.png`)}) no-repeat center`,
                    backgroundSize: "60%",
                  }}
                  onMouseOver={() => {
                    document.getElementById(`wg-info-${w.name}`).style.display =
                      "flex";
                  }}
                  onMouseLeave={() => {
                    document.getElementById(`wg-info-${w.name}`).style.display =
                      "none";
                  }}
                >
                  <div className="wg-info" id={`wg-info-${w.name}`}>
                    {w.name}
                  </div>
                </div>
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
