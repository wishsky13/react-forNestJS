import styled from "styled-components";
import { Control, Controller, FieldValues } from "react-hook-form";
import ListItemText from "@mui/material/ListItemText";
import { Select, MenuItem, Checkbox } from "@mui/material";
import { Colors } from "../../themes";

type IRHFChip = {
  name: string;
  label?: string | undefined;
  placeholder?: string;
  defaultValue?: string[];
  control: Control<FieldValues, object>;
  list: { id: string | number; label: string }[];
  disabled?: boolean;
  rules?: any;
  className?: string;
};

const ITEM_HEIGHT = 36;
const ITEM_PADDING_TOP = 4;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const Wrapper = styled.div`
  .MuiOutlinedInput-root {
    width: 100%;
    max-height: 38px;
  }
  legend {
    display: none;
  }
  .MuiOutlinedInput-notchedOutline {
    top: 0;
  }
  .MuiOutlinedInput-input {
    padding: 9px 0px 9px 16px !important;
    font-size: 14px !important;
  }
`;

const RHFChip = (props: IRHFChip) => {
  const labelProcessor = (value: string[]) => {
    return value
      .map((item: string) => {
        return props.list.find((i) => i.id === item)?.label;
      })
      .join(", ");
  };
  return (
    <Wrapper>
      <Controller
        name={props.name}
        control={props.control}
        defaultValue={props.defaultValue}
        rules={props.rules}
        render={({ field }) => {
          let value = field.value ?? props.defaultValue ?? [];
          return (
            <Select
              {...field}
              style={{
                color: field.value ? Colors.B100 : Colors.G3,
              }}
              multiple
              MenuProps={MenuProps}
              label={props.label}
              value={value}
              disabled={props.disabled}
              displayEmpty={true}
              className={props.className}
              renderValue={(selected) =>
                selected.length ? labelProcessor(selected) : props.placeholder
              }
            >
              {props.list.map((i: { id: string | number; label: string }) => (
                <MenuItem key={i.id} value={i.id}>
                  <Checkbox checked={value.includes(i.id)} />
                  <ListItemText primary={i.label} />
                </MenuItem>
              ))}
            </Select>
          );
        }}
      />
    </Wrapper>
  );
};

export default RHFChip;
