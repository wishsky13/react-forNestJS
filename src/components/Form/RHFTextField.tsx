/* eslint-disable no-control-regex */
import styled from "styled-components";
import { Control, Controller, FieldValues } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { fontCount, getTextLimit } from "../../utilities/global";
import { Colors, Styles } from "../../themes";

type IRHFTextField = {
  name: string;
  label?: string | undefined;
  control: Control<FieldValues, object>;
  placeholder?: string;
  defaultValue?: string;
  rules?: any;
  autoFocus?: boolean;
  disabled?: boolean;
  limit?: number;
  suggested?: number;
  multiline?: boolean;
  rows?: number;
  minRows?: number;
  type?: string;
  setError?: () => void;
  clearErrors?: () => void;
  inputProps?: any;
  className?: string;
  minNumber?: number;
  maxNumber?: number;
  error?: boolean;
  onBlur?: any;
  index?: number;
};

const Wrapper = styled(Styles.MainWrapper())`
  width: 100%;
  .MuiFormControl-root {
    width: 100%;
    max-width: 1024px;
  }
  .MuiFormHelperText-root span {
    margin: 0;
    display: inline;
  }
  .normal {
    color: ${Colors.Dark_Green};
  }
  .suggested {
    color: ${Colors.Dark_Yellow};
  }
  .limit {
    color: ${Colors.Red};
  }
  textarea {
    padding: 0 !important;
  }
  .error .MuiOutlinedInput-notchedOutline {
  }
`;

const RHFTextField = (props: IRHFTextField) => {
  const status = (value: number) => {
    var length = value;
    if (props.suggested && props.limit) {
      if (length <= props.suggested) {
        return "normal";
      } else if (length > props.suggested && length < props.limit) {
        return "suggested";
      } else if (length >= props.limit) {
        return "limit";
      }
    }
  };

  return (
    <Wrapper>
      <Controller
        name={props.name}
        control={props.control}
        rules={props.rules}
        defaultValue={props.defaultValue}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          if (props.suggested && props.limit) {
            if (Math.round(fontCount(value) / 2) > props.limit) {
              if (!error && props.setError) {
                props.setError();
              }
            } else {
              if (error?.message && props.clearErrors) {
                props.clearErrors();
              }
            }
          }
          return (
            <TextField
              autoFocus={props.autoFocus}
              onChange={onChange}
              error={
                props.error
                  ? true
                  : props.limit && value
                  ? Math.round(fontCount(value) / 2) > props.limit
                  : false
              }
              inputProps={{
                maxLength: props.limit
                  ? getTextLimit(props.limit, value)
                  : undefined,
                type: props.type,
                min: props.minNumber,
                max: props.maxNumber,
              }}
              helperText={
                props.limit ? (
                  <>
                    {value ? (
                      <span>
                        <span
                          className={status(Math.round(fontCount(value) / 2))}
                        >
                          {Math.round(fontCount(value) / 2)}
                        </span>
                        /{props.limit}
                      </span>
                    ) : (
                      `0/${props.limit}`
                    )}
                  </>
                ) : null
              }
              value={value ?? props.defaultValue ?? ""}
              label={props.label}
              placeholder={props.placeholder}
              disabled={props.disabled}
              multiline={props.multiline}
              rows={props.rows}
              minRows={props.minRows}
              className={`${props.className} ${props.error && "error"}`}
              onBlur={(e) => {
                if (props.onBlur) {
                  props.onBlur(e.target.value, props.index ?? 0);
                  
                }
              }}
            />
          );
        }}
      />
    </Wrapper>
  );
};

export default RHFTextField;
