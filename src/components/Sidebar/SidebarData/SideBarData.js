import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setDataSets } from "../../../redux/actions/app_action";
import NewDataSetList from "./NewDataSetList/NewDataSetList";
import { AnimatedComponent } from "../../views/AnimatedComponent";
import EntityRow from "./views/EntitiRow";

import styled from "styled-components";

// MATERIAL UI

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

// LODASH

import isEmpty from "lodash/isEmpty";

const DataSetListCont = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  flex: 1;
  margin: 0 10px 20px 15px;
  font-size: 20px;
  padding: 10px;
  box-shadow: 0 3px 3px -2px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  transition: 0.3s;
  background: #fff;
  &:hover {
    cursor: pointer;
    box-shadow: 0 3px 3px -2px rgba(0, 0, 0, 0.2),
      0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12);
    transition: 0.3s;
  }
`;

const SideBarData = () => {
  const [editDataSetId, setEditDataSetId] = useState(null);
  const state = useSelector((state) => state.app);
  const { dataSets, newDataSet } = state;

  console.log(dataSets, "dataSets");
  console.log(newDataSet, "newDataSet");

  const dispatch = useDispatch();

  return (
    <AnimatedComponent>
      <h2 style={{ textAlign: "center" }}>
        {!isEmpty(dataSets) ? "Data sets list" : "Create first DataSet"}
      </h2>

      <>
        <div style={{ maxHeight: "70vh", overflow: "auto" }}>
          {!isEmpty(dataSets) &&
            dataSets.map((d, i) => {
              if (editDataSetId === d.id) {
                return (
                  <NewDataSetList
                    key={d.id}
                    editedDataSet={d}
                    isHiddenControlBtn
                    setEditDataSetId={setEditDataSetId}
                  />
                );
              }

              return (
                !editDataSetId && (
                  <DataSetListCont key={d.id}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span style={{ margin: "0 0 5px 0", fontWeight: 600 }}>
                        {d.dataSetName}
                      </span>

                      {d?.entities?.map((e) => {
                        return <EntityRow key={e.id} entiti={e} />;
                      })}
                    </div>
                    <div>
                      <IconButton
                        component="span"
                        onClick={() => {
                          setEditDataSetId(d.id);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          dispatch(
                            setDataSets(
                              dataSets?.filter((dataSet) => dataSet.id !== d.id)
                            )
                          );
                        }}
                        component="span"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </DataSetListCont>
                )
              );
            })}
        </div>
        {!editDataSetId && <NewDataSetList />}
      </>
    </AnimatedComponent>
  );
};

export default SideBarData;




// buildFetch = () => {
//     const newEntities = cloneDeep(this.state.entities);
//     const fetch = {
//         'fetch': {
//             'entity': {
//                 '@name': newEntities[0].value.value,
//             }
//         }
//     };
//
//     // adding 'attribute'
//
//     const attributes = newEntities[0].filtersOptions.filter(option => option.type === 'field' && option.chosen);
//     if (attributes.length && attributes.length > 1) {
//         fetch['fetch']['entity']['attribute'] = attributes.map(attribute => {
//             return {
//                 '@name': attribute.value
//             }
//         })
//     }
//     if (attributes.length && attributes.length === 1) {
//         fetch['fetch']['entity']['attribute'] = {
//             '@name': attributes[0].value
//         };
//     }
//     if (!attributes.length) {
//         fetch['fetch']['entity']['all-attributes'] = null;
//     }
//
//     // adding 'filter'
//
//     const parseFilters = (filters) => {
//         let result = filters.length > 1 ? [] : {};
//         filters.forEach(filter => {
//             if (filter.logicalType) {
//                 const newElement = {
//                     '@type': filter.logicalType
//                 };
//                 const conditionElements = filter.items.filter(item => !item.logicalType);
//                 const conditionQuantity = conditionElements.length;
//                 if (conditionQuantity && conditionQuantity > 1) {
//                     newElement['condition'] = conditionElements.map(item => {
//                         return {
//                             '@attribute': item.field.value,
//                             '@operator': item.operator.value,
//                             '@value': typeof item.value === 'object' && item.value !== null ? item.value.value : item.value
//                         }
//                     });
//                 }
//                 if (conditionQuantity && conditionQuantity === 1) {
//                     newElement['condition'] = {
//                         '@attribute': conditionElements[0].field.value,
//                         '@operator': conditionElements[0].operator.value,
//                         '@value': typeof conditionElements[0].value === 'object' && conditionElements[0].value !== null ? conditionElements[0].value.value : conditionElements[0].value
//                     }
//                 }
//
//                 const filterElements = filter.items.filter(item => item.logicalType);
//                 const filterQuantity = filterElements.length;
//                 if (filterQuantity) {
//                     newElement['filter'] = parseFilters(filterElements);
//                 }
//
//                 if (filters.length > 1) {
//                     result.push(newElement);
//                 } else {
//                     result = newElement;
//                 }
//             } else {
//                 if (filters.length > 1) {
//                     result.push({
//                         '@type': 'and',
//                         'condition': {
//                             '@attribute': filter.field.value,
//                             '@operator': filter.operator.value,
//                             '@value': typeof filter.value === 'object' && filter.value !== null ? filter.value.value : filter.value
//                         }
//                     });
//                 } else {
//                     result = {
//                         '@type': 'and',
//                         'condition': {
//                             '@attribute': filter.field.value,
//                             '@operator': filter.operator.value,
//                             '@value': typeof filter.value === 'object' && filter.value !== null ? filter.value.value : filter.value
//                         }
//                     };
//                 }
//             }
//         });
//
//         return result;
//     };
//
//     const filters = newEntities[0].filters;
//     if (filters.length) {
//         fetch['fetch']['entity']['filter'] = parseFilters(filters);
//     }