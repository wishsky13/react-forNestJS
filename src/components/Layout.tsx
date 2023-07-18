/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useMemo } from "react";
import styled from "styled-components";
import { Header, Progress } from "../components";
import Container from "@mui/material/Container";
import { UserContext } from "../provider/user";
import { useLocation, useNavigate } from "react-router-dom";

type ILayout = {
  className?: string;
  children: React.ReactNode;
};

const Wrapper = styled.div`
  .MuiContainer-root {
    padding-left: 0;
    padding-right: 0;
  }
`;

const Content = styled.div`
  position: relative;
  top: 70px;
  width: calc(100% - 150px);
  padding: 16px;
  &.full {
    top: inherit;
    left: inherit;
    width: inherit;
  }
`;

const Layout = (props: ILayout) => {
  const { children } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const nowCategory = pathname.replace("/portal", "").split("/")[1];
  const { getToken, UserData, logout, isLogouting } = useContext(UserContext);

  const canShow = true;

  useEffect(() => {
    if (!pathname.includes("login") && !pathname.includes("signup")) {
      getToken();
    }
  }, []);

  return (
    <Wrapper>
      <Container maxWidth={false}>
        {!pathname.includes("login") && !pathname.includes("signup") ? (
          <>
            <Header
              name={UserData ? UserData["username"] : ""}
              id={UserData ? UserData["account"] : ""}
              logout={logout}
              isLogouting={isLogouting}
            />
            {/* <SideMenu list={pageList} /> */}
            {isLogouting ? (
              <Content>
                <Progress />
              </Content>
            ) : (
              <>
                {canShow || nowCategory === "pure-view" ? (
                  <Content>{children}</Content>
                ) : (
                  <Content>尚無權限，待管理員通過</Content>
                )}
              </>
            )}
          </>
        ) : (
          <Content className="full">{children}</Content>
        )}
      </Container>
    </Wrapper>
  );
};

export default Layout;
