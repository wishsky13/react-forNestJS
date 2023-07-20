import styled from "styled-components";
import { Fonts, Styles } from "../../themes";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { ISelectOption } from "../../types";
import Stack from "@mui/material/Stack";

type IFilter = {
  title?: string;
  list: ISelectOption[];
  selectValue: string;
  onSelectChange: (e: any) => void;
  inputValue: string;
  onInputChange: (e: any) => void;
  valueOptions?: any;
  isNoSelect?: boolean;
  isNoTitle?: boolean;
  placeholder?: string;
};

const Wrapper = styled(Styles.MainWrapper())`
  div {
    outline: 0 !important;
    margin-right: 4px;
  }
`;
const Title = styled(Fonts.h6())``;

const Filter = (props: IFilter) => {
  return (
    <Wrapper>
      {!props.isNoTitle && <Title>{props.title}</Title>}
      <Stack direction="row" justifyContent="start" alignItems="center">
        {!props.isNoSelect && (
          <Select value={props.selectValue} onChange={props.onSelectChange}>
            {props.list.map((i) => (
              <MenuItem key={i.id} value={i.id}>
                {i.label}
              </MenuItem>
            ))}
          </Select>
        )}
        {props.valueOptions && props.valueOptions[props.selectValue] ? (
          <Select
            value={props.inputValue}
            onChange={props.onInputChange}
            displayEmpty
            renderValue={(selected) =>
              selected.length > 0
                ? props.valueOptions[props.selectValue]?.find(
                    (i: { id: string }) => i.id === selected
                  )?.label
                : "請選擇"
            }
          >
            {props.valueOptions[props.selectValue]?.map((i: any) => (
              <MenuItem key={i.id} value={i.id}>
                {i.label}
              </MenuItem>
            ))}
          </Select>
        ) : (
          <TextField
            variant="outlined"
            value={props.inputValue}
            onChange={props.onInputChange}
            placeholder={props.placeholder ?? "輸入文字"}
          />
        )}
      </Stack>
    </Wrapper>
  );
};

export default Filter;
