import styled from "styled-components";
import Grid from "@mui/material/Grid";

const GridItemTitle = styled(Grid)`
  padding-bottom: 16px;
  font-weight: 600;
  p {
    padding-top: 3px;
    margin: 0;
  }
`;
const GridItem = styled(Grid)`
  padding-bottom: 16px;
  line-height: 28px;
  word-wrap: break-word;
`;

const StaffRow = (props: {
  rowKey: string;
  rowValue: string;
  rowKeyRatio?: number;
  rowValueRatio?: number;
}) => {
  const { rowKey, rowValue, rowKeyRatio, rowValueRatio } = props;
  return (
    <>
      <GridItemTitle item xs={rowKeyRatio ? rowKeyRatio : 1.7}>
        <p>{rowKey}</p>
      </GridItemTitle>
      <GridItem item xs={rowValueRatio ? rowValueRatio : 10.3}>
        {rowValue}
      </GridItem>
    </>
  );
};
export default StaffRow;
