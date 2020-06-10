import React, {Component, Fragment} from "react";
import classes from './Entity.module.scss';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import cloneDeep from 'lodash/cloneDeep';

import AddIcon from '@material-ui/icons/Add';
import IconButton from "@material-ui/core/IconButton";
import Filter from "../Filter/Filter";
import Button from "@material-ui/core/Button";



export default class Entity extends Component {


  render() {
    const chosenFieldsQuantity = this.props.entity.filtersOptions.filter(option => option.type === 'field' && option.chosen).length;

    return (
      <Paper elevation={3} className={classes.panel}>
        {this.props.entity.showLogicalOperators && <div className={classes.logicalOperators}>
          <Button onClick={() => this.props.combineFilters(this.props.entity.id, 'and')} className={classes.logicalButton} variant="contained" color="primary">
            And
          </Button>
          <Button onClick={() => this.props.combineFilters(this.props.entity.id, 'or')} className={classes.logicalButton} variant="contained" color="primary">
            Or
          </Button>
        </div>}
        <div className={classes.entity}>
          <FormControl variant="outlined" className={classes.formControl}>
            <Select value={this.props.entity.value.value} onChange={(event) => this.props.entityChanged(event.target.value, this.props.entity.id)}>
              {this.props.entity.options.map(option => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}
            </Select>
          </FormControl>
          {this.props.entity.value.value && <Fragment>
            <Button onClick={() => this.props.openChooseFieldsDialog(this.props.entity.id)}>Choose fields ({chosenFieldsQuantity})</Button>
            <IconButton onClick={() => this.props.add(this.props.entity.id)} color="primary" component="span">
              <AddIcon />
            </IconButton>
          </Fragment>}
        </div>
        <div className={classes.filters}>
          {this.props.entity.filters.map(filter => <Filter
                                                      key={filter.id}
                                                      filter={filter}
                                                      deleteFilter={(filterId) => this.props.delete(this.props.entity.id, filterId)}
                                                      filterChanged={(value, filterId, name) => this.props.filterChanged(value, this.props.entity.id, filterId, name)}
                                                      options={this.props.entity.filtersOptions}/>)}
        </div>
      </Paper>
    );
  }
}
