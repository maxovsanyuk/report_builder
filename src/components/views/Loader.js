import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

const LoaderCont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 500;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
`;

const Loader = () => {
  const state = useSelector((state) => state.app);
  const { isLoading } = state;

  return (
    isLoading && (
      <LoaderCont>
        <CircularProgress />
      </LoaderCont>
    )
  );
};

export default Loader;
