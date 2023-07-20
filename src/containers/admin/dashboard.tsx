/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState, useRef, useMemo } from "react";
import styled from "styled-components";
import { useNavigate, Link, NavigateFunction } from "react-router-dom";
import { Stack, Button, Pagination } from "@mui/material";
import { Table, TextButton } from "../../components";
import { UserContext } from "../../provider/user";
import { IMember, IPage } from "../../types";
import { GridValueGetterParams } from "@mui/x-data-grid";
import { dateProcessor } from "../../utilities/date";
import { changeRole } from "../../utilities/global";
import { ApiWithAuth } from "../../service/api";
import { IParamMemberList } from "../../types/api";
import { Fonts, Colors } from "../../themes";

const columns = (navigate: NavigateFunction) => {
  return [
    {
      field: "account",
      headerName: "帳號",
      flex: 1,
      renderCell: (params: { row: { account: string } }) => {
        return (
          <TextButton
            text={params.row.account}
            onClick={() => {
              navigate(`/member/${params.row.account}`);
            }}
          />
        );
      },
    },
    { field: "username", headerName: "用戶名稱", flex: 1 },
    {
      field: "role",
      headerName: "角色",
      flex: 1,
      renderCell: (params: GridValueGetterParams) => {
        const content =
          params.row?.role.length > 0
            ? params.row.role
                .map((i: number) => {
                  return changeRole(i);
                })
                .join("、")
            : "-";
        return (
          <div
            className="br ellipsis"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        );
      },
    },
    {
      field: "created_at",
      headerName: "註冊時間",
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.created_at ? dateProcessor(params.row.created_at) : "-",
    },
  ];
};

const Wrapper = styled(Stack)`
  width: 100%;
`;

const Title = styled(Fonts.h3())`
  &:hover {
    cursor: pointer;
  }
  padding-bottom: 16px;
`;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { token, UserData } = useContext(UserContext);

  const [memberList, setMemberList] = useState<IMember[]>();
  const [page, setPage] = useState<IPage>();

  const [isLoading, setIsLoading] = useState(true);

  const getMemberList = async (param: IParamMemberList) => {
    if (token) {
      setIsLoading(true);
      try {
        const res: any = await ApiWithAuth(token).getMemberList(param);
        switch (res.status) {
          case 200:
          case 201:
            setIsLoading(false);
            setMemberList(res?.data?.members);
            setPage(res?.data?.page);
            break;
          default:
            alert(res?.data?.message);
            break;
        }
        return true;
      } catch (err) {
        console.log(err);
        alert("列表請求失敗，請稍後再次嘗試！");
      }
    }
  };

  // * 控制頁數
  function pagination(page: number) {
    setPage((prevState) =>
      prevState
        ? {
            ...prevState,
            current: page,
          }
        : undefined
    );
    setIsLoading(true);
    getMemberList({ size: 5, current: page });
  }

  useEffect(() => {
    if (UserData) {
      switch (UserData["role"][0]) {
        case 1:
          getMemberList({ size: 5, current: 1 });
          break;
        case 2:
          alert("很抱歉，您沒有權限進入此頁！");
          navigate("/employee/dashboard");
          break;
        default:
          alert("很抱歉，您沒有權限進入此頁！");
          navigate("/dashboard");
      }
    }
  }, [UserData]);

  return (
    <Wrapper justifyContent="center">
      <Title>用戶列表</Title>
      <Table
        key={`${page?.current}-${memberList && isLoading}`}
        rows={memberList ?? []}
        columns={columns(navigate)}
        rowHeightAuto
        pageSize={10}
        loading={isLoading}
      />
      {page && (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          py={2}
        >
          <Pagination
            color="primary"
            count={page.count}
            page={page.current}
            onChange={(event, value) => {
              pagination(value);
            }}
          />
        </Stack>
      )}
    </Wrapper>
  );
};

export default AdminDashboard;
