import styled from "styled-components";
import { Fonts, Styles } from "../../themes";
import { ISelectOption } from "../../types";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Stack, Select, TextField, MenuItem } from "@mui/material";

type IDateFilter = {
  title: string;
  list: ISelectOption[];
  selectValue: string;
  onSelectChange: (e: any) => void;
  startDate: Date | null;
  onStartDateChange: (e: any) => void;
  endDate: Date | null;
  onEndDateChange: (e: any) => void;
};

const Wrapper = styled(Styles.MainWrapper())`
  .MuiSvgIcon-root {
    width: 22px; 
    height: 22px;
  }

  div {
    outline: 0 !important;
    margin-right: 4px;
  }
  .date-picker {
    max-width: fit-content;
  }
`;
const Title = styled(Fonts.h6())``;

const Apostrophe = styled(Fonts.h5())`
  padding: 0 8px 0 0;
`;

const DateFilter = (props: IDateFilter) => {
  return (
    <Wrapper>
      <Title>{props.title}</Title>
      <Stack direction="row" justifyContent="start" alignItems="center">
        <Select value={props.selectValue} onChange={props.onSelectChange}>
          {props.list.map((i) => (
            <MenuItem key={i.id} value={i.id}>{i.label}</MenuItem>
          ))}
        </Select>
        <DesktopDatePicker
          className="date-picker"
          inputFormat="yyyy/MM/dd"
          // disableFuture
          value={props.startDate}
          onChange={props.onStartDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <Apostrophe>～</Apostrophe>
        <DesktopDatePicker
          className="date-picker"
          inputFormat="yyyy/MM/dd"
          minDate={props.startDate}
          // disableFuture
          value={props.endDate}
          onChange={props.onEndDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </Wrapper>
  );
};

export default DateFilter;
