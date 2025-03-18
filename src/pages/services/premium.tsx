import * as React from 'react';
import { useEffect } from 'react';

import { GridColDef, GridToolbar } from '@mui/x-data-grid';
import { DataGridPremium } from '@mui/x-data-grid-premium';

import Button from '~/components/atoms/Button';
import { useStore } from '~/shares/stores';
import { IOlympicData } from '~/types';

const COLUMNS: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 200, groupable: false },

  { field: 'athlete', headerName: 'Athlete', width: 200, groupable: false },
  { field: 'country', headerName: 'Country', width: 200, groupable: false },
  { field: 'age', headerName: 'Age', width: 200, groupable: false },
  { field: 'year', headerName: 'Year', width: 200, groupable: true },
  { field: 'date', headerName: 'date', width: 200, groupable: false },
  { field: 'gold', headerName: 'gold', width: 200, groupable: false },
  { field: 'silver', headerName: 'silver', width: 200, groupable: false },
  { field: 'total', headerName: 'Total', width: 200, groupable: false }
];

export default function Premium() {
  const [rowSelection, setRowSelection] = React.useState(false);
  const {
    MockData: { list }
  } = useStore();
  const [data, setData] = React.useState<IOlympicData[]>([]);
  useEffect(() => {
    setData(list.map((item, index) => ({ ...item, id: `${index}-hihi` })));
  }, [list]);
  return (
    <div>
      <Button onClick={() => setRowSelection(!rowSelection)}>Toggle row selection</Button>

      <div style={{ height: 600, width: '100%' }}>
        <DataGridPremium
          rows={data}
          columns={COLUMNS}
          disableColumnFilter
          headerFilters
          rowSelection={rowSelection}
          checkboxSelection={rowSelection}
          slots={{
            headerFilterMenu: null,
            toolbar: GridToolbar
          }}
          slotProps={{
            headerFilterCell: {
              InputComponentProps: { label: '' }
            },
            toolbar: {
              showQuickFilter: true,
              printOptions: {
                disableToolbarButton: false
              },
              csvOptions: {
                disableToolbarButton: false
              },
              excelOptions: {
                disableToolbarButton: false
              }
            }
          }}
        />
      </div>
    </div>
  );
}
