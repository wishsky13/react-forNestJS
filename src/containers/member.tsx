/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState, useRef, useMemo } from "react";
import styled from "styled-components";
import { useNavigate, Link, useParams } from "react-router-dom";
import {
  Stack,
  Button,
  Grid,
  Divider,
  IconButton,
  CircularProgress,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import React from "react";
import {
  Progress,
  RHFChip,
  RHFSwitch,
  RHFTextField,
  Row,
  RowArbitrary,
} from "../components";
import { Styles } from "../themes";
import { IMember } from "../types";
import { ApiWithAuth } from "../service/api";
import { UserContext } from "../provider/user";
import { changeRole } from "../utilities/global";
import { dateProcessor } from "../utilities/date";
import levelList from "../constants/level.json";
import { useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
var CryptoJS = require("crypto-js");

const Wrapper = styled(Stack)`
  width: 100%;
`;

const Title = styled(Styles.Title())``;

const DetailContent = styled(Styles.DetailContent())``;

const Member = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const {
    handleSubmit,
    watch,
    formState: { isDirty, isValid, dirtyFields, errors },
    control,
    setError,
    clearErrors,
    reset,
    resetField,
  } = useForm({ mode: "onChange" });
  const changePassword = watch("changePassword");

  const { token, UserData } = useContext(UserContext);
  const [detail, setDetail] = useState<IMember>();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditRoleMode, setIsEditRoleMode] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  var key = "mollymoooo";

  const onSubmit = async (data: any) => {
    if (id && token) {
      if (data.password) {
        var passwordEncrypted = CryptoJS.AES.encrypt(data.password, key);
        data.password = `${passwordEncrypted}`;
      }
      try {
        setIsLoading(true);

        const res: any = isEditRoleMode
          ? await ApiWithAuth(token).editMemberRole(id, data)
          : await ApiWithAuth(token).editMember(id, {
              username: data.username,
              password: data.password,
            });
        switch (res.status) {
          case 200:
          case 201:
            setDetail(res?.data);
            if (isEditRoleMode) {
              reset({ role: res?.data?.role });
            } else {
              reset({ role: res?.data?.role, username: res.data.username });
            }
            setIsEditMode(false);
            setIsEditRoleMode(false);
            setIsLoading(false);
            enqueueSnackbar("設定成功！", {
              variant: "success",
            });

            break;
          default:
            enqueueSnackbar(res?.data?.message, {
              variant: "error",
            });
            setIsLoading(false);
            break;
        }
        return true;
      } catch (err) {
        console.log(err);
        enqueueSnackbar("儲存失敗，請稍後再次嘗試！", {
          variant: "error",
        });
        setIsLoading(false);
      }
    }
  };

  const getMember = async () => {
    if (id && token) {
      try {
        const res: any = await ApiWithAuth(token).getMember(id);
        switch (res.status) {
          case 200:
          case 201:
            setDetail(res?.data);
            reset({ role: res?.data?.role, username: res?.data?.username });
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

  const handleCancel = () => {
    setIsEditMode(false);
    reset();
  };

  useEffect(() => {
    getMember();
  }, [UserData]);

  useEffect(() => {
    if (!changePassword) {
      resetField("password");
    }
  }, [changePassword]);

  return (
    <Wrapper spacing={2}>
      {UserData && (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <IconButton
              color="primary"
              onClick={() => navigate(`/admin/dashboard`)}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            <Title>{detail?.username}</Title>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            {UserData["role"][0] === 1 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsEditRoleMode(true)}
              >
                編輯權限
              </Button>
            ) : null}
            {UserData["account"] === id ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsEditMode(true)}
              >
                編輯
              </Button>
            ) : null}
          </Stack>
        </Stack>
      )}
      <Divider />
      {!detail ? (
        <Progress />
      ) : (
        UserData && (
          <DetailContent>
            <Grid container spacing={1} justifyContent="center">
              <Row rowKey={"帳號"} rowValue={detail.account} />
              {isEditMode && UserData["account"] === id ? (
                <RowArbitrary rowKey={"暱稱"}>
                  <RHFTextField
                    className="textfield-m-max"
                    name="username"
                    control={control}
                    placeholder="輸入文字"
                    limit={20}
                    setError={() => {
                      setError(
                        "username",
                        {
                          type: "maxLength",
                        },
                        { shouldFocus: true }
                      );
                    }}
                    clearErrors={() => clearErrors("username")}
                  />
                </RowArbitrary>
              ) : (
                <Row rowKey={"暱稱"} rowValue={detail.username} />
              )}
              {isEditMode && UserData["account"] === id ? (
                <RowArbitrary rowKey={"密碼"}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <RHFSwitch name="changePassword" control={control} />
                    {changePassword && (
                      <RHFTextField
                        className="textfield-m"
                        name="password"
                        control={control}
                        placeholder="請輸入欲更改的密碼"
                        rules={{ required: true }}
                        disabled={!changePassword}
                      />
                    )}
                  </Stack>
                </RowArbitrary>
              ) : null}
              {isEditRoleMode && UserData["role"][0] === 1 ? (
                <RowArbitrary rowKey={"權限"}>
                  <RHFChip
                    name="role"
                    className="textfield-m"
                    control={control}
                    list={levelList.map((i) => {
                      return { id: i.id, label: i.label };
                    })}
                    label="請設定權限"
                    placeholder="請設定權限"
                    rules={{ required: isEditRoleMode }}
                  />
                </RowArbitrary>
              ) : (
                <Row
                  rowKey={"權限"}
                  rowValue={detail.role
                    .map((i: number) => {
                      return changeRole(i);
                    })
                    .join("、")}
                />
              )}
              <Row
                rowKey={"註冊日期"}
                rowValue={dateProcessor(detail.created_at) ?? "-"}
              />
            </Grid>
          </DetailContent>
        )
      )}
      {isEditMode || isEditRoleMode ? (
        <>
          <Divider />
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Button variant="outlined" onClick={() => handleCancel()}>
              取消
            </Button>
            <Button
              variant="contained"
              disabled={!isDirty || !isValid}
              onClick={() => {
                handleSubmit(onSubmit)();
              }}
            >
              {isLoading ? (
                <CircularProgress
                  size={24}
                  sx={{
                    color: "#fff",
                  }}
                />
              ) : (
                "儲存"
              )}
            </Button>
          </Stack>
        </>
      ) : null}
    </Wrapper>
  );
};

export default Member;
