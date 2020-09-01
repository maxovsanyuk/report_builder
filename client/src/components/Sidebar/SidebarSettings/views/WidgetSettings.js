import React from "react";
import { useSelector } from "react-redux";

import PositionComp from "./reportSettingsComponents/PositionComp";
import BackgroundImageComp from "./reportSettingsComponents/BackgroundImageComp";
import BasicWidgetComp from "./widgetComponent/BasicWidgetComp";

import styled from "styled-components";

const SettingsBox = styled.div`
  width: calc(100% - 20px);
  margin: 10px 0 0 0;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 10px;

  .color-picker {
    &:hover {
      cursor: pointer;
    }
  }

  .close-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    position: absolute;
    top: -10px;
    right: -10px;
    border-radius: 50%;
    border: 1px solid #ccc;
    background: #fff;
    font-size: 12px;
    color: #999;
    z-index: 30;
    transition: 0.3s;
    &:hover {
      transition: 0.3s;
      cursor: pointer;
      color: #000;
    }
  }

  .color-box {
    min-width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid #ccc;
    transition: 0.6s;

    &:hover {
      cursor: pointer;
    }
  }
`;

const WidgetSettings = () => {
  const state = useSelector((state) => state.app);
  const { choosenWidget } = state;

  console.log(choosenWidget, "choosenWidget");

  return (
    <SettingsBox>
      <BasicWidgetComp choosenWidget={choosenWidget} />
      {/*<BackgroundImageComp />*/}
      {/*<PositionComp />*/}
    </SettingsBox>
  );
};

export default WidgetSettings;
