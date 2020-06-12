import React from 'react';
import './App.scss';
import Workspace from "./components/Workspace/Workspace";
import Sidebar from "./components/Sidebar/Sidebar";
import Toolbox from "./components/Toolbox/Toolbox";
import { connect } from 'react-redux';
import MomentUtils from "@date-io/moment";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";

const mapStateToProps = state => ({
  loading: state.app.loading
});

function App(props) {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <div className="App">
        {props.loading && <div id="app-loading"/>}
        <Toolbox/>
        <Workspace />
        <Sidebar/>
      </div>
    </MuiPickersUtilsProvider>
  );
}

export default connect(mapStateToProps)(App);
