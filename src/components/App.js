import React from "react";
import "../App.scss";
import { useSelector, useDispatch } from "react-redux";

import Workspace from "./Workspace/Workspace";
import Sidebar from "./Sidebar/Sidebar";
import Toolbox from "./Toolbox/Toolbox";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

const App = () => {
  const state = useSelector((state) => state.app);
  const { isLoading } = state;

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <div className="App">
        {isLoading && <div id="app-loading" />}
        <Toolbox />
        <Workspace />
        <Sidebar />
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default App;
