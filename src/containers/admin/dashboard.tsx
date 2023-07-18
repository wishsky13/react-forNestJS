/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState, useRef, useMemo } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { Stack, Box, Tabs, Tab, Card, Button } from "@mui/material";
import { UserContext } from "../../provider/user";

const Wrapper = styled.div``;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { token, UserData } = useContext(UserContext);

  useEffect(() => {
    if (UserData) {
      switch (UserData['role'][0]) {
        case 1:
          break;
        case 2:
          alert('很抱歉，您沒有權限進入此頁！');
          navigate("/employee/dashboard");
          break;
        default:
          alert('很抱歉，您沒有權限進入此頁！');
          navigate("/dashboard");
      }
    }
  }, [UserData]);

  return <Wrapper>準備來編輯權限了嗎？</Wrapper>;
};

export default AdminDashboard;
