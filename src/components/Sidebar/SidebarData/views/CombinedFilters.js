import React from "react";

import FilterCombinedComponent from "./FilterCombinedComponent";
import styled from "styled-components";

const CombinedFilter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  b {
    text-transform: uppercase;
    padding: 10px;
    border: 1px dashed #ccc;
    border-radius: 5px;
    background: lightblue;
    color: slategray;
  }

  .combined-filters-box {
    display: flex;
    flex: 1;
    flex-direction: column;
    margin: 0 10px 0 20px;
  }
`;

const CombinedFilters = ({
  entitiState,
  setFilterState,
  setIsFullEntitie,
  isFullEntitie,
  filterState,
  setEntitiState,
  filterData,
  register,
  control,
}) => {
  return (
    <CombinedFilter>
      <b>{filterState?.selectedlogicalOperator}</b>

      <div className="combined-filters-box">
        {filterState?.items?.map((i) => {
          if (i.selectedlogicalOperator) {
            return (
              <CombinedFilters
                key={i.filterId}
                entitiState={entitiState}
                setFilterState={setFilterState}
                setIsFullEntitie={setIsFullEntitie}
                filterState={i}
                setEntitiState={setEntitiState}
                register={register}
                control={control}
                filterId={i.filterId}
                filterData={filterData}
              />
            );
          }

          return (
            <FilterCombinedComponent
              key={i.filterId}
              filterState={i}
              entitiState={entitiState}
              setFilterState={setFilterState}
              setEntitiState={setEntitiState}
              setIsFullEntitie={setIsFullEntitie}
              isFullEntitie={isFullEntitie}
              register={register}
              control={control}
              filterId={filterState.filterId}
              filterData={filterData}
            />
          );
        })}
      </div>
    </CombinedFilter>
  );
};
export default CombinedFilters;
