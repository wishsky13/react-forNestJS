import styled from "styled-components";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { ReactNode } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";

type IRadio = {
  id: string;
  name: string;
  title: ReactNode;
  defaultValue?: string | number;
  list: {
    option: {
      value: string | number;
      label: string;
      disabled?: boolean;
    };
    content: ReactNode;
  }[];
  placeholder?: string;
  hint?: string;
  disabled?: boolean;
  control: Control<FieldValues, object>;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rules: any;
  className?: string;
};

const Wrapper = styled.div`
  max-width: min-width;
  span {
    white-space: nowrap;
  }
`;

const OptionArea = styled.div`
  padding-left: 28px;
  h5 {
    padding-top: 12px;
    padding-bottom: 8px;
  }
`;

const ContentArea = styled.div`
  padding-left: 32px;
`;

const RadioBtnGroup = (props: IRadio) => {
  return (
    <Wrapper>
      <FormLabel id={props.id}>{props.title}</FormLabel>
      <Controller
        control={props.control}
        name={props.name}
        defaultValue={props.defaultValue}
        rules={props.rules}
        render={({ field: { onChange, value } }) => {
          let radioValue = value ?? props.defaultValue ?? "";
          return (
            <RadioGroup
              className={props.className}
              defaultValue={props.defaultValue}
              value={radioValue}
              onChange={onChange}
            >
              {props.list.map((i) => (
                <OptionArea key={i.option.value}>
                  <FormControlLabel
                    value={i.option.value}
                    control={<Radio />}
                    label={i.option.label}
                    disabled={i.option.disabled}
                  />
                  <ContentArea>
                    {radioValue === i.option.value && i.content}
                  </ContentArea>
                </OptionArea>
              ))}
            </RadioGroup>
          );
        }}
      />
    </Wrapper>
  );
};

export default RadioBtnGroup;
