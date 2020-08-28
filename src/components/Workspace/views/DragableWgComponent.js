import Draggable from "react-draggable";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeResizableDiv } from "../helpers/makeResizibleDiv";
import ReactResizeDetector from "react-resize-detector";
import { setWidgetsList } from "../../../redux/actions/app_action";
import styled from "styled-components";
import ImgMenu from "../../WidgetsToolBar/images/menu-icon.png";
import get from "lodash/get";

const WgMainBox = styled.div`
  min-height: 100%;
  min-width: 100%;

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
    <ReactResizeDetector
      onResize={(w, h) => {
        dispatch(
          setWidgetsList(
            widgetsList.map((w) => {
              return w.id === widget.id
                ? {
                    ...w,
                    size: {
                      sizing: {
                        height: currentWidget
                          ? currentWidget.offsetHeight
                          : 600,
                        width: currentWidget ? currentWidget.offsetWidth : 600,
                      },
                    },
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
      <WgMainBox
        className="resizers"
        id={widget?.id}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `rgba(255,255,255,0.9) url(${require(`../../WidgetsToolBar/images/${widget.name}.png`)}) no-repeat center`,
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
            flexDirection: "column",
            width: "100%",
            justifyContent: "center",
            position: "absolute",
            bottom: "5px",
            fontSize: "14px",
          }}
        >
          <div>
            <span style={{ margin: "0 10px 0 0" }}>
              H:{" "}
              {currentWidget
                ? currentWidget.offsetHeight
                : widget?.size?.sizing?.height}
              px
            </span>
            <span>
              W:{" "}
              {currentWidget
                ? currentWidget.offsetWidth
                : widget?.size?.sizing?.width}
              px
            </span>
          </div>
          {get(currentWidgetState, "position.clientX") && (
            <div>
              <span>X: {get(currentWidgetState, "position.clientX")}</span>{" "}
              <span>Y: {get(currentWidgetState, "position.clientY")}</span>
            </div>
          )}
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
    </ReactResizeDetector>
  );
};

const DragableWgComponent = ({
  widget,
  dragHandlers,
  setCurrentWidgetState,
  currentWidgetState,
}) => {
  return (
    <Draggable
      onDrag={(e, d) =>
        setCurrentWidgetState({
          ...currentWidgetState,
          position: e,
        })
      }
      key={widget.id}
      bounds="parent"
      {...dragHandlers}
    >
      <div
        onMouseOver={() => {
          setCurrentWidgetState({
            ...currentWidgetState,
            draggable: false,
            isActive: true,
            id: widget.id,
          });
        }}
        className={`box resizable ${widget.name}_${widget.id}_resizable`}
        style={{
          position: "absolute",
          left: `${widget?.left}px`,
          top: `${widget?.top}px`,
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
          widget={widget}
          setCurrentWidgetState={setCurrentWidgetState}
          currentWidgetState={currentWidgetState}
        />
      </div>
    </Draggable>
  );
};

export default DragableWgComponent;
