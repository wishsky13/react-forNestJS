import styled from "styled-components";
import { Control, Controller, FieldValues } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Styles } from "../../themes";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";

type ITimePicker = {
  name: string;
  control: Control<FieldValues, object>;
  defaultValue?: string | Date;
  rules?: any;
  autoFocus?: boolean;
  disabled?: boolean;
  maxTime?: any;
  minTime?: any;
};

const Wrapper = styled(Styles.MainWrapper())`
  .MuiFormControl-root {
    width: 100%;
  }
`;

const RHFTimePicker = (props: ITimePicker) => {
  let defaultValue = props.defaultValue ? props.defaultValue : null;
  return (
    <Wrapper>
      <Controller
        name={props.name}
        control={props.control}
        rules={props.rules}
        defaultValue={props.defaultValue}
        render={({ field: { onChange, value } }) => {
          value && (defaultValue = value);
          return (
            <DesktopTimePicker
              inputFormat="HH:mm"
              value={defaultValue ? defaultValue : value}
              onChange={onChange}
              disabled={props.disabled}
              renderInput={(params) => <TextField {...params} />}
            />
          );
        }}
      />
    </Wrapper>
  );
};

export default RHFTimePicker;
