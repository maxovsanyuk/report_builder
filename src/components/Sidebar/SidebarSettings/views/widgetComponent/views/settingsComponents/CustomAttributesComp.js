import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWidgetsList } from "../../../../../../../redux/actions/app_action";

// LODASH

import get from "lodash/get";

// MATERIAL

import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const CustomAttributeRow = ({
  data,
  setCurrentState,
  currentState,
  choosenWidget,
  choosenWg,
}) => {
  const [currentRowState, setCurrentRowState] = useState(data);

  const state = useSelector((state) => state.app);
  const { widgetsList } = state;

  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentState({
      ...currentState,
      disableAddBtn: !(
        get(currentRowState, "name") && get(currentRowState, "value")
      ),
      isFullAtribute: true,
    });
  }, [get(currentRowState, "name"), get(currentRowState, "value")]);

  return (
    <Paper
      style={{
        margin: "20px 20px 10px 20px",
      }}
    >
      <form
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {["name", "value"].map((i) => {
          return (
            <TextField
              key={i}
              style={{
                width: "200px",
                margin: "5px 0 15px 15px",
              }}
              label={i}
              onChange={(e) => {
                e.target.value === "" &&
                  setCurrentState({
                    ...currentState,
                    disableAddBtn: true,
                    isFullAtribute: false,
                  });

                setCurrentRowState({
                  ...currentRowState,
                  [i]: e.target.value,
                });

                dispatch(
                  setWidgetsList(
                    widgetsList.map((w) => {
                      return w?.id === choosenWidget?.id
                        ? {
                            ...choosenWg,
                            customAttributes: choosenWg?.customAttributes.length
                              ? choosenWg?.customAttributes.map((a) => {
                                  return a?.id === data?.id
                                    ? { ...a, [i]: e.target.value }
                                    : a;
                                })
                              : [],
                          }
                        : w;
                    })
                  )
                );
              }}
              value={get(data, `${i}`, get(currentRowState, `${i}`))}
            />
          );
        })}

        <IconButton
          component="span"
          onClick={() => {
            setCurrentState({
              ...currentState,
              disableAddBtn: false,
              isFullAtribute: true,
              isFirsNewAtribute: !choosenWg?.customAttributes.length,
            });
            dispatch(
              setWidgetsList(
                widgetsList.map((w) => {
                  return w?.id === choosenWidget?.id
                    ? {
                        ...w,
                        customAttributes: w?.customAttributes.filter(
                          (a) => a.id !== data?.id
                        ),
                      }
                    : w;
                })
              )
            );
          }}
          style={{
            maxWidth: "28px",
            marginRight: "10px",
          }}
        >
          <DeleteIcon />
        </IconButton>
      </form>
    </Paper>
  );
};

const CustomAttributeComp = ({ choosenWidget }) => {
  const [currentState, setCurrentState] = useState({
    isFirsNewAtribute: true,
    disableAddBtn: false,
    isFullAtribute: false,
  });

  const state = useSelector((state) => state.app);
  const { widgetsList } = state;

  const dispatch = useDispatch();
  const choosenWg = widgetsList.find((w) => w?.id === choosenWidget?.id);

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span className="btn-title">Add Custom Attributes</span>
        <button
          className="add-btn"
          disabled={
            currentState?.disableAddBtn ||
            (!currentState.isFullAtribute && !currentState.isFirsNewAtribute)
          }
          style={{
            opacity:
              currentState?.disableAddBtn ||
              (!currentState.isFullAtribute && !currentState.isFirsNewAtribute)
                ? "0.3"
                : "1",
          }}
          onClick={(e) => {
            setCurrentState({
              ...currentState,
              isFirsNewAtribute: false,
              disableAddBtn: true,
              isFullAtribute: false,
            });
            dispatch(
              setWidgetsList(
                widgetsList.map((w) => {
                  return w?.id === choosenWidget?.id
                    ? {
                        ...choosenWg,
                        customAttributes: [
                          ...choosenWg.customAttributes,
                          { name: "", value: "", id: new Date().getTime() },
                        ],
                      }
                    : w;
                })
              )
            );
          }}
        >
          + ADD
        </button>
      </div>

      <div className="parameters-box">
        {get(choosenWg, "customAttributes") &&
          choosenWg?.customAttributes.map((a) => {
            return (
              <CustomAttributeRow
                key={a.id}
                data={a}
                setCurrentState={setCurrentState}
                currentState={currentState}
                choosenWg={choosenWg}
                choosenWidget={choosenWidget}
              />
            );
          })}
      </div>
    </>
  );
};

export default CustomAttributeComp;
