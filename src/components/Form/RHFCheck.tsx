import styled from "styled-components";
import { Control, Controller, FieldValues } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

type IRHFCheck = {
  name: string;
  label?: string | undefined;
  defaultValue?: boolean;
  control: Control<FieldValues, object>;
  list?: any[];
  disabled?: boolean;
  loading?: boolean;
  rules?: any;
  className?: string;
  onChange?: (data: boolean) => void;
};

const Wrapper = styled.div`
  .MuiOutlinedInput-root {
    width: 100%;
  }
`;

const RHFCheck = (props: IRHFCheck) => {
  return (
    <Wrapper>
      <Controller
        name={props.name}
        control={props.control}
        defaultValue={props.defaultValue}
        rules={props.rules}
        render={({ field }) => {
          let value = field.value as boolean ?? props.defaultValue ?? false;
          return (
            <FormControlLabel
              label={props.label}
              control={
                <Checkbox
                {...field}
                  checked={value as boolean}
                  onChange={(e, data) => {
                    field.onChange(data);
                    if (props.onChange) {
                      props.onChange(data);
                    }
                  }}
                  disabled={props.disabled}
                />
              }
            />
          );
        }}
      />
      {props.loading ? (
        <CircularProgress
          size={24}
          sx={{
            color: "#fff",
          }}
        />
      ) : (
        <>
          {" "}
          {props.list && props.list.length > 0 && (
            <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
              {props.list}
            </Box>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default RHFCheck;
