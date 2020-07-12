import React, { useState } from "react";

import styled from "styled-components";

// MATERIAL UI

import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const Row = styled.div`
  font-size: 14px;
  &:hover {
    cursor: pointer;
  }
`;

const EntitiRow = ({ entiti }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Row onClick={() => setIsOpen((p) => !p)}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ margin: "0 0 2px 0" }}>{entiti?.selectType?.label}</span>
        {isOpen ? <NavigateBeforeIcon /> : <NavigateNextIcon />}
      </div>

      {isOpen && (
        <ul style={{ margin: 0 }}>
          {entiti?.dataSetFields?.items?.map((l) => {
            return <li key={l.label}>{l?.label}</li>;
          })}
        </ul>
      )}
    </Row>
  );
};

export default EntitiRow;
