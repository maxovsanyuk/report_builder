import React, { useState } from "react";

// MATERIAL UI

import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";

// LODASH

import get from "lodash/get";

import styled from "styled-components";
import SelectValueComp from "./SelectValueComp";
import DefineFormatComp from "./DefineFormatComp";
import { useSelector } from "react-redux";

const FormatComp = styled.div`
  width: 800px;
  height: 600px;
`;

const TEST_NUMBER = 12345;

const FormatValueComp = ({ choosenWidget }) => {
  const [isModalOpen, seIsModalOpen] = useState(false);

  const state = useSelector((state) => state.app);
  const { widgetsList } = state;

  const choosenWgObj = widgetsList.find((w) => w?.id === choosenWidget?.id);

  console.log(choosenWgObj, "widgetsList");

  return (
    <div>
      <Button onClick={() => seIsModalOpen(!isModalOpen)} variant="outlined">
        Choose Format
      </Button>

      <Modal
        disableAutoFocus
        open={isModalOpen}
        onClose={() => seIsModalOpen(false)}
        closeAfterTransition
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <FormatComp>
          <Paper style={{ width: "100%", height: "100%", padding: "20px" }}>
            <h4
              style={{
                width: "100%",
                textAlign: "center",
              }}
            >
              Format Dialog
            </h4>
            <div style={{ width: "100%", height: "90%", display: "flex" }}>
              <div
                style={{
                  width: "60%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <SelectValueComp
                  param="type"
                  objParam="format"
                  resetObjBefore
                  label="Type"
                  choosenWidget={choosenWidget}
                  style={{
                    width: "100%",
                    maxWidth: "100%",
                  }}
                  arrOfValues={[
                    "number",
                    "currency",
                    "date",
                    "time",
                    "percentage",
                    "scientific",
                    "custom",
                  ]}
                />

                <DefineFormatComp
                  choosenWidget={choosenWidget}
                  type={get(choosenWgObj, "format.type")}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  width: "40%",
                  height: "100%",
                  borderLeft: "1px solid #ccc",
                }}
              >
                <span style={{ margin: "0 0 0 20px" }}>Preview</span>

                <div
                  style={{
                    width: "90%",
                    height: "200px",
                    margin: "0 5%",
                    border: "1px solid #ccc",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {TEST_NUMBER.toFixed(
                    get(choosenWgObj, "format.decimalPlaces", 0)
                  )}
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    size="small"
                    onClick={() => seIsModalOpen(false)}
                    variant="contained"
                    color="secondary"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </Paper>
        </FormatComp>
      </Modal>
    </div>
  );
};

export default FormatValueComp;
