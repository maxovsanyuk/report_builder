import React, { useState } from "react";

// MATERIAL UI

import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";

import styled from "styled-components";

const FormatComp = styled.div`
  width: 800px;
  height: 600px;
`;

const FormatValueComp = ({ choosenWidget }) => {
  const [isModalOpen, seIsModalOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => seIsModalOpen(!isModalOpen)} variant="outlined">
        Choose Format
      </Button>

      <Modal
        open={isModalOpen}
        onClose={() => seIsModalOpen(false)}
        closeAfterTransition
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <FormatComp>
          <Paper style={{ width: "100%", height: "100%", padding: "20px" }}>
            Comming soon
          </Paper>
        </FormatComp>
      </Modal>
    </div>
  );
};

export default FormatValueComp;
