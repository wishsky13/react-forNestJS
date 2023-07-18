/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState, useRef, useMemo } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { Stack, Box, Tabs, Tab, Card, Button } from "@mui/material";
import React from "react";

const Wrapper = styled.div``;

const Dashboard = () => {
  const navigate = useNavigate();
  //   const { token, UserData } = useContext(UserContext);

  return <Wrapper>歡迎光臨，抱歉這邊什麼都還沒有喔！</Wrapper>;
};

export default Dashboard;
