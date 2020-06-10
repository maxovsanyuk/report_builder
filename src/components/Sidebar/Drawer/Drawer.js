import React from 'react';

import classes from './Drawer.module.scss'

export default function Drawer(props) {
  return (
    props.open && <aside className={classes.Drawer}>
      {props.children}
    </aside>
  )
}
