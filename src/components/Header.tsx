import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Colors, Fonts } from "../themes";
import { useContext } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { UserContext } from "../provider/user";
import React from "react";

type IHeader = {
  id: string;
  name: string;
  logout: () => void;
  isLogouting?: boolean;
};

const Wrapper = styled.div`
  background: ${Colors.HeaderBackground};
  border-bottom: 1px solid ${Colors.W50};
  position: fixed;
  width: 100%;
  height: 70px;
  z-index: 100;
`;

const Title = styled(Fonts.h1())`
  color: ${Colors.W100};
  &:hover {
    cursor: pointer;
  }
`;

const Name = styled(Fonts.h5())`
  color: ${Colors.W100};
`;

const Header = (props: IHeader) => {
  const navigate = useNavigate();
  const { UserData } = useContext(UserContext);

  const handleNavigation = () => {
    if (UserData) {
      switch (UserData["role"][0]) {
        case 1:
          navigate("/admin/dashboard");
          break;
        case 2:
          navigate("/employee/dashboard");
          break;
        default:
          navigate("/dashboard");
      }
    }
  };

  return (
    <Stack
      component={Wrapper}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      px={2}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
      >
        <Title onClick={() => handleNavigation()}>Meow v1.0.0</Title>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
      >
        {props.name && (
          <>
            <Avatar
              sx={{ width: 28, height: 28, bgcolor: Colors.Green }}
              alt={props.name}
            >
              {props.name.slice(0, 1)}
            </Avatar>
            <Link to={`/member/${props.id}`}><Name>{props.name}</Name></Link>
            <Button
              variant="contained"
              size="small"
              color="error"
              onClick={() => {
                props.logout();
              }}
            >
              {props.isLogouting ? (
                <CircularProgress
                  size={24}
                  sx={{
                    color: "#fff",
                  }}
                />
              ) : (
                "登出"
              )}
            </Button>
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default Header;
