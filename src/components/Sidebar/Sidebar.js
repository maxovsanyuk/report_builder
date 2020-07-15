import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showAlert, sideBarHandleOpen } from "../../redux/actions/app_action";

import { DefineIconComp, DefineActiveComp } from "./views/index";
import IconButton from "@material-ui/core/IconButton";

import styled from "styled-components";
import theme from "../../themes/index";

const SideBarActiveComp = styled.div`
  height: calc(100% - 60px);
  min-width: 700px;
  max-width: 800px;
  position: fixed;
  top: 60px;
  padding: 20px;
  z-index: 80;
  background: ${({ theme }) => theme?.primary?.dark};
  animation: appearingBar 0.4s ease-in-out 0s 1 normal forwards;
  border-left: ${({ theme }) => `1px solid ${theme?.border?.color}`};

  @keyframes appearingBar {
    0% {
      right: -500px;
    }
    100% {
      right: 60px;
    }
  }
`;

const SidebarComp = styled.div`
  display: flex;
  height: calc(100vh - 60px);
  flex-direction: column;
  padding: 5px;
  z-index: 90;
  position: fixed;
  right: 0;
  top: 60px;
  background: ${({ theme }) => theme?.primary?.bg};
  border-left: ${({ theme }) => `1px solid ${theme?.border?.color}`};
`;

const sideBarBtns = [
  {
    name: "properties",
  },
  {
    name: "data",
  },
  {
    name: "parameters",
  },
  {
    name: "image",
  },
];

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("");
  const state = useSelector((state) => state.app);
  const {
    isOpenSideBar,
    isSavedNewDataSetData,
    isSavedNewParametersData,
  } = state;
  const dispatch = useDispatch();

  return (
    <>
      <SidebarComp theme={theme}>
        {sideBarBtns.map(({ name }) => {
          return (
            <div
              key={name}
              onClick={() => {
                !isSavedNewDataSetData || !isSavedNewParametersData
                  ? dispatch(showAlert(true))
                  : dispatch(
                      sideBarHandleOpen(
                        name === activeTab ? !isOpenSideBar : true
                      )
                    );
                isSavedNewDataSetData &&
                  isSavedNewParametersData &&
                  setActiveTab(name);
              }}
            >
              <IconButton
                style={{
                  margin: "5px 0",
                  background:
                    name === activeTab && isOpenSideBar && "rgba(0, 0, 0, 0.2)",
                }}
                key={name}
              >
                <DefineIconComp name={name} />
              </IconButton>
            </div>
          );
        })}
      </SidebarComp>

      {isOpenSideBar && (
        <SideBarActiveComp theme={theme}>
          <DefineActiveComp name={activeTab} />
        </SideBarActiveComp>
      )}
    </>
  );
};

export default Sidebar;
