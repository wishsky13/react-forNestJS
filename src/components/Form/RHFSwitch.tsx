import styled from "styled-components";
import { Control, Controller, FieldValues } from "react-hook-form";
import Switch from "@mui/material/Switch";

type IRHFSwitch = {
  name: string;
  control: Control<FieldValues, object>;
  defaultChecked?: boolean;
  disabled?: boolean;
};

const Wrapper = styled.div`
  .MuiFormControl-root {
    width: 100%;
  }
`;

const RHFSwitch = (props: IRHFSwitch) => {
  return (
    <Wrapper>
      <Controller
        name={props.name}
        control={props.control}
        defaultValue={props.defaultChecked}
        render={({ field: { onChange, value } }) => {
          let checkValue = value ?? props.defaultChecked ?? false;
          return (
            <Switch
              value={checkValue}
              onChange={onChange}
              disabled={props.disabled}
              checked={checkValue}
            />
          );
        }}
      />
    </Wrapper>
  );
};

export default RHFSwitch;
