/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState, useRef, useMemo } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { Stack, Box, Tabs, Tab, Card, Button } from "@mui/material";
import { UserContext } from "../../provider/user";

const Wrapper = styled.div``;

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const { token, UserData } = useContext(UserContext);

  useEffect(() => {
    if (UserData) {
      switch (UserData["role"][0]) {
        case 1:
        case 2:
          break;
        default:
          alert("很抱歉，您沒有權限進入此頁！");
          navigate("/dashboard");
      }
    }
  }, [UserData]);

  return <Wrapper>歡迎光臨，請問你今天打卡了嗎？</Wrapper>;
};

export default EmployeeDashboard;
