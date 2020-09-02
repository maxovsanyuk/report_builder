import Draggable from "react-draggable";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeResizableDiv } from "../helpers/makeResizibleDiv";
import ReactResizeDetector from "react-resize-detector";
import {
  setChoosenSettingsType,
  setChoosenWidget,
  setWidgetsList,
  sideBarHandleOpen,
} from "../../../redux/actions/app_action";
import styled from "styled-components";
import ImgMenu from "../../WidgetsToolBar/images/menu-icon.png";
import get from "lodash/get";

const WgMainBox = styled.div`
  min-height: 100%;
  min-width: 100%;

  &:hover .wg-menu {
    display: flex;
  }

  .wg-menu {
    display: none;
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
        onClick={(e) => {
          e.stopPropagation();
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

const WgBox = ({
  widget,
  currentWidgetState,
  setCurrentWidgetState,
  wgPosition,
}) => {
  const [isWgMenuOpen, setIsWgMwnuOpen] = useState(false);

  let currentWidget = document.getElementById(`${widget?.id}`);

  const state = useSelector((state) => state.app);
  const { widgetsList } = state;
  const dispatch = useDispatch();

  console.log(widgetsList, "widgetsList");
  console.log(widget, "widget");

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
                      height: currentWidget ? currentWidget.offsetHeight : 200,
                      width: currentWidget ? currentWidget.offsetWidth : 200,
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
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          dispatch(setChoosenWidget({ name: widget.name, id: widget.id }));
          dispatch(sideBarHandleOpen(true));
          dispatch(setChoosenSettingsType("widget_settings"));
        }}
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
                : widget?.size?.height}
              px
            </span>
            <span>
              W:{" "}
              {currentWidget ? currentWidget.offsetWidth : widget?.size?.width}
              px
            </span>
          </div>

          <div>
            <span>
              X: {get(wgPosition, "clientX", get(widget, "position.left"))}
            </span>{" "}
            <span>
              Y: {get(wgPosition, "clientY", get(widget, "position.top"))}
            </span>
          </div>
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
  const [wgPosition, setWgPosition] = useState({});

  // const state = useSelector((state) => state.app);
  // const { widgetsList } = state;
  // const dispatch = useDispatch();
  //
  // const choosenWg = widgetsList.find((w) => w?.id === widget?.id);

  return (
    <Draggable
      onDrag={(e) => {
        setWgPosition(e);

        //
        // dispatch(
        //     setWidgetsList(
        //         widgetsList.map((w) => {
        //             return w?.id === widget?.id
        //                 ? {
        //                     ...choosenWg,
        //                     // position: { top: e.clientY, left: e.clientX },
        //                 }
        //                 : w;
        //         })
        //     )
        // );
      }}
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
          width: `${widget?.size?.width}px`,
          height: `${widget?.size?.height}px`,
          position: "absolute",
          left: `${widget?.position?.left}px`,
          top: `${widget?.position?.top}px`,
          border: `2px ${get(widget, "border", "solid")} ${get(
            widget,
            "borderColor",
            "#4da6ff"
          )}`,
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
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
          wgPosition={wgPosition}
          setCurrentWidgetState={setCurrentWidgetState}
          currentWidgetState={currentWidgetState}
        />
      </div>
    </Draggable>
  );
};

export default DragableWgComponent;
