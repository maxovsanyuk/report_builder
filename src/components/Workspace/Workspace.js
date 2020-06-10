import React, {Component} from 'react';
import classes from './Workspace.module.scss'

export default class Workspace extends Component {

  render() {
    return (
      <div className={classes.Workspace}>
        <div className={classes.canvas}></div>
      </div>
    );
  }
}
