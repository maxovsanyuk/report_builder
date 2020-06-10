import React, {Component, Fragment} from 'react';

import classes from './DataSetList.module.scss'
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import DataSet from "./DataSet/DataSet";




export default class DataSetList extends Component {

  render () {
    return (
      <Fragment>
        {
          this.props.dataSets.map(dataSet => <DataSet delete={this.props.delete} edit={this.props.edit} key={dataSet.id} dataSet={dataSet}/>)
        }
        <div className={classes.buttonWrapper}>
          <Button onClick={this.props.new} variant="contained" color="primary">
            New dataset
          </Button>
        </div>
      </Fragment>
    )
  }
}

DataSetList.propTypes = {
  new: PropTypes.func.isRequired,
  dataSets: PropTypes.array.isRequired
};
