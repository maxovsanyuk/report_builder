import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSettings } from "../../../../redux/actions/app_action";

import styled from "styled-components";

// LODASH

import get from "lodash/get";

// MATERIAL UI

import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

const SettingsBox = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 20px);
  border-radius: 3px;
  padding: 10px;
  margin: 10px 0 0 0;
`;

const PositionComp = () => {
  const [currentState, setCurrentState] = useState({});

  const state = useSelector((state) => state.app);
  const { settings } = state;
  const dispatch = useDispatch();

  return (
    <Paper>
      <SettingsBox>
        <h3 style={{ textAlign: "center", margin: "15px 0 0 0" }}>Position</h3>
        <div style={{ display: "flex" }}>
          {["height", "width"].map((i) => {
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  margin: "0 20px 0 0",
                }}
              >
                <TextField
                  type="number"
                  style={{
                    width: "70px",
                    margin: "0 10px 0 0",
                  }}
                  label={i}
                  name={i}
                  value={
                    get(currentState, `${i}`) || get(settings, `position.${i}`)
                  }
                  onChange={(e) => {
                    setCurrentState({
                      ...currentState,
                      [i]: e.target.value,
                    });

                    dispatch(
                      setSettings({
                        ...settings,
                        position: {
                          ...settings?.position,
                          [i]: e.target.value,
                        },
                      })
                    );
                  }}
                />
                px
              </div>
            );
          })}
        </div>
      </SettingsBox>
    </Paper>
  );
};

export default PositionComp;
