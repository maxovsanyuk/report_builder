import React, {Component, Fragment} from 'react';

import classes from './SidebarData.module.scss'

import cloneDeep from 'lodash/cloneDeep';
import AdvancedFinder from "./AdvancedFinder/AdvancedFinder";
import DataSetList from "./DataSetList/DataSetList";

export default class SidebarData extends Component {
  state = {
    isFinder: false,
    dataSet: null
  };

  submitDataSet = (fetch, entities, name, id, mode) => {
    const newDataSets = cloneDeep(this.props.dataSets);
    switch (mode) {
      case 'save':
        newDataSets.push({id, name, entities});
        break;
      case 'edit':
        let editDataSetIndex = newDataSets.findIndex(dataSet => dataSet.id === id);
        newDataSets.splice(editDataSetIndex, 1, {id, name, entities});
        break;
      default:
        break;
    }

    this.props.setDataSets(newDataSets);
    this.setState({isFinder: false});
  };

  newDataSet = () => {
    this.setState({isFinder: true, dataSet: null})
  };
  editDataSet = (dataSetId) => {
    const dataSets = cloneDeep(this.props.dataSets);
    const dataSetToEdit = dataSets.find(dataSet => dataSet.id === dataSetId);
    this.setState({dataSet: dataSetToEdit, isFinder: true});
  };
  deleteDataSet = (dataSetId) => {
    const dataSets = cloneDeep(this.props.dataSets).filter(dataSet => dataSet.id !== dataSetId);
    this.props.setDataSets(dataSets);
  };
  closeAdvancedFinder = () => {
    this.setState({isFinder: false});
  };


  render () {
    return (
      <Fragment>
        <h2>Data</h2>
        {this.state.isFinder
          ? <AdvancedFinder setLoading={this.props.setLoading}
                            dataSet={this.state.dataSet}
                            dataSets={this.props.dataSets}
                            cancel={this.closeAdvancedFinder}
                            save={this.submitDataSet} />
          : <DataSetList delete={this.deleteDataSet}
                         edit={this.editDataSet}
                         dataSets={this.props.dataSets}
                         new={this.newDataSet}/>}
      </Fragment>
    )
  }
}
