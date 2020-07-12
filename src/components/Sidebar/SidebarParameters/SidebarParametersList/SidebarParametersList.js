import React, { Component, Fragment } from "react";

import classes from "./SidebarParametersList.module.scss";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import Parameter from "./Parameter/Parameter";

export default class SidebarParametersList extends Component {
  state = {};

  render() {
    return (
      <Fragment>
        {this.props.parameters.map((param) => (
          <Parameter
            delete={this.props.onDeleteParameter}
            edit={this.props.onEditParameter}
            key={param.id}
            param={param}
          />
        ))}
        <div className={classes.buttonWrapper}>
          <Button
            onClick={this.props.onNewParameter}
            variant="contained"
            color="primary"
          >
            {this.props.paramName}
          </Button>
        </div>
      </Fragment>
    );
  }
}

SidebarParametersList.propTypes = {
  onNewParameter: PropTypes.func.isRequired,
  parameters: PropTypes.array.isRequired,
};
