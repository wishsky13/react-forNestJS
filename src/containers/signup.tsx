import { useEffect, useState } from "react";
import styled from "styled-components";
import { Typography, TextField, Button, Stack, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ApiNoAuth } from "../service/api";
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
  const [checkPassword, setCheckPassword] = useState("");
  const [username, setUsername] = useState("");
  var key = "mollymoooo";

  const handleSubmit = async () => {
    try {
      var passwordEncrypted = CryptoJS.AES.encrypt(password, key);
      const res: any = await ApiNoAuth.signUp({
        account: account,
        password: `${passwordEncrypted}`,
        username: username,
      });
      switch (res.status) {
        case 200:
        case 201:
          navigate("/login");
          break;
        default: {
          alert(res.data.message);
          break;
        }
      }
    } catch (err) {
      console.log(err);
      alert('很抱歉，註冊請求失敗，請稍後重新嘗試！');
    }
  };

  useEffect(() => {
    setCheckPassword("");
  }, [password]);

  return (
    <Wrapper alignItems="center" justifyContent="center">
      <LoginArea spacing={2} justifyContent="center">
        <Title variant="h5">註冊</Title>
        <InputField
          label="帳號"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />
        <InputField
          label="暱稱"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          label="密碼"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {password && (
          <InputField
            label="確認密碼"
            type="password"
            value={checkPassword}
            onChange={(e) => setCheckPassword(e.target.value)}
          />
        )}
        <Text>
          已經擁有帳號了？ <Link href="/login">立即登入</Link>
        </Text>
        <Button
          variant="contained"
          color="primary"
          disabled={
            !account || !password || !username || password !== checkPassword
          }
          onClick={handleSubmit}
        >
          註冊
        </Button>
      </LoginArea>
    </Wrapper>
  );
};

export default LoginScreen;
