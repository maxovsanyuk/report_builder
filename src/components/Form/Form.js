import React, {Component, Fragment} from 'react';
import classes from './Form.module.scss'
import PropTypes from 'prop-types'; //

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import InputLabel from '@material-ui/core/InputLabel';
import TabPanel from './TabPanel/TabPanel';
import FormHelperText from "@material-ui/core/FormHelperText";
import { DateTimePicker} from '@material-ui/pickers'
import moment from 'moment';




export default class Form extends Component {
  getForm = (formFields) => {
    let form = {};
    if (this.props.formData) {
      form = {...this.props.formData};
    } else {
      formFields.forEach(field => {
        if (field.type === 'additionalSection') {   //assigning fields from additional sections
          switch (field.name) {
            case 'parameterAssignValues':
                form = Object.assign(form, {
                  valueType: 0,
                  availableSecondValueType: 0,
                  defaultSecondValueType: 0,
                  availableQueryDataset: '',
                  availableQueryField: ''
                });
              break;
            default:
              break;
          }
          return;
        }
        if (field.type === 'checkbox') {
          form[field.name] = field.checked;
          return;
        }
        if (field.type === 'dateTime') {
          form[field.name] = field.defaultValue ? field.defaultValue : moment().utc().format();
          return;
        }
        if (field.type === 'optionSet') {
          form[field.name] = field.defaultValue ? field.defaultValue : {value: '', label: ''};
          return;
        }
        form[field.name] = field.defaultValue ? field.defaultValue : '';
      });
    }
    return form;
  };

  state = {
    form: this.getForm(this.props.formFields),
    mode: this.props.formData ? 'edit' : 'save',
    errors: {},
    isFormValid: false
  };

  componentDidMount() {
    this.validate();
  }

  fieldChanged = (event, field) => {
    let value = null;
    switch (field.type) {
      case 'checkbox':
        value = !this.state.form[field.name];
        break;
      case 'text':
        value = event.target.value;
        break;
      case 'dateTime':
        value = moment(event.date).utc().format();
        break;
      case 'optionSet':
        value = field.options.find(option => option.value === event.target.value);
        break;
      default:
        return;
    }

    this.setState((prevState) => {
      return {
        form: {
          ...prevState.form,
          [field.name]: value
        }
      }
    }, () => {
      this.validate();
      if (field.valueChanged) {
        this.props.valueChanged(field.name, this.state.form[field.name]);
      }
    });
  };

  validate = () => {
    let errors = {...this.state.errors};

    this.props.formFields.filter(field => !field.hidden && field.validation?.length).forEach(field => {
      const validatorsValue = [];
      field.validation.forEach(validator => {
        switch (validator.name) {
          case 'required':
            if (field.type === 'text') {
              validatorsValue.push(!this.state.form[field.name] ? 'required' : false);
            }
            if (field.type === 'optionSet') {
              validatorsValue.push(!this.state.form[field.name].value ? 'required' : false);
            }
            break;
          case 'minLength':
            validatorsValue.push(this.state.form[field.name].length < validator.value ? 'minLength' : false);
            break;
          case 'maxLength':
            validatorsValue.push(this.state.form[field.name].length > validator.value ? 'maxLength' : false);
            break;
          default:
            break;
        }
      });
      errors[field.name] = validatorsValue.some(value => value) ? validatorsValue.find(value => value) : false;
    });

    const isFormValid = Object.values(errors).every(value => !value);
    this.setState({errors, isFormValid: isFormValid});
  };

  tabsHandleChange = (name, newValue) => {
    this.setState((prevState) => {
      return {
        form: {
          ...prevState.form,
          [name]: newValue
        }
      }
    });
  };

  render () {
    return (
      <Fragment>
        <form className={classes.form}>
          {
            this.props.formFields.map(field => {
              let helperText = '';
              if (this.state.errors[field.name]) {
                switch (this.state.errors[field.name]) {
                  case 'required':
                    helperText = `${field.label} is required`;
                    break;
                  case 'minLength':
                    helperText = `${field.label} is too short`;
                    break;
                  case 'maxLength':
                    helperText = `${field.label} is too long`;
                    break;
                  default:
                    break;
                }
              }

              if (field.type === 'text' && !field.hidden) {
                return (
                  <FormControl key={field.name} className={classes.formControl}>
                    <TextField name={field.name} error={!!this.state.errors[field.name]} onChange={(event) => this.fieldChanged(event, field)} helperText={helperText} label={field.label} value={this.state.form[field.name]} />
                  </FormControl>
                )
              }
              if (field.type === 'optionSet' && !field.hidden) {
                return (
                  <FormControl key={field.name} error={!!this.state.errors[field.name]} className={[classes.formControl, classes.selectFormControl].join(' ')}>
                    <InputLabel>{field.label}</InputLabel>
                    <Select value={this.state.form[field.name].value} multiple={field.multiple} onChange={(event) => this.fieldChanged(event, field)}>
                      {field.options.map(option => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}
                    </Select>
                    <FormHelperText>{helperText}</FormHelperText>
                  </FormControl>
                )
              }
              if (field.type === 'checkbox' && !field.hidden) {
                return (
                  <FormControlLabel
                    key={field.name}
                    control={<Checkbox onChange={(event) => this.fieldChanged(event, field)} checked={this.state.form[field.name]} name={field.name} />}
                    label={field.label}
                  />
                )
              }
              if (field.type === 'dateTime' && !field.hidden) {
                return (
                  <DateTimePicker
                    key={field.name}
                    format={'DD MMM YYYY HH:mm'}
                    ampm={false}
                    label={field.label}
                    disableFuture
                    value={this.state.form[field.name]}
                    onChange={(date) => this.fieldChanged({date}, field)}
                  />
                )
              }
              if (field.type === 'additionalSection' && !field.hidden) {
                return (
                  <Fragment key={field.name}>
                    <h3>Assign values</h3>
                    <Tabs
                      value={this.state.form.valueType}
                      onChange={(e, newValue) => this.tabsHandleChange('valueType', newValue)}
                      indicatorColor="primary"
                      textColor="primary"
                    >
                      <Tab label="Available value" />
                      <Tab label="Default value" />
                    </Tabs>
                    <TabPanel value={this.state.form.valueType} index={0}>
                      <Tabs
                        value={this.state.form.availableSecondValueType}
                        onChange={(e, newValue) => this.tabsHandleChange('availableSecondValueType', newValue)}
                        indicatorColor="primary"
                        textColor="primary"
                      >
                        <Tab label="None" />
                        <Tab label="Specify" />
                        <Tab label="Query value" />
                      </Tabs>
                      <TabPanel value={this.state.form.availableSecondValueType} index={0}>
                      </TabPanel>
                      <TabPanel value={this.state.form.availableSecondValueType} index={1}>
                        <div style={{minHeight: '250px'}}>
                          <h4>Add the available values for the parameters:</h4>
                          <button>Add</button>
                          <div style={{border: '1px solid #000', height: '200px'}}/>
                        </div>
                      </TabPanel>
                      <TabPanel value={this.state.form.availableSecondValueType} index={2}>
                        <div>
                          <h4>Choose the dataset and fields for the available values:</h4>
                          <FormControl className={classes.formControl}>
                            <InputLabel>Dataset</InputLabel>
                            <Select value={this.state.form.availableQueryDataset} onChange={(event) => this.fieldChanged(event, {type: 'optionSet', name: 'availableQueryDataset'})}>
                              {this.props.dataSets.map(set => <MenuItem key={set.id} value={set.id}>{set.name}</MenuItem>)}
                            </Select>
                          </FormControl>
                          <FormControl className={classes.formControl}>
                            <InputLabel>Value Field</InputLabel>
                            <Select value={this.state.form.availableQueryField} onChange={(event) => this.fieldChanged(event, {type: 'optionSet', name: 'availableQueryField'})}>
                              {this.props.dataSets.find(dataSet => dataSet.id === this.state.form.availableQueryDataset)?.fields.map(field => <MenuItem key={field} value={field}>{field}</MenuItem>)}
                            </Select>
                          </FormControl>
                        </div>
                      </TabPanel>
                    </TabPanel>
                    <TabPanel value={this.state.form.valueType} index={1}>
                      <Tabs
                        value={this.state.form.defaultSecondValueType}
                        onChange={(e, newValue) => this.tabsHandleChange('defaultSecondValueType', newValue)}
                        indicatorColor="primary"
                        textColor="primary"
                      >
                        <Tab label="None" />
                        <Tab label="Specify" />
                        <Tab label="Query value" />
                      </Tabs>
                      <TabPanel value={this.state.form.defaultSecondValueType} index={0}>
                        Item One
                      </TabPanel>
                      <TabPanel value={this.state.form.defaultSecondValueType} index={1}>
                        Item Two
                      </TabPanel>
                      <TabPanel value={this.state.form.defaultSecondValueType} index={2}>
                        Item Three
                      </TabPanel>
                    </TabPanel>
                  </Fragment>
                )
              }
              return null;
            })
          }
        </form>
        <div className={classes.buttonsWrapper}>
          <Button onClick={() => this.props.save(this.state.form, this.state.mode)} disabled={!this.state.isFormValid} variant="contained" color="primary">
            Save
          </Button>
          <Button onClick={this.props.cancel}>Cancel</Button>
        </div>
      </Fragment>
    )
  }
}

Form.propTypes = {
  formFields: PropTypes.array.isRequired,
  dataSets: PropTypes.array,
  formData: PropTypes.object,
  save: PropTypes.func.isRequired,
  valueChanged: PropTypes.func,
  cancel: PropTypes.func.isRequired
};
