import React, { forwardRef, useMemo } from 'react';
import './index.scss';

import { AgChartsEnterpriseModule } from 'ag-charts-enterprise';
import {
  ClientSideRowModelModule,
  ColDef,
  CsvExportModule,
  ExcelExportParams,
  ModuleRegistry,
  NumberEditorModule,
  NumberFilterModule,
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

type GrandTotalRowType = 'top' | 'bottom' | undefined;

export interface IAgGridProps<T extends object> {
  columnDefs: ColDef<T>[];
  rowData: T[];
  enabledModules?: (keyof typeof AVAILABLE_MODULES)[];
  isSideBar?: boolean;
  onCellValueChanged?: (event: any) => void;
  isLoading?: boolean;
  grandTotalRow?: GrandTotalRowType;
  isEnableCharts?: boolean;
  isCellSelection?: boolean;
  isPivotMode?: boolean;
  autoGroupColumnDef?: ColDef<T>;
  defaultColDef?: ColDef<T>;
}

const AVAILABLE_MODULES = {
  clientSideRowModel: ClientSideRowModelModule,
  columnsToolPanel: ColumnsToolPanelModule,
  columnMenu: ColumnMenuModule,
  contextMenu: ContextMenuModule,
  filtersToolPanel: FiltersToolPanelModule,
  validation: ValidationModule,
  csvExport: CsvExportModule,
  excelExport: ExcelExportModule,
  pivot: PivotModule,
  numberFilter: NumberFilterModule,
  setFilter: SetFilterModule,
  textEditor: TextEditorModule,
  numberEditor: NumberEditorModule,
  selectEditor: SelectEditorModule,
  integratedCharts: IntegratedChartsModule.with(AgChartsEnterpriseModule),
  textFilter: TextFilterModule
};

const AgGridComponent = <T extends { id: string }>(
  props: IAgGridProps<T>,
  ref: React.Ref<AgGridReact<T>>
) => {
  const {
    columnDefs,
    rowData,
    enabledModules = [],
    isSideBar,
    onCellValueChanged,
    isLoading,
    grandTotalRow,
    isEnableCharts,
    isCellSelection,
    isPivotMode,
    autoGroupColumnDef,
    defaultColDef
  } = props;

  useMemo(() => {
    if (enabledModules.length > 0) {
      ModuleRegistry.registerModules(enabledModules.map((key) => AVAILABLE_MODULES[key]));
    }
  }, [enabledModules]);

  const popupParent = useMemo<HTMLElement | null>(() => document.body, []);

  const defaultExcelExportParams = useMemo<ExcelExportParams>(
    () => ({
      exportAsExcelTable: true
    }),
    []
  );
  return (
    <div className='ag-theme-alpine' style={{ height: 500, width: '100%' }}>
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
      />
    </div>
  );
};
const ForwardedAgGridComponent = forwardRef(AgGridComponent) as <T extends { id: string }>(
  props: IAgGridProps<T> & { ref?: React.Ref<AgGridReact<T>> }
) => React.ReactElement;

export default ForwardedAgGridComponent;
