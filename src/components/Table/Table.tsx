import { DataGrid, GridRowParams, GridRowsProp } from "@mui/x-data-grid";
import styled from "styled-components";
import { Colors } from "../../themes";

type ITable = {
  key?: any;
  className?: string;
  rows: GridRowsProp;
  columns: any;
  pageSize: number;
  noPagination?: boolean;
  rowHeightAuto?: boolean;
  loading?: boolean;
  getRowClassName?: any;
  onRowClick?: (param: any) => void;
};

const Wrapper = styled.div`
  &.no-pagination .MuiDataGrid-footerContainer {
    /* Class generated from your code */
    display: none;
  }
  .override {
    transition: 0.2s;
    background: ${Colors.Light_Yellow};
    &:hover {
      background: #fce0b8 !important;
    }
  }
  .warning {
    transition: 0.2s;
    background: ${Colors.Light_Red};
    &:hover {
      background: #F2B3B1 !important;
    }
  }
  .MuiDataGrid-cell {
    min-height: 52px !important;
    padding-top: 8px !important;
    padding-bottom: 8px !important;
  }
`;

const Table = (props: ITable) => {
  return (
    <Wrapper className={props.className} key={props.key}>
      <DataGrid
        rows={props.rows}
        columns={props.columns}
        disableSelectionOnClick
        pagination
        pageSize={props.pageSize}
        rowsPerPageOptions={[props.pageSize]}
        autoHeight
        disableColumnFilter
        disableColumnMenu
        getRowHeight={props.rowHeightAuto ? () => "auto" : () => 52}
        getEstimatedRowHeight={() => 52}
        loading={props.loading}
        hideFooter
        disableVirtualization
        getRowClassName={props.getRowClassName}
        onRowClick={(params: GridRowParams, event) => {
          if (
            (event.target as HTMLElement).tagName.toLowerCase() !== "button" &&
            props.onRowClick
          ) {
            props.onRowClick(params);
          }
        }}
      />
    </Wrapper>
  );
};

export default Table;
