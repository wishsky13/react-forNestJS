import React, { useState } from "react";
import Cookies from "universal-cookie";
import styled from "styled-components";
import { Typography, TextField, Button, Stack, Link } from "@mui/material";
import { ApiNoAuth } from "../service/api";
import { useNavigate } from "react-router-dom";
const cookies = new Cookies();
var CryptoJS = require("crypto-js");

const Wrapper = styled(Stack)`
  height: 100vh;
`;

const LoginArea = styled(Stack)`
  max-width: 400px;
  width: 100%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 16px;
`;

const Title = styled(Typography)`
  text-align: center;
`;

const Text = styled(Typography)`
  text-align: center;
`;

const InputField = styled(TextField)``;

const LoginScreen = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  var key = "mollymoooo";

  const handleSubmit = async () => {
    try {
      var passwordEncrypted = CryptoJS.AES.encrypt(password, key);
      const res: any = await ApiNoAuth.askToken(
        account,
        `${passwordEncrypted}`
      );
      switch (res.status) {
        case 200:
        case 202:
          cookies.set("token", res?.data?.access_token, {
            path: "/",
            maxAge: res?.data?.expires_in,
            sameSite: true,
          });
          switch (res?.data.role[0]) {
            case 1:
              navigate("/admin/dashboard", { replace: true });
              break;
            case 2:
              navigate("/employee/dashboard", { replace: true });
              break;
            default:
              navigate("/dashboard", { replace: true });
              break;
          }
          break;
        default: {
          alert(res.data.message);
          break;
        }
      }
    } catch (err) {
      console.log(err);
      alert("登入請求失敗，請稍後再次嘗試！");
    }
  };

  return (
    <Wrapper alignItems="center" justifyContent="center">
      <LoginArea spacing={2} justifyContent="center">
        <Title variant="h5">登入</Title>
        <InputField
          label="帳號"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />
        <InputField
          label="密碼"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Text>
          還沒有帳號嗎？ <Link href="/signup">註冊帳號</Link>
        </Text>
        <Button
          variant="contained"
          color="primary"
          disabled={!account || !password}
          onClick={handleSubmit}
        >
          登入
        </Button>
      </LoginArea>
    </Wrapper>
  );
};

export default LoginScreen;
