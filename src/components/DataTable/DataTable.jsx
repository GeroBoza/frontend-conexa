import { React, useState } from "react";
import { DataGrid, esES } from "@mui/x-data-grid";
import "./dataTable.scss";

const DataTable = (props) => {
    const {
        rows,
        columns,
        height = 400,
        rowCount = 0,
        onPageChange,
        openLoader,
        getRowId,
        filter = "",
        extraFilter = "",
    } = props;

    const [pageState, setPageState] = useState(1);

    return (
        // <div style={{ height, width: "100%" }}>
        <DataGrid
            getRowId={getRowId}
            autoPageSize
            autoHeight
            rows={rows || []}
            rowCount={rowCount}
            loading={openLoader}
            pagination
            page={pageState - 1}
            paginationMode="server"
            onPaginationModelChange={(newPage) => {
                setPageState(() => newPage.page + 1);
                onPageChange(newPage.page + 1);
            }}
            columns={columns}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            experimentalFeatures={{
                lazyLoading: true,
            }}
        />
        // </div>
    );
};
export default DataTable;
