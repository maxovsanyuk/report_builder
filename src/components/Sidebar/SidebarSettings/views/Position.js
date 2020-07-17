import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import get from "lodash/get";
import { setSettings } from "../../../../redux/actions/app_action";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";

const SettingsBox = styled.div`
  display: flex;
  width: calc(100% - 20px);
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 10px;
  margin: 10px 0 0 0;
`;

const Position = () => {
  const [currentState, setCurrentState] = useState({});

  const state = useSelector((state) => state.app);
  const { settings } = state;
  const dispatch = useDispatch();

  return (
    <SettingsBox>
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
    </SettingsBox>
  );
};

export default Position;
