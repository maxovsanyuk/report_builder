import React from 'react';
import './App.scss';
import Workspace from "./components/Workspace/Workspace";
import Sidebar from "./components/Sidebar/Sidebar";
import Toolbox from "./components/Toolbox/Toolbox";
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  loading: state.app.loading
});

function App(props) {
  return (
    <div className="App">
      {props.loading && <div id="app-loading"/>}
      <Toolbox/>
      <Workspace />
      <Sidebar/>
    </div>
  );
}

export default connect(mapStateToProps)(App);
