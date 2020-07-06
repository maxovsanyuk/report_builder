import React, { Component, Fragment } from "react";
import Form from "../../Form/Form";
import cloneDeep from "lodash/cloneDeep";

import classes from "./SidebarParameters.module.scss";
import SidebarParametersList from "./SidebarParametersList/SidebarParametersList";
import { AnimatedComponent } from "../../views/AnimatedComponent";

export default class SidebarParameters extends Component {
  state = {
    formFields: [
      {
        name: "id",
        type: "text",
        label: "Id",
        defaultValue: null,
        hidden: true,
      },
      {
        name: "name",
        type: "text",
        label: "Name",
        defaultValue: "ReportParameter1",
        validation: [
          {
            name: "required",
          },
          {
            name: "minLength",
            value: 2,
          },
        ],
      },
      {
        name: "prompt",
        type: "text",
        label: "Prompt",
        defaultValue: "ReportParameter1",
        validation: [
          {
            name: "maxLength",
            value: 16,
          },
        ],
      },
      {
        name: "date",
        type: "dateTime",
        label: "Date",
      },
      {
        name: "dataType",
        type: "optionSet",
        label: "Data Type",
        options: [
          {
            value: "string",
            label: "String",
          },
          {
            value: "boolean",
            label: "Boolean",
          },
          {
            value: "dateTime",
            label: "DateTime",
          },
          {
            value: "integer",
            label: "Integer",
          },
          {
            value: "float",
            label: "Float",
          },
        ],
        defaultValue: { value: "string", label: "String" },
        validation: [
          {
            name: "required",
          },
        ],
      },
      {
        name: "isAllowBlankValue",
        label: 'Allow blank value("")',
        type: "checkbox",
        checked: false,
      },
      {
        name: "isAllowNullValue",
        label: "Allow null value",
        type: "checkbox",
        checked: false,
      },
      {
        name: "isAllowMultipleValues",
        label: "Allow multiple values",
        type: "checkbox",
        checked: false,
      },
      {
        name: "visibility",
        type: "optionSet",
        label: "Visibility",
        options: [
          {
            value: "visible",
            label: "Visible",
          },
          {
            value: "hidden",
            label: "Hidden",
          },
          {
            value: "internal",
            label: "Internal",
          },
        ],
        defaultValue: { value: "visible", label: "Visible" },
      },
      {
        name: "parameterAssignValues",
        type: "additionalSection",
      },
    ],
    formData: null,
    isForm: false,
  };

  submitParameter = (parameter, mode) => {
    const parameters = cloneDeep(this.props.parameters);
    switch (mode) {
      case "save":
        parameters.push({ ...parameter });
        break;
      case "edit":
        let editParameterIndex = parameters.findIndex(
          (param) => param.id === parameter.id
        );
        parameters.splice(editParameterIndex, 1, parameter);
        break;
      default:
        break;
    }

    this.props.setReportParameters(parameters);
    this.setState({ isForm: false, formData: null });
  };
  formCancel = () => {
    this.setState({ isForm: false });
  };
  newParameter = () => {
    const newFormFields = this.state.formFields.filter(
      (field) => field.name !== "id"
    );
    newFormFields.push({
      name: "id",
      type: "text",
      label: "Id",
      defaultValue: new Date().getTime(),
      hidden: true,
    });
    this.setState({
      formFields: newFormFields,
      formData: null,
      isForm: true,
    });
  };
  editParameter = (parameterId) => {
    const parameters = cloneDeep(this.props.parameters);
    const paramToEdit = parameters.find((param) => param.id === parameterId);
    this.setState({ formData: paramToEdit, isForm: true });
  };
  deleteParameter = (parameterId) => {
    const parameters = cloneDeep(this.props.parameters).filter(
      (parameter) => parameter.id !== parameterId
    );
    this.props.setReportParameters(parameters);
  };

  render() {
    return (
      <AnimatedComponent>
        <h2>Parameters</h2>
        {this.state.isForm ? (
          <Form
            formData={this.state.formData}
            formFields={this.state.formFields}
            save={this.submitParameter}
            dataSets={this.props.dataSets}
            cancel={this.formCancel}
          />
        ) : (
          <SidebarParametersList
            onDeleteParameter={this.deleteParameter}
            onEditParameter={this.editParameter}
            parameters={this.props.parameters}
            paramName={"New parameter"}
            onNewParameter={this.newParameter}
          />
        )}
      </AnimatedComponent>
    );
  }
}
