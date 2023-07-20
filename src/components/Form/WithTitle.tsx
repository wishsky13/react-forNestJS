import styled from "styled-components";
import { Colors, Fonts, Styles } from "../../themes";

type IWithTitle = {
  title: string;
  children: React.ReactNode;
};

const Wrapper = styled(Styles.MainWrapper())`
  padding-bottom: 12px;
  div {
    outline: 0 !important;
  }
  .MuiFormHelperText-root {
    text-align: right;
  }
`;
const Title = styled(Fonts.h6())`
  .required {
    color: ${Colors.Required};
  }
`;

const WithTitle = (props: IWithTitle) => {
  return (
    <Wrapper>
      <Title>
        {props.title.includes("*") ? (
          <>
            {props.title.split("*")[0]}
            <span className="required">*</span>
          </>
        ) : (
          props.title
        )}
      </Title>
      {props.children}
    </Wrapper>
  );
};

export default WithTitle;
