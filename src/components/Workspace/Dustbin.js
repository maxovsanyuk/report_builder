import React from "react";
import { useDrop } from "react-dnd";
import ResizePanel from "react-resize-panel";
import styled from "styled-components";

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
`;

export const Dustbin = () => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "box",
    drop: () => ({ name: "Dustbin" }),
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
          style={{ backgroundColor }}
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
