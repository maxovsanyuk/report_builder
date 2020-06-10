import React, {Component, Fragment} from "react";
import classes from './Filter.module.scss';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import cloneDeep from 'lodash/cloneDeep';

import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import ListSubheader from "@material-ui/core/ListSubheader";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";



export default class Filter extends Component {

  render() {
    const parseValueField = (filter) => {
      switch (filter.valueField.type) {
        case 'number':
          return <TextField type="number" name="Value" onChange={(event) => this.props.filterChanged(event.target.value, filter.id, 'value')} label="Value" value={filter.value} />;
        case 'optionSet':
          return (
            <Fragment>
              <InputLabel>Value</InputLabel>
              <Select value={filter.value.value} onChange={(event) => this.props.filterChanged(event.target.value, filter.id, 'value')}>
                {filter.valueField.options.map(option => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}
              </Select>
            </Fragment>
          );
        default:
          return <TextField name="Value" onChange={(event) => this.props.filterChanged(event.target.value, filter.id, 'value')} label="Value" value={filter.value} />
      }
    };
    const parseFilter = (filter) => {
      if (filter.logicalType) {
        return <div key={filter.id} className={classes.filtersContainer}>
          {/*<Checkbox*/}
          {/*  checked={filter.checked}*/}
          {/*  onChange={(event) => this.props.filterChanged(event.target.checked, filter.id, 'checkbox')}*/}
          {/*  color="primary"*/}
          {/*/>*/}
          <div className={classes.logicalTypeName}>
            <h3>
              {filter.logicalType}
            </h3>
          </div>
          <div className={classes.logicalTypeFilters}>
            {filter.items.map(filter => parseFilter(filter))}
          </div>
          {/*<IconButton onClick={() => this.props.deleteFilter(filter.id)} component="span">*/}
          {/*  <DeleteIcon />*/}
          {/*</IconButton>*/}
        </div>
      } else {
        return <div key={filter.id} className={classes.filtersContainer}>
          <FormControl className={classes.formControl}>
            <InputLabel>Field</InputLabel>
            <Select value={filter.field.value} onChange={(event) => this.props.filterChanged(event.target.value, filter.id, 'field')}>
              <ListSubheader>Fields</ListSubheader>
              {this.props.options.map(option => option.type === 'field' ? <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem> : null)}
              <ListSubheader>Related</ListSubheader>
              {this.props.options.map(option => option.type === 'related' ? <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem> : null)}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Operator</InputLabel>
            <Select value={filter.operator.value} onChange={(event) => this.props.filterChanged(event.target.value, filter.id, 'operator')}>
              {filter.operators.map(option => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            {parseValueField(filter)}
          </FormControl>
        </div>
      }
    };

    let newFilter = this.props.filter.logicalType
      ? <Fragment>
          <Checkbox
            checked={this.props.filter.checked}
            onChange={(event) => this.props.filterChanged(event.target.checked, this.props.filter.id, 'checkbox')}
            color="primary"
          />
          <div className={classes.logicalTypeName}>
            <h3>
              {this.props.filter.logicalType}
            </h3>
          </div>
          <div className={classes.logicalTypeFilters}>
            {this.props.filter.items.map(filter => parseFilter(filter))}
          </div>
          <IconButton onClick={() => this.props.deleteFilter(this.props.filter.id)} component="span">
            <DeleteIcon />
          </IconButton>
        </Fragment>
      : <Fragment>
          {this.props.filter.field.value && <Checkbox
            checked={this.props.filter.field.checked}
            onChange={(event) => this.props.filterChanged(event.target.checked, this.props.filter.id, 'checkbox')}
            color="primary"
          />}
          <FormControl className={classes.formControl}>
            <InputLabel>Field</InputLabel>
            <Select value={this.props.filter.field.value} onChange={(event) => this.props.filterChanged(event.target.value, this.props.filter.id, 'field')}>
              <ListSubheader>Fields</ListSubheader>
              {this.props.options.map(option => option.type === 'field' ? <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem> : null)}
              <ListSubheader>Related</ListSubheader>
              {this.props.options.map(option => option.type === 'related' ? <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem> : null)}
            </Select>
          </FormControl>
          {this.props.filter.field.value && <Fragment>
            <FormControl className={classes.formControl}>
              <InputLabel>Operator</InputLabel>
              <Select value={this.props.filter.operator.value} onChange={(event) => this.props.filterChanged(event.target.value, this.props.filter.id, 'operator')}>
                {this.props.filter.operators.map(option => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              {parseValueField(this.props.filter)}
            </FormControl>
            <IconButton onClick={() => this.props.deleteFilter(this.props.filter.id)} component="span">
              <DeleteIcon />
            </IconButton>
          </Fragment>}
        </Fragment>;
    
    return (
      <Fragment>
        <Divider />
        <div className={classes.filter}>
          {newFilter}
        </div>
      </Fragment>
    );
  }
}
