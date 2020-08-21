import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSettings } from "../../../../redux/actions/app_action";

import styled from "styled-components";

// MATERIAL UI

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Paper from "@material-ui/core/Paper";

import MenuItem from "@material-ui/core/MenuItem";

// LODASH

import get from "lodash/get";
import range from "lodash/range";

const SettingsBox = styled.div`
  width: calc(100% - 20px);
  margin: 10px 0 0 0;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 10px;
`;

const categories = [
  { name: "Administrative Reports", type: "administrativeReports" },
  { name: "Marketing Reports", type: "marketingReports" },
  { name: "Sales Reports", type: "salesReports" },
  { name: "Service Reports", type: "serviceReports" },
];

const displayIn = [
  {
    name: "Forms for related record types",
    type: "formsForRelatedRecordTypes",
  },
  { name: "Lists for related record typ", type: "listsForRelatedRecordTypes" },
  { name: "Reports area", type: "reportsArea" },
];

const Dynamics365Settings = () => {
  const [currentState, setCurrentState] = useState({});

  const state = useSelector((state) => state.app);
  const { settings } = state;
  const dispatch = useDispatch();

  return (
    <SettingsBox>
      <Paper>
        <div style={{ display: "flex", flexWrap: "wrap", padding: "15px" }}>
          <FormControl>
            <InputLabel htmlFor="categories-label">Categories</InputLabel>

            <Select
              name="Categories"
              value={
                get(currentState, "categories") ||
                get(settings, "dynamics365Settings.categories")
              }
              onChange={(e) => {
                setCurrentState({
                  ...currentState,
                  categories: e.target.value,
                });

                dispatch(
                  setSettings({
                    ...settings,
                    dynamics365Settings: {
                      ...settings?.dynamics365Settings,
                      categories: e.target.value,
                    },
                  })
                );
              }}
              style={{
                width: "100px",
                maxWidth: "100px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              required
              inputProps={{
                id: "categories-label",
              }}
            >
              {categories.map(({ name, type }) => {
                return (
                  <MenuItem key={type} value={type}>
                    {name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <FormControl style={{ margin: "0 0 0 20px" }}>
            <InputLabel htmlFor="relatedRecordTypes-label">
              Related Record Types
            </InputLabel>

            <Select
              name="Categories"
              value={
                get(currentState, "relatedRecordTypes") ||
                get(settings, "dynamics365Settings.relatedRecordTypes")
              }
              onChange={(e) => {
                setCurrentState({
                  ...currentState,
                  relatedRecordTypes: e.target.value,
                });

                dispatch(
                  setSettings({
                    ...settings,
                    dynamics365Settings: {
                      ...settings?.dynamics365Settings,
                      relatedRecordTypes: e.target.value,
                    },
                  })
                );
              }}
              style={{
                width: "180px",
                maxWidth: "180px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              required
              inputProps={{
                id: "relatedRecordTypes-label",
              }}
            >
              {range(1, 6, 1).map((i) => {
                return (
                  <MenuItem key={i} value={i}>
                    {i} item
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <FormControl style={{ margin: "0 0 0 20px" }}>
            <InputLabel htmlFor="displayIn-label">Display in</InputLabel>

            <Select
              name="DisplayIn"
              value={
                get(currentState, "displayIn") ||
                get(settings, "dynamics365Settings.displayIn")
              }
              onChange={(e) => {
                setCurrentState({
                  ...currentState,
                  displayIn: e.target.value,
                });

                dispatch(
                  setSettings({
                    ...settings,
                    dynamics365Settings: {
                      ...settings?.dynamics365Settings,
                      displayIn: e.target.value,
                    },
                  })
                );
              }}
              style={{
                width: "140px",
                maxWidth: "140px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              required
              inputProps={{
                id: "displayIn-label",
              }}
            >
              {displayIn.map(({ name, type }) => {
                return (
                  <MenuItem key={type} value={type}>
                    {name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <FormControl style={{ margin: "0 0 0 20px" }}>
            <InputLabel htmlFor="languages-label">Languages</InputLabel>

            <Select
              name="Languages"
              value={
                get(currentState, "languages") ||
                get(settings, "dynamics365Settings.languages")
              }
              onChange={(e) => {
                setCurrentState({
                  ...currentState,
                  languages: e.target.value,
                });

                dispatch(
                  setSettings({
                    ...settings,
                    dynamics365Settings: {
                      ...settings?.dynamics365Settings,
                      languages: e.target.value,
                    },
                  })
                );
              }}
              style={{
                width: "140px",
                maxWidth: "140px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              required
              inputProps={{
                id: "languages-label",
              }}
            >
              {["All languages", "EN", "PL", "DA", "RU", "IT", "UK"].map(
                (l) => {
                  return (
                    <MenuItem key={l} value={l}>
                      {l}
                    </MenuItem>
                  );
                }
              )}
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="viewableBy-label">Viewable By</InputLabel>

            <Select
              name="viewableBy"
              value={
                get(currentState, "viewableBy") ||
                get(settings, "dynamics365Settings.viewableBy")
              }
              onChange={(e) => {
                setCurrentState({
                  ...currentState,
                  viewableBy: e.target.value,
                });

                dispatch(
                  setSettings({
                    ...settings,
                    dynamics365Settings: {
                      ...settings?.dynamics365Settings,
                      viewableBy: e.target.value,
                    },
                  })
                );
              }}
              style={{
                width: "140px",
                maxWidth: "140px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              required
              inputProps={{
                id: "viewableBy-label",
              }}
            >
              {["Organization", "Individual"].map((l) => {
                return (
                  <MenuItem key={l} value={l}>
                    {l}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      </Paper>
    </SettingsBox>
  );
};

export default Dynamics365Settings;
