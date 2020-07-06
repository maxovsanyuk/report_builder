import React, {Component} from "react";
import classes from './DataSet.module.scss';
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import Alert from "../../../../Alerts/Alert";

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
    this.props.edit(this.props.dataSet.id);
  };
  deleteParameter = () => {
    this.setState({openMenu: false, openDeleteDialog: true});
  };
  onAgree = () => {
    this.setState({openDeleteDialog: false});
    this.props.delete(this.props.dataSet.id);
  };
  onDisagree = () => {
    this.setState({openDeleteDialog: false});
  };

  render () {
    return (
      <div className={classes.dataSet}>
        <div className={classes.row}>
          <h6>{this.props.dataSet.name}</h6>
          <IconButton ref={this.buttonRef} onClick={this.openMenu}>
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
        <div className={[classes.row, classes.treeWrapper].join(' ')}>
          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
          >
            {this.props.dataSet.entities.map(entity => <TreeItem key={entity.id} nodeId={String(entity.id)} label={entity.value.label}>
              {entity.filtersOptions.filter(option => option.type === 'field' && option.chosen).map(field => <TreeItem key={field.value} nodeId={field.value} label={field.label} />)}
            </TreeItem>)}
          </TreeView>
        </div>
        <Alert open={this.state.openDeleteDialog} onAgree={this.onAgree} onDisagree={this.onDisagree} text={`Are you sure you want to delete '${this.props.dataSet.name}'?`} title={'Delete'} />
      </div>
    );
  }
}
