import React from "react";

import styled from "styled-components";

// LODASH

import PositionComp from "./PositionComp";
import BackgroundImageComp from "./BackgroundImageComp";
import BasicSettingsComp from "./BasicSettingsComp";

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

const ReportSettings = () => {
  return (
    <SettingsBox>
      <BasicSettingsComp />
      <BackgroundImageComp />
      <PositionComp />
    </SettingsBox>
  );
};

export default ReportSettings;
