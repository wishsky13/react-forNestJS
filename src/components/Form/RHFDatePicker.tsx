import styled from "styled-components";
import { Control, Controller, FieldValues } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Styles } from "../../themes";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

type IDatePicker = {
  name: string;
  control: Control<FieldValues, object>;
  defaultValue?: string | Date;
  rules?: any;
  autoFocus?: boolean;
  disabled?: boolean;
  maxDate?: any;
  minDate?: any;

  disablePast?: boolean;
};

const Wrapper = styled(Styles.MainWrapper())`
  .MuiFormControl-root {
    width: 100%;
  }
`;

const RHFDatePicker = (props: IDatePicker) => {
  let defaultValue = props.defaultValue ? props.defaultValue : null;
  return (
    <Wrapper>
      <Controller
        name={props.name}
        control={props.control}
        rules={props.rules}
        defaultValue={props.defaultValue}
        render={({ field: { onChange, value } }) => {
          // value && (defaultValue = value);
          return (
            <DesktopDatePicker
              className="date-picker"
              inputFormat="yyyy/MM/dd"
              value={value ? value : defaultValue}
              onChange={onChange}
              disabled={props.disabled}
              disablePast={props.disablePast}
              maxDate={props.maxDate}
              minDate={props.minDate}
              renderInput={(params) => <TextField {...params} />}
            />
          );
        }}
      />
    </Wrapper>
  );
};

export default RHFDatePicker;
