/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState, useRef, useMemo } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { Stack, Box, Tabs, Tab, Card, Button } from "@mui/material";
import React from "react";

const Wrapper = styled.div`
  .MuiTabs-scrollButtons.Mui-disabled {
    opacity: 0.3;
  }
  .MuiTabScrollButton-root,
  .MuiTabs-scroller {
    max-height: 40px;
  }
  .MuiTab-root {
    min-height: inherit;
    min-width: 50px;
  }
  .MuiTab-iconWrapper {
    width: 12px;
    height: 12px;
    position: absolute;
    right: 4px;
    top: 0px;
  }
`;

const Overview = () => {
  const navigate = useNavigate();
  //   const { token, UserData } = useContext(UserContext);

  return <Wrapper></Wrapper>;
};

export default Overview;
