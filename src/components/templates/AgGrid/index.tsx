import React, { forwardRef, useCallback, useMemo, useState } from 'react';

import { AgChartsEnterpriseModule } from 'ag-charts-enterprise';
import {
  ClientSideRowModelApiModule,
  ClientSideRowModelModule,
  ColDef,
  CsvExportModule,
  CustomEditorModule,
  DateFilterModule,
  ExcelExportParams,
  ModuleRegistry,
  NumberEditorModule,
  NumberFilterModule,
  QuickFilterModule,
  SelectEditorModule,
  TextEditorModule,
  TextFilterModule,
  ValidationModule
} from 'ag-grid-community';
import {
  ColumnMenuModule,
  ColumnsToolPanelModule,
  ContextMenuModule,
  ExcelExportModule,
  FiltersToolPanelModule,
  IntegratedChartsModule,
  PivotModule,
  SetFilterModule
} from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';

import Button from '~/components/atoms/Button';

import { exportToPDF } from './exportPdf';
import './index.scss';

type GrandTotalRowType = 'top' | 'bottom' | undefined;

export interface IAgGridProps<T extends object> {
  columnDefs: ColDef<T>[];
  rowData: T[];
  isSideBar?: boolean;
  isLoading?: boolean;
  grandTotalRow?: GrandTotalRowType;
  isEnableCharts?: boolean;
  isCellSelection?: boolean;
  isPivotMode?: boolean;
  autoGroupColumnDef?: ColDef<T>;
  defaultColDef?: ColDef<T>;
  onChart?: () => void;
}

// const AVAILABLE_MODULES = {
//   clientSideRowModel: ClientSideRowModelModule,
//   columnsToolPanel: ColumnsToolPanelModule,
//   columnMenu: ColumnMenuModule,
//   contextMenu: ContextMenuModule,
//   filtersToolPanel: FiltersToolPanelModule,
//   validation: ValidationModule,
//   csvExport: CsvExportModule,
//   excelExport: ExcelExportModule,
//   pivot: PivotModule,
//   numberFilter: NumberFilterModule,
//   setFilter: SetFilterModule,
//   textEditor: TextEditorModule,
//   numberEditor: NumberEditorModule,
//   selectEditor: SelectEditorModule,
//   integratedCharts: IntegratedChartsModule.with(AgChartsEnterpriseModule),
//   textFilter: TextFilterModule,
//   test: ClientSideRowModelApiModule
// };
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ColumnMenuModule,
  ContextMenuModule,
  SetFilterModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  ValidationModule,
  CsvExportModule,
  NumberEditorModule,
  TextEditorModule,
  CustomEditorModule,
  QuickFilterModule,
  ClientSideRowModelApiModule,
  IntegratedChartsModule.with(AgChartsEnterpriseModule),
  SelectEditorModule,
  PivotModule,
  ExcelExportModule,
  FiltersToolPanelModule,
  ColumnsToolPanelModule
]);

const AgGridComponent = <T extends { id: string }>(
  props: IAgGridProps<T>,
  ref: React.Ref<AgGridReact<T>>
) => {
  const {
    columnDefs,
    rowData,
    isSideBar = false,
    isLoading = false,
    grandTotalRow,
    isEnableCharts = false,
    isCellSelection = false,
    isPivotMode = false,
    autoGroupColumnDef,
    defaultColDef,
    onChart
  } = props;

  const [isDisableSave, setIsDisableSave] = useState(isPivotMode);
  const [editedRows, setEditedRows] = useState({});

  const popupParent = useMemo<HTMLElement | null>(() => document.body, []);

  const defaultExcelExportParams = useMemo<ExcelExportParams>(
    () => ({
      exportAsExcelTable: true
    }),
    []
  );
  if (ref && 'current' in ref && ref.current) {
    console.log(ref.current.api?.isPivotMode());
    console.log('object');
  }
  const onBtExport = useCallback(() => {
    if (ref && 'current' in ref && ref.current) {
      ref.current.api.exportDataAsExcel();
    }
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

  const handleExportPDF = () => {
    if (ref && 'current' in ref && ref.current) {
      const gridApi = ref.current.api;
      exportToPDF(gridApi);
    }
  };
  const onPivotModeChanged = useCallback(() => {
    if (ref && 'current' in ref && ref.current) {
      const isPivotMode = ref?.current?.api.isPivotMode();
      setIsDisableSave(isPivotMode ?? false);
    }
  }, [ref]);
  return (
    <div className='t-aggrid' style={{ height: 500, width: '100%' }}>
      <div className='t-aggrid_btn'>
        {onChart && (
          <Button onClick={onChart} disabled={isDisableSave}>
            Top 5 Medal Winners
          </Button>
        )}
        <Button onClick={handleExportPDF} disabled={isDisableSave}>
          Export to PDF
        </Button>
        <Button onClick={onBtExport}>Download CSV export file</Button>
        {isCellSelection && <Button onClick={onSave}>Save</Button>}
      </div>
      <AgGridReact<T>
        ref={ref}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultExcelExportParams={defaultExcelExportParams}
        sideBar={isSideBar}
        onCellValueChanged={onCellValueChanged}
        loading={isLoading}
        popupParent={popupParent}
        grandTotalRow={grandTotalRow}
        enableCharts={isEnableCharts}
        cellSelection={isCellSelection}
        getRowId={(params) => params?.data?.id ?? Math.random().toString()}
        pivotMode={isPivotMode}
        autoGroupColumnDef={autoGroupColumnDef}
        defaultColDef={defaultColDef}
        onColumnPivotModeChanged={onPivotModeChanged}
      />
    </div>
  );
};
const ForwardedAgGridComponent = forwardRef(AgGridComponent) as <T extends { id: string }>(
  props: IAgGridProps<T> & { ref?: React.Ref<AgGridReact<T>> }
) => React.ReactElement;

export default ForwardedAgGridComponent;
