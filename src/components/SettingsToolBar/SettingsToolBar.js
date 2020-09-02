import React from "react";
import styled from "styled-components";
import theme from "../../themes";

const SettingsToolCont = styled.div`
  width: 100%;
  height: 60px;
  position: absolute;
  top: 0;
  z-index: 95;
  background: #fff;
  border-bottom: ${({ theme }) => `1px solid ${theme?.border?.color}`};
`;

const SettingsToolBar = () => {
  return <SettingsToolCont theme={theme} />;
};

export default SettingsToolBar;
