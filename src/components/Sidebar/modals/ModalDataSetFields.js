import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";

const ModalDataSetFields = ({
  setIsMadalOpen,
  entitiState,
  setEntitiState,
}) => {
  return (
    <Dialog open onClose={() => setIsMadalOpen(false)}>
      <DialogTitle id="form-dialog-title">Choose fields</DialogTitle>
      <DialogContent>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {entitiState &&
            entitiState?.dataSetFields?.items?.map((f) => {
              return (
                <div key={f.logicalName + f.label}>
                  <Checkbox
                    defaultChecked={f.chosen}
                    value={f.logicalName}
                    onChange={(e) => {
                      const items = entitiState?.dataSetFields?.items.map(
                        (f) => {
                          if (f.logicalName === e.target.value) {
                            return {
                              ...f,
                              chosen: e.target.checked,
                            };
                          } else return f;
                        }
                      );

                      setEntitiState({
                        ...entitiState,
                        dataSetFields: {
                          ...entitiState.dataSetFields,
                          items,
                          id: new Date().getTime(),
                        },
                      });
                    }}
                    color="primary"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                  <span style={{ margin: "0 10px 0 10px" }}>
                    {f.logicalName}
                  </span>
                </div>
              );
            })}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "30px 0 0 0",
          }}
        >
          {/*<Button variant="contained" size="small" color="primary" autoFocus>*/}
          {/*  Save*/}
          {/*</Button>*/}

          <Button
            color="secondary"
            size="small"
            onClick={() => setIsMadalOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDataSetFields;
