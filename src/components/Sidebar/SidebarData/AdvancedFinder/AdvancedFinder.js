import React, {Component, Fragment} from 'react';

import {getEntitiesAsync} from '../../../../services/get-entities';
import {getFieldsAsync} from '../../../../services/get-fields';
import cloneDeep from 'lodash/cloneDeep';
import Entity from './Entity/Entity';
import {fieldTypes} from './fieldTypes';
import classes from './AdvancedFinder.module.scss';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Form from '../../../Form/Form';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';


export default class AdvancedFinder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      entities: [
        {
          id: 0,
          value: {value: '', label: ''},
          options: [],
          filtersOptions: [],
          filters: [],
          showLogicalOperators: false
        }
      ],
      openChooseFieldsDialog: false,
      chooseFieldsEntityId: null,
      dialogFormFields: [],
      name: 'NewDataSet',
      id: new Date().getTime(),
      mode: 'save',
      errors: {},
      valid: false
    };

    if (props.dataSet) {
      this.state = {
        ...cloneDeep(this.state),
        entities: props.dataSet.entities,
        name: props.dataSet.name,
        id: props.dataSet.id,
        mode: 'edit'
      };
    }
  }

  loadEntityOptions = async (id) =>  {
    try {
      this.props.setLoading(true);
      const data = await getEntitiesAsync();
      this.props.setLoading(false);
      const options = data.items.map(item => {
        return {
          value: item.logicalName,
          label: item.label
        };
      });

      const newEntities = cloneDeep(this.state.entities);
      newEntities.find(entity => entity.id === id).options = options;

      this.setState({entities: newEntities});
    } catch (error) {
      console.log("error", error);
    }
  };

  loadEntityFiltersOptions = async (entityName) => {
    this.props.setLoading(true);
    const data = await getFieldsAsync(entityName);
    this.props.setLoading(false);

    return data.items;
  };

  // componentDidMount() {
  //   this.state.entities.forEach(entity => {
  //     this.loadEntityOptions(entity.id);
  //   });
  //   this.validate();
  // }

  validate = () => {
    let errors = {...this.state.errors};

    const isNameAlreadyExist = this.props.dataSets.filter(dataSet => dataSet.id !== this.state.id).some(dataSet => dataSet.name === this.state.name);
    const isEmptyName = !this.state.name;
    errors = {...errors, name: isEmptyName ? 'Name is required' : isNameAlreadyExist ? 'Name already exists' : ''};

    const isEmptyEntityValue = this.state.entities.some(entity => !entity.value.value);
    errors = {...errors, entity: isEmptyEntityValue ? 'empty' : ''};

    const isEmptyFilter = this.state.entities.some(entity => !this.findAllFilters(entity).every(filter => {
      const value = typeof filter.value === 'object' && filter.value !== null ? filter.value.value : filter.value;
      return filter.field.value && filter.operator.value && value;
    }));
    errors = {...errors, filter: isEmptyFilter ? 'empty' : ''};

    const isValid = Object.values(errors).every(value => !value);
    this.setState({errors, valid: isValid});
  };

  entityChanged = async (value, entityId) => {
    const newEntities = cloneDeep(this.state.entities);
    const entity = newEntities.find(entity => entity.id === entityId);
    entity.value = entity.options.find(option => option.value === value);
    entity.filtersOptions = await this.loadEntityFiltersOptions(entity.value.value);
    entity.filters = [];
    this.setState({entities: newEntities}, () => {
      this.validate();
    });
  };

  filterChanged = async (value, entityId, filterId, name) => {
    const newEntities = cloneDeep(this.state.entities);
    const entity = newEntities.find(entity => entity.id === entityId);
    let filter = this.findAllFilters(entity).find(filter => filter.id === filterId);

    switch (name) {
      case 'field':
        const filtersOption = entity.filtersOptions.find(option => option.value === value);
        if (filtersOption && filtersOption.type === 'field') {
          filter.field = filtersOption;
          const fieldType = fieldTypes.find(item => item.type === filter.field.valueType);
          filter.operator = {value: '', label: ''};
          filter.value = fieldType.valueField.type === 'optionSet' ? {value: '', label: ''} : '';
          filter.operators = fieldType.operatorsField;
          filter.valueField = fieldType.valueField;
        }
        if (filtersOption && filtersOption.type === 'related') {
          entity.filters = entity.filters.filter(filter => filter.id !== filterId);
          const options = [];
          entity.filtersOptions.forEach(option => {
            if (option.type === 'related') {
              options.push({value: option.value, label: option.label});
            }
          });

          newEntities.push(
            {
              id: new Date().getTime(),
              value: {value: filtersOption.value, label: filtersOption.label},
              options,
              filtersOptions: await this.loadEntityFiltersOptions(filtersOption.value),
              filters: [],
              showLogicalOperators: false
            }
          );
        }
        break;
      case 'operator':
        filter.operator = filter.operators.find(operator => operator.value === value);
        break;
      case 'value':
        filter.value = filter.valueField.type === 'optionSet' ? filter.valueField.options.find(option => option.value === value) : value;
        break;
      case 'checkbox':
        filter = entity.filters.find(filter => filter.id === filterId);
        filter.checked = value;
        const checkedFilters = this.findCheckedFilters(entity);
        entity.showLogicalOperators = checkedFilters.length === 2;
        break;
      default:
        break;
    }

    this.setState({entities: newEntities}, () => {
      this.validate();
    });
  };

  findCheckedFilters = (entity) => {
    const checkedFilters = [];
    const find = (filters) => {
      filters.forEach(filter => {
        if (filter.logicalType) {
          find(filter.items);
        }
        if (filter.checked) {
          checkedFilters.push(filter);
        }
      });
    };
    find(entity.filters);
    return checkedFilters;
  };

  findAllFilters = (entity) => {
    const allFilters = [];
    const find = (filters) => {
      filters.forEach(filter => {
        if (filter.logicalType) {
          find(filter.items);
        } else {
          allFilters.push(filter);
        }
      });
    };
    find(entity.filters);

    return allFilters;
  };

  combineFilters = (entityId, logicalType) => {
    const newEntities = cloneDeep(this.state.entities);
    const entity = newEntities.find(entity => entity.id === entityId);
    const checkedFilters = this.findCheckedFilters(entity);
    checkedFilters.forEach(filter => {filter.checked = false});
    const firstCheckedFilterIndex = entity.filters.findIndex(filter => filter.id === checkedFilters[0].id);
    const combinedFilter = {
      id: new Date().getTime(),
      logicalType: logicalType,
      items: [...checkedFilters],
      checked: false
    };
    entity.filters.splice(firstCheckedFilterIndex, 1, combinedFilter);
    entity.filters = entity.filters.filter(filter => filter.id !== checkedFilters[1].id);
    entity.showLogicalOperators = false;

    this.setState({entities: newEntities});
  };

  deleteFilter = (entityId, filterId) => {
    const newEntities = cloneDeep(this.state.entities);
    const entity = newEntities.find(entity => entity.id === entityId);
    entity.filters = entity.filters.filter(filter => filter.id !== filterId);

    this.setState({entities: newEntities}, () => {
      this.validate();
    });
  };

  addFilter = (entityId) => {
    const newEntities = cloneDeep(this.state.entities);
    const entity = newEntities.find(entity => entity.id === entityId);
    entity.filters.push({
      id: new Date().getTime(),
      field: {value: '', label: '', type: ''},
      operators: [],
      operator: {value: '', label: ''},
      valueField: {},
      value: '',
      checked: false
    });

    this.setState({entities: newEntities}, () => {
      this.validate();
    });
  };

  closeChooseFieldsDialog = () => {
    this.setState({openChooseFieldsDialog: false});
  };
  saveChooseFieldsDialog = (form, mode) => {
    const newEntities = cloneDeep(this.state.entities);
    const entity = newEntities.find(entity => entity.id === this.state.chooseFieldsEntityId);

    for (let key in form) {
      if (form.hasOwnProperty(key)) {
        entity.filtersOptions.find(option => option.value === key).chosen = form[key];
      }
    }

    this.setState({entities: newEntities, openChooseFieldsDialog: false});
  };
  openChooseFieldsDialog = (entityId) => {
    const newEntities = cloneDeep(this.state.entities);
    const entity = newEntities.find(entity => entity.id === entityId);
    const formFields = entity.filtersOptions.filter(option => option.type === 'field').map(option => {
      return {
        name: option.value,
        label: option.label,
        type: 'checkbox',
        checked: option.chosen
      }
    });
    this.setState({
      openChooseFieldsDialog: true,
      dialogFormFields: formFields,
      chooseFieldsEntityId: entityId
    });
  };

  buildFetch = () => {
    const newEntities = cloneDeep(this.state.entities);
    const fetch = {
      'fetch': {
        'entity': {
          '@name': newEntities[0].value.value,
        }
      }
    };

    // adding 'attribute'

    const attributes = newEntities[0].filtersOptions.filter(option => option.type === 'field' && option.chosen);
    if (attributes.length && attributes.length > 1) {
      fetch['fetch']['entity']['attribute'] = attributes.map(attribute => {
        return {
          '@name': attribute.value
        }
      })
    }
    if (attributes.length && attributes.length === 1) {
      fetch['fetch']['entity']['attribute'] = {
          '@name': attributes[0].value
      };
    }
    if (!attributes.length) {
      fetch['fetch']['entity']['all-attributes'] = null;
    }

    // adding 'filter'

    const parseFilters = (filters) => {
      let result = filters.length > 1 ? [] : {};
      filters.forEach(filter => {
        if (filter.logicalType) {
          const newElement = {
            '@type': filter.logicalType
          };
          const conditionElements = filter.items.filter(item => !item.logicalType);
          const conditionQuantity = conditionElements.length;
          if (conditionQuantity && conditionQuantity > 1) {
            newElement['condition'] = conditionElements.map(item => {
              return {
                '@attribute': item.field.value,
                '@operator': item.operator.value,
                '@value': typeof item.value === 'object' && item.value !== null ? item.value.value : item.value
              }
            });
          }
          if (conditionQuantity && conditionQuantity === 1) {
            newElement['condition'] = {
              '@attribute': conditionElements[0].field.value,
              '@operator': conditionElements[0].operator.value,
              '@value': typeof conditionElements[0].value === 'object' && conditionElements[0].value !== null ? conditionElements[0].value.value : conditionElements[0].value
            }
          }

          const filterElements = filter.items.filter(item => item.logicalType);
          const filterQuantity = filterElements.length;
          if (filterQuantity) {
            newElement['filter'] = parseFilters(filterElements);
          }

          if (filters.length > 1) {
            result.push(newElement);
          } else {
            result = newElement;
          }
        } else {
          if (filters.length > 1) {
            result.push({
              '@type': 'and',
              'condition': {
                '@attribute': filter.field.value,
                '@operator': filter.operator.value,
                '@value': typeof filter.value === 'object' && filter.value !== null ? filter.value.value : filter.value
              }
            });
          } else {
            result = {
              '@type': 'and',
              'condition': {
                '@attribute': filter.field.value,
                '@operator': filter.operator.value,
                '@value': typeof filter.value === 'object' && filter.value !== null ? filter.value.value : filter.value
              }
            };
          }
        }
      });

      return result;
    };

    const filters = newEntities[0].filters;
    if (filters.length) {
      fetch['fetch']['entity']['filter'] = parseFilters(filters);
    }

    this.props.save(fetch, newEntities, this.state.name, this.state.id, this.state.mode);
  };

  fieldChanged = (event) => {
    const errors = {...this.state.errors, name: false};
    this.setState({name: event.target.value, errors}, () => {
      this.validate();
    });
  };


  render() {
    return (
      <Fragment>
        {/*<FormControl className={classes.formControl}>*/}
        {/*  <TextField*/}
        {/*    name="Name"*/}
        {/*    error={!!this.state.errors.name}*/}
        {/*    helperText={this.state.errors.name}*/}
        {/*    onChange={(event) => this.fieldChanged(event)}*/}
        {/*    label="Name"*/}
        {/*    value={this.state.name}*/}
        {/*  />*/}
        {/*</FormControl>*/}
        {this.state.entities.map((entity) => (
          <Entity
            key={entity.id}
            combineFilters={this.combineFilters}
            entityChanged={this.entityChanged}
            filterChanged={this.filterChanged}
            openChooseFieldsDialog={this.openChooseFieldsDialog}
            add={this.addFilter}
            delete={this.deleteFilter}
            entity={entity}
          />
        ))}
        {/*<div className={classes.buttonsWrapper}>*/}
        {/*  <Button*/}
        {/*    onClick={this.buildFetch}*/}
        {/*    disabled={!this.state.valid}*/}
        {/*    variant="contained"*/}
        {/*    color="primary"*/}
        {/*  >*/}
        {/*    Save*/}
        {/*  </Button>*/}
        {/*  <Button onClick={this.props.cancel}>Cancel</Button>*/}
        {/*</div>*/}
        {/*<Dialog*/}
        {/*  open={this.state.openChooseFieldsDialog}*/}
        {/*  onClose={this.closeChooseFieldsDialog}*/}
        {/*  scroll={"body"}*/}
        {/*>*/}
        {/*  <DialogTitle id="form-dialog-title">Choose fields</DialogTitle>*/}
        {/*  <DialogContent>*/}
        {/*    <Form*/}
        {/*      formData={null}*/}
        {/*      formFields={this.state.dialogFormFields}*/}
        {/*      save={this.saveChooseFieldsDialog}*/}
        {/*      cancel={this.closeChooseFieldsDialog}*/}
        {/*    />*/}
        {/*  </DialogContent>*/}
        {/*</Dialog>*/}
      </Fragment>
    );
  }
}
