import styled from "styled-components";
import Grid from "@mui/material/Grid";
import { Colors } from "../../themes";

const GridItemTitle = styled(Grid)`
  padding-bottom: 16px;
  font-weight: 600;
  .required {
    color: ${Colors.Required};
  }

  p {
    padding-top: 3px;
    margin: 0;
  }
`;

const GridItem = styled(Grid)`
  padding-bottom: 16px;
  &.no-padding {
    padding-top: 0 !important;
  }
`;

const StaffRowArbitrary = (props: {
  className?: string;
  rowKey: string;
  children: any;
}) => {
  return (
    <>
      <GridItemTitle item xs={1.7}>
        <p>
          {props.rowKey.includes("*") ? (
            <>
              {props.rowKey.split("*")[0]}
              <span className="required">*</span>
            </>
          ) : (
            props.rowKey
          )}
        </p>
      </GridItemTitle>
      <GridItem container item xs={10.3} className={`wi ${props.className}`}>
        {props.children}
      </GridItem>
    </>
  );
};

export default StaffRowArbitrary;
