import React, {Component} from "react";
import classes from "../SidebarParametersList.module.scss";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export default class SidebarParametersList extends Component {
  constructor(props) {
    super(props);
    this.buttonRef = React.createRef();
    this.state = {
      openMenu: false
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
    this.setState({openMenu: false});
    this.props.delete(this.props.param.id);
  };

  render () {
    return (
      <div className={classes.parameter}>
        <p>{this.props.param.name}</p>
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
      </div>
    );
  }
}
