import styled from "styled-components";
import { Control, Controller, FieldValues } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";

type ITimePicker = {
  name: string;
  control: Control<FieldValues, object>;
  defaultValue?: string | null;
  rules?: any;
  autoFocus?: boolean;
  disabled?: boolean;
  maxDateTime?: any;
  minDateTime?: any;
  disablePast?: boolean;
  key?: any;
};

const Wrapper = styled.div`
  width: inherit;
  .MuiFormControl-root {
    max-width: 100% !important;
  }
`;

const RHFDateTimePicker = (props: ITimePicker) => {
  let defaultValue = props.defaultValue ? props.defaultValue : null;
  return (
    <Wrapper>
      <Controller
        name={props.name}
        control={props.control}
        rules={props.rules}
        defaultValue={props.defaultValue}
        render={({
          field: { onChange, value },
          fieldState: { invalid, error },
        }) => {
          value && (defaultValue = value);
          return (
            <DateTimePicker
              value={defaultValue ? defaultValue : value}
              onChange={(value: any) => {
                onChange(value);
              }}
              inputFormat="yyyy/LL/dd HH:mm"
              disabled={props.disabled}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={invalid || Boolean(error)}
                  helperText={error?.message}
                />
              )}
              minDateTime={props.minDateTime}
              maxDateTime={props.maxDateTime}
              disablePast={props.disablePast}
            />
          );
        }}
      />
    </Wrapper>
  );
};

export default RHFDateTimePicker;
