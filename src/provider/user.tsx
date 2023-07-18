import React, { useState } from "react";
import Cookies from "universal-cookie";
import { ApiNoAuth, ApiWithAuth } from "../service/api";
import { IMe } from "../types";
// import { create } from "apisauce";
const cookies = new Cookies();

// const api = create({
//   baseURL: "https://am44test.firstbank.com.tw",
// });

export const UserContext = React.createContext({
  UserData: undefined,
  // checkUserData: (token: string) => {},
  logout: () => {},
  isLogouting: false,
  token: undefined,
  getToken: () => {},
});

const UserProvider = (props: any) => {
  const { children } = props;
  const [token, setToken] = useState<any>();

  const [UserData, setUserData] = useState<any>(undefined);
  const [isLogouting, setIsLogouting] = useState(false);

  // const checkUserData = (token: string) => {};

  // const getUserData = (token: string) => {};

  const getToken = () => {
    if (cookies.get("token")) {
      setToken(cookies.get("token"));
      getUserData(cookies.get("token"));
    }
  };

  const getUserData = (token?: string) => {
    ApiWithAuth(token ?? "")
      .getUserData()
      .then((res: any) => {
        switch (res.status) {
          case 200:
          case 202:
            setUserData(res.data);
            break;
          default:
            setToken(undefined);
            alert("取得使用者資料失敗！請重新登入");
            redirectToLogin();
            break;
        }
      })
      .catch((error: any) => {
        console.log(error);
        setToken(undefined);
        alert("取得使用者資料失敗！請重新登入");
        redirectToLogin();
      });
  };

  const redirectToLogin = () => {
    window.location.href = `${window.location.protocol}//${window.location.host}/login`;
  };

  const logout = () => {
    setIsLogouting(true);
    cookies.remove("token", {
      path: "/",
      sameSite: true,
    });
    setTimeout(() => {
      redirectToLogin();
    }, 500);
  };

  const defaultValue = {
    UserData,
    // checkUserData,
    logout,
    isLogouting,
    token,
    getToken,
  };

  return (
    <UserContext.Provider value={defaultValue}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
