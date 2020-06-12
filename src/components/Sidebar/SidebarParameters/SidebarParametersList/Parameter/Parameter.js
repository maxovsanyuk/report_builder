import React, {Component} from "react";
import classes from "./Parameter.module.scss";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Alert from "../../../../Alert/Alert";

export default class SidebarParametersList extends Component {
  constructor(props) {
    super(props);
    this.buttonRef = React.createRef();
    this.state = {
      openMenu: false,
      openDeleteDialog: false
    };
  }

  openMenu = () => {
    this.setState({openMenu: true});
  };
  handleClose = () => {
    this.setState({openMenu: false});
  };
  editParameter = () => {
    this.setState({openMenu: false});
    this.props.edit(this.props.param.id);
  };
  deleteParameter = () => {
    this.setState({openMenu: false, openDeleteDialog: true});
  };
  onAgree = () => {
    this.setState({openDeleteDialog: false});
    this.props.delete(this.props.param.id);
  };
  onDisagree = () => {
    this.setState({openDeleteDialog: false});
  };

  render () {
    return (
      <div className={classes.parameter}>
        <h6>{this.props.param.name}</h6>
        <IconButton ref={this.buttonRef} onClick={this.openMenu} aria-label="delete">
          <MoreVertIcon />
        </IconButton>
        <Menu
          open={this.state.openMenu}
          anchorEl={this.buttonRef.current}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.editParameter}>Edit</MenuItem>
          <MenuItem onClick={this.deleteParameter}>Delete</MenuItem>
        </Menu>
        <Alert open={this.state.openDeleteDialog} onAgree={this.onAgree} onDisagree={this.onDisagree} text={`Are you sure you want to delete '${this.props.param.name}'?`} title={'Delete'} />
      </div>
    );
  }
}
