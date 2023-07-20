import styled from "styled-components";
import { Control, Controller, FieldValues } from "react-hook-form";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import { MenuItem, Stack } from "@mui/material";
import { Colors } from "../../themes";
import CircularProgress from "@mui/material/CircularProgress";

type IRHFSelect = {
  name: string;
  label?: string | undefined;
  placeholder?: string;
  defaultValue?: string;
  control: Control<FieldValues, object>;
  list: { id: string; label: string; disabled?: boolean }[];
  disabled?: boolean;
  loading?: boolean;
  onScrollToBottom?: () => void;
  rules?: any;
  className?: string;
  onChange?: any;
  index?: number;
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const Wrapper = styled.div`
  width: 100%;
  .MuiOutlinedInput-root {
    width: 100%;
  }
`;

const RHFSelect = (props: IRHFSelect) => {
  return (
    <Wrapper>
      <Controller
        name={props.name}
        control={props.control}
        defaultValue={props.defaultValue}
        rules={props.rules}
        render={({ field }) => {
          let value = field.value ?? props.defaultValue ?? "";
          return (
            <Select
              {...field}
              onChange={(e, data) => {
                field.onChange(e.target.value);
                if (props.onChange && props.index) {
                  props.onChange(e.target.value, props.index);
                } else if (props.onChange) {
                  props.onChange(e.target.value);
                }
              }}
              className={props.className}
              style={{
                color: field.value ? Colors.B100 : Colors.G3,
              }}
              label={props.label}
              value={value}
              disabled={props.disabled}
              displayEmpty={true}
              renderValue={(selected) =>
                selected
                  ? props.list?.find((i) => i.id === selected)?.label
                  : props.placeholder
              }
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                  },
                  // onScroll: (event) => {
                  //   const listEl = event.currentTarget;
                  //   if (
                  //     listEl.scrollTop + listEl.clientHeight >=
                  //     listEl.scrollHeight
                  //   ) {
                  //     if (props.onScrollToBottom) {
                  //       props.onScrollToBottom();
                  //     }
                  //   }
                  // },
                },
              }}
            >
              {props.list.map(
                (i: { id: string; label: string; disabled?: boolean }) => (
                  <MenuItem key={i.id} value={i.id} disabled={i.disabled}>
                    <ListItemText primary={i.label} />
                  </MenuItem>
                )
              )}
              {props.loading && (
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  py={1}
                >
                  <CircularProgress />
                </Stack>
              )}
            </Select>
          );
        }}
      />
    </Wrapper>
  );
};

export default RHFSelect;
