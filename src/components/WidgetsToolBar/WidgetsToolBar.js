import React from "react";
import styled from "styled-components";
import theme from "../../themes";

const ToolBoxBar = styled.div`
  width: 165px;
  height: calc(100% - 60px);
  background-color: #fff;
  border-right: ${({ theme }) => `1px solid ${theme?.border?.color}`};
  margin: 60px 0 0 0;
`;

const WidgetsToolBar = () => {
  return <ToolBoxBar theme={theme} />;
};

export default WidgetsToolBar;
