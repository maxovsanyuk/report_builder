import React from "react";
import Workspace from "./Workspace/Workspace";
import Sidebar from "./Sidebar/Sidebar";
import WidgetsToolBar from "./WidgetsToolBar/WidgetsToolBar";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import Loader from "./views/Loader";
import styled from "styled-components";
import SettingsToolBar from "./SettingsToolBar/SettingsToolBar";

const MainCont = styled.div`
  display: flex;
  height: 100vh;
  position: relative;
`;

const App = () => {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <MainCont>
        <SettingsToolBar />
        <WidgetsToolBar />
        <Workspace />
        <Sidebar />
      </MainCont>

      <Loader />
    </MuiPickersUtilsProvider>
  );
};

export default App;
