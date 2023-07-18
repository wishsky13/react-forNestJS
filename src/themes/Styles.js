import { Fonts, Metrics, Colors } from ".";
import styled from "styled-components";

const Styles = {
  Title: () => styled(Fonts.h2())`
    max-width: 60%;
  `,
  SubTitle: () => styled(Fonts.h3())`
    padding-bottom: 12px;
  `,
  FormTitle: () => styled(Fonts.h5())`
    .required {
      color: ${Colors.Required};
    }
  `,
  FormText: () => styled(Fonts.p16())`
    &.no-wrap {
      white-space: nowrap;
    }
  `,
  FormSubTitle: () => styled(Fonts.h6())`
    padding-top: 12px;
  `,
  Info: () => styled(Fonts.info())`
    color: ${Colors.B50};
  `,
  DetailContent: () => styled.div`
    padding: 16px 20px 0;
    background: ${Colors.G1};
    border-radius: 8px;
  `,
  DetailTitle: () => styled(Fonts.h5())`
    position: relative;
    padding-left: 16px;
    &:before {
      content: " ";
      position: absolute;
      left: 4px;
      width: 4px;
      height: 100%;
      border-radius: 8px;
      background: ${Colors.Green}
    }
  `,
  EditContent: () => styled.form`
    padding: 16px 20px 0;
    background: ${Colors.G1};
    border-radius: 8px;
  `,
  MainWrapper: () => styled.div`
    .MuiSelect-select,
    .MuiOutlinedInput-input,
    .MuiInputBase-multiline {
      padding: 9px 16px;
    }
    .MuiOutlinedInput-input {
      padding: 9px 0px 9px 16px;
      font-size: 14px;
    }
  `,
  Content: () => styled.div`
    padding: 16px 20px 0;
  `,
  InputMemberContent: () => styled.div`
    max-width: min-width;
    margin: 16px 16px 0 0;
    .member-list {
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
      max-height: 166px;
      overflow-y: scroll;
    }
  `,
  Images: {
    AutoWidthImg: () => styled.div`
      img,
      svg {
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      img {
        width: auto;
        height: 100%;
      }
    `,
    AutoHeightImg: () => styled.div`
      img {
        width: 100%;
        height: auto;
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    `,
  },
};
export default Styles;
