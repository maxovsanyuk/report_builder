import React from 'react';

import classes from './Backdrop.module.scss';

export default function Backdrop(props) {
  return (
    props.open && <div onClick={props.onClick} className={classes.Backdrop} />
  )
}
