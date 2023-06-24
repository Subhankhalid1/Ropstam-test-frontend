import { FC } from 'react';
import DataTable from 'react-data-table-component';

interface DataTablesProps {
  rows: any[];
  columns: any[];
}

const DataTableComp: FC<DataTablesProps> = ({ rows, columns }) => {
  const paginationComponentOptions = {
    rowsPerPageText: 'Items per page',
    rangeSeparatorText: 'to',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'All',
  };

  const paginationOptions = {
    rowsPerPage: 5, // Set the number of rows per page
    rowsPerPageOptions: [5, 10, 20, 50], // Set available rows per page options
  };

  return (
    <DataTable
      columns={columns}
      data={rows}
      pagination
      paginationComponentOptions={paginationComponentOptions}
      paginationPerPage={paginationOptions.rowsPerPage} // Limit rows per page
      paginationRowsPerPageOptions={paginationOptions.rowsPerPageOptions} // Set available rows per page options
    />
  );
};

const DataTableWrapper: FC<DataTablesProps> = ({ rows, columns }) => {
  return (
    <div className='DataTable'>
      <div className='w-12/12 border rounded mt-8 m-auto'>
        <DataTableComp rows={rows} columns={columns} />
      </div>
    </div>
  );
};

export default DataTableWrapper;
