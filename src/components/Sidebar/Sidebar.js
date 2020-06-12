import React, {Component} from 'react';
import Drawer from './Drawer/Drawer';
import SidebarSettings from './SidebarSettings/SidebarSettings';
import SidebarData from './SidebarData/SidebarData-redux';
import SidebarParameters from './SidebarParameters/SidebarParameters-redux';
import SidebarImageManager from './SidebarImageManager/SidebarImageManager';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import FilterListIcon from '@material-ui/icons/FilterList';
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import StorageIcon from '@material-ui/icons/Storage';

import cls from 'react-style-classes';
import classes from './Sidebar.module.scss'
import Backdrop from "./Backdrop/Backdrop";

export default class Sidebar extends Component {

  state = {
    buttons: [
      {
        name: 'properties',
        active: false,
        component: <SidebarSettings/>
      },
      {
        name: 'data',
        active: false,
        component: <SidebarData/>
      },
      {
        name: 'parameters',
        active: false,
        component: <SidebarParameters/>
      },
      {
        name: 'image',
        active: false,
        component: <SidebarImageManager/>
      }
    ],
    drawerIsOpen: false
  };

  toggleDrawer = (name) => {
    const newButtons = [...this.state.buttons];
    const clickedButton = newButtons.find(btn => btn.name === name);
    const clickedButtonIsActive = clickedButton.active;
    newButtons.forEach(btn => btn.active = false);
    clickedButton.active = !clickedButtonIsActive;
    const drawerIsOpen = newButtons.some(btn => btn.active === true);

    this.setState({ buttons: newButtons, drawerIsOpen: drawerIsOpen });
  };

  closeDrawer = () => {
    const newButtons = [...this.state.buttons];
    newButtons.forEach(btn => btn.active = false);
    this.setState({ buttons: newButtons, drawerIsOpen: false });
  };

  render() {
    const buttons = this.state.buttons.map(button => {
      let icon = null;
      switch (button.name) {
        case 'properties':
          icon = <SettingsIcon/>;
          break;
        case 'data':
          icon = <StorageIcon/>;
          break;
        case 'parameters':
          icon = <FilterListIcon/>;
          break;
        case 'image':
          icon = <WallpaperIcon/>;
          break;
        default:
          break;
      }
      return <IconButton className={button.active ? cls(classes.btn, classes.activeBtn) : classes.btn}
                         key={button.name}
                         onClick={() => this.toggleDrawer(button.name)}>
        {icon}
      </IconButton>
    });

    const activeButton = this.state.buttons.find(button => button.active);
    const drawerComponent = activeButton ? activeButton.component : null;

    return (
      <div className={classes.Sidebar}>
        {buttons}
        <Backdrop open={this.state.drawerIsOpen} onClick={this.closeDrawer} />
        <Drawer open={this.state.drawerIsOpen}>
          {drawerComponent}
        </Drawer>
      </div>
    );
  }
}
