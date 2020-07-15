import React from "react";
import { useDrag } from "react-dnd";

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

export const Widget = ({ name, setCurrentWgInfo }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { name, type: "box" },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        alert(`You dropped ${item.name} into ${dropResult.name}!`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <WidgetBox
      ref={drag}
      style={{ opacity: isDragging ? 0.4 : 1 }}
      onMouseEnter={() => setCurrentWgInfo(name)}
      onMouseLeave={() => setCurrentWgInfo(null)}
      onMouseDown={() => setCurrentWgInfo(null)}
    >
      <img src={require(`../WidgetsToolBar/images/${name}.png`)} alt={name} />
    </WidgetBox>
  );
};
