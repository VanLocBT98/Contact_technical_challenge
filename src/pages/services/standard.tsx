import { useCallback, useMemo, useRef, useState } from 'react';
import './index.scss';

import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

import Button from '~/components/atoms/Button';
import ForwardedAgGridComponent from '~/components/templates/AgGrid';
import { exportToPDF } from '~/components/templates/AgGrid/exportPdf';
import { useStore } from '~/shares/stores';
import { IOlympicData } from '~/types';

import { Pet } from '~sdk/api';
import { useOlympicData } from '~sdk/apis/pets';

export default function Standard() {
  const {
    MockData: { list, loading }
  } = useStore();
  const gridRef = useRef<AgGridReact<IOlympicData>>(null);
  const [editedRows, setEditedRows] = useState<Record<string, IOlympicData & { id: string }>>({});

  const rowDataWithId = useMemo(() => {
    return list.map((item, index) => ({
      ...item,
      id: `row-${index}`
    }));
  }, [list]);

  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '750px', width: '100%' }), []);
  const sportOptions = useMemo(() => {
    return Array.from(new Set(list.map((item) => item.sport)));
  }, [list]);
  const [columnDefs] = useState<ColDef[]>([
    { field: 'country', rowGroup: true, enableRowGroup: true, filter: 'agTextColumnFilter' },
    { field: 'gold', aggFunc: 'sum', enableValue: true, editable: true },
    { field: 'silver', aggFunc: 'sum', enableValue: true, editable: true, enableRowGroup: true },
    {
      field: 'sport',
      enablePivot: true,
      pivot: true,
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: sportOptions
      }
    }
  ]);

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 130,
      filter: true,
      enablePivot: true,
      editable: true
    };
  }, []);

  const autoGroupColumnDef = useMemo<ColDef>(() => {
    return {
      minWidth: 200
    };
  }, []);

  const onBtExport = useCallback(() => {
    if (!gridRef.current?.api) return;
    gridRef.current.api.exportDataAsExcel();
  }, []);

  const onCellValueChanged = useCallback((event: any) => {
    setEditedRows((prevRows) => ({
      ...prevRows,
      [event.data.id]: event.data
    }));
  }, []);
  const modifiedRows = Object.values(editedRows);
  const onSave = () => {
    console.log('Edited Rows:', modifiedRows);
  };
  console.log('Edited Rows:', modifiedRows);

  const onChart1 = useCallback(() => {
    if (!gridRef.current?.api) return;
    gridRef.current.api.createRangeChart({
      cellRange: {
        rowStartIndex: 0,
        rowEndIndex: 4,
        columns: ['country', 'gold', 'silver']
      },
      chartType: 'groupedColumn',
      chartThemeOverrides: {
        common: {
          title: {
            enabled: true,
            text: 'Top 5 Medal Winners'
          }
        }
      }
    });
  }, []);
  const dataRef = useOlympicData();
  const pet: Pet = {
    id: 1,
    name: 'pet',
    category: {},
    photoUrls: [],
    tags: []
  };
  console.log(pet, dataRef);
  const handleExportPDF = () => {
    if (gridRef.current) {
      const gridApi = gridRef.current.api;
      exportToPDF(gridApi);
    }
  };

  return (
    <div style={containerStyle}>
      <div className='p-servicers_btn'>
        <Button onClick={onChart1}>Top 5 Medal Winners</Button>
        <Button onClick={onBtExport}>Download CSV export file</Button>
        <Button onClick={onSave}>Save</Button>
        <Button onClick={handleExportPDF}>Export to PDF</Button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={gridStyle}>
          <ForwardedAgGridComponent<IOlympicData>
            ref={gridRef}
            rowData={rowDataWithId}
            columnDefs={columnDefs}
            onCellValueChanged={onCellValueChanged}
            isLoading={loading}
            grandTotalRow={'bottom'}
            isSideBar
            autoGroupColumnDef={autoGroupColumnDef}
            isPivotMode
            isCellSelection
            isEnableCharts
            defaultColDef={defaultColDef}
          />
        </div>
      </div>
    </div>
  );
}
