import styled from "styled-components";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { ReactNode } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";

type ICheck = {
  id: string;
  name: string;
  title: ReactNode;
  defaultValue?: any;
  list: {
    option: {
      value: string;
      label: string;
    };
    content?: ReactNode;
  }[];
  placeholder?: string;
  hint?: string;
  disabled?: boolean;
  control: Control<FieldValues, object>;
  required?: boolean;
  rules?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Wrapper = styled.div`
  max-width: min-width;
  padding-bottom: 16px;
`;

const OptionArea = styled.div`
  // padding-left: 28px;
  h5 {
    padding-top: 12px;
    padding-bottom: 8px;
  }
`;

const ContentArea = styled.div`
  padding-left: 32px;
`;

const CheckBtnGroup = (props: ICheck) => {
  return (
    <Wrapper>
      <FormLabel id={props.id}>{props.title}</FormLabel>
      <FormGroup>
        {props.list.map((i) => (
          <OptionArea key={i.option.value}>
            <Controller
              name={`${props.name}.${i.option.value}`}
              control={props.control}
              render={({ field }) => {
                let checkValue =
                  field.value ??
                  (props.defaultValue
                    ? props.defaultValue[i.option.value] && true
                    : false) ??
                  false;
                return (
                  <Stack direction="row" sx={{ alignItems: "start" }}>
                    <FormControlLabel
                      label={i.option.label}
                      control={
                        <Checkbox
                          {...field}
                          checked={checkValue}
                          onChange={field.onChange}
                        />
                      }
                    />
                    {checkValue && i.content && (
                      <ContentArea>{i.content}</ContentArea>
                    )}
                  </Stack>
                );
              }}
            />
          </OptionArea>
        ))}
      </FormGroup>
    </Wrapper>
  );
};

export default CheckBtnGroup;
