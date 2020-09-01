import React from "react";
import { useDrag } from "react-dnd";

import { useDispatch, useSelector } from "react-redux";
import { setWidgetsList } from "../../redux/actions/app_action";

import styled from "styled-components";

const WidgetBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  background: #fff;
  border: 1px solid #ccc;
  margin: 0 1px 1px 0;
  transition: 0.3s;

  &:hover {
    cursor: pointer;
    border: 1px solid #000;
    transition: 0.3s;
    .info-box {
      transition: 0.5s;
      transition-delay: 0.3s;
      opacity: 1;
    }
  }
`;

export const Widget = ({ wgConfig, setCurrentWgInfo }) => {
  const { name } = wgConfig;
  const state = useSelector((state) => state.app);
  const { widgetsList } = state;

  const dispatch = useDispatch();

  function getCoords(elem) {
    const box = elem.getBoundingClientRect();
    return {
      top: box.top + window.pageYOffset,
      left: box.left + window.pageXOffset,
    };
  }

  const [{ isDragging }, drag] = useDrag({
    item: { name, type: "box" },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (item && dropResult) {
        var widget = document.getElementById(name);

        dispatch(
          setWidgetsList([
            ...widgetsList,
            {
              id: new Date().getTime(),
              position: {
                top: getCoords(widget).top,
                left: getCoords(widget).left,
              },
              size: { height: 200, width: 200 },
              ...wgConfig,
            },
          ])
        );

        // alert(`You dropped ${item.name} into ${dropResult.name}!`);
      }
    },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  });

  return (
    <WidgetBox
      id={name}
      ref={drag}
      style={{ opacity: isDragging ? 0.4 : 1 }}
      onMouseEnter={() => {
        setCurrentWgInfo(name);
      }}
      onMouseLeave={() => {
        setCurrentWgInfo(null);
      }}
      onMouseDown={() => {
        widgetsList.filter((w) => w.name === name).length &&
          alert("Widget already exist");
        setCurrentWgInfo(null);
      }}
    >
      <img src={require(`../WidgetsToolBar/images/${name}.png`)} alt={name} />
    </WidgetBox>
  );
};
