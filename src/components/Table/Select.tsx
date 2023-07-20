import styled from "styled-components";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Fonts, Styles } from "../../themes";
import { ISelectOption } from '../../types'

type ISelect = {
  title: string;
  list: ISelectOption[];
  value: string | number;
  onStatusChange: (e: any) => void;
};

const Wrapper = styled(Styles.MainWrapper())``;

const Title = styled(Fonts.h6())``;

const SelectArea = (props: ISelect) => {
  return (
    <Wrapper>
      <Title>{props.title}</Title>
      <FormControl>
        <Select value={props.value} onChange={props.onStatusChange}>
          {props.list.map((i) => (
            <MenuItem key={i.id} value={i.id}>{i.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Wrapper>
  );
};

export default SelectArea;
