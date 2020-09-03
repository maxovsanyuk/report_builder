import React, { Component } from "react";
import Workspace from "./Workspace/Workspace";
import Sidebar from "./Sidebar/Sidebar";
import WidgetsToolBar from "./WidgetsToolBar/WidgetsToolBar";
import Loader from "./views/Loader";
import styled from "styled-components";
import SettingsToolBar from "./SettingsToolBar/SettingsToolBar";

const MainCont = styled.div`
  display: flex;
  height: 100vh;
  position: relative;
  font-family: Arial;
`;

class App extends Component {
  render() {
    return (
      <div>
        <MainCont>
          <SettingsToolBar />
          <WidgetsToolBar />
          <Workspace />
          <Sidebar />
        </MainCont>

        <Loader />
      </div>
    );
  }
}

export default App;
