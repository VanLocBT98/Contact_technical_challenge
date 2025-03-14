import { useCallback, useMemo, useRef, useState } from 'react';
import './index.scss';

import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

import ForwardedAgGridComponent from '~/components/templates/AgGrid';
import { useStore } from '~/shares/stores';
import { IOlympicData } from '~/types';

export default function Standard() {
  const {
    MockData: { list, loading }
  } = useStore();
  const gridRef = useRef<AgGridReact<IOlympicData>>(null);
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
  const onChart = useCallback(() => {
    if (ref && 'current' in ref && ref.current) {
      ref.current.api.createRangeChart({
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
    }
  }, []);
  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={gridStyle}>
          <ForwardedAgGridComponent<IOlympicData>
            ref={gridRef}
            rowData={rowDataWithId}
            columnDefs={columnDefs}
            isLoading={loading}
            grandTotalRow={'bottom'}
            isSideBar
            autoGroupColumnDef={autoGroupColumnDef}
            isPivotMode
            isCellSelection
            isEnableCharts
            defaultColDef={defaultColDef}
            onChart={onChart}
          />
        </div>
      </div>
    </div>
  );
}
