/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './index.scss';

import {
  ClientSideRowModelModule,
  ColDef,
  CsvExportModule,
  CustomEditorModule,
  DateFilterModule,
  IDateFilterParams,
  INumberFilterParams,
  ISetFilter,
  ModuleRegistry,
  NumberEditorModule,
  NumberFilterModule,
  QuickFilterModule,
  TextEditorModule,
  TextFilterModule,
  ValidationModule
} from 'ag-grid-community';
import { ColumnMenuModule, ContextMenuModule, SetFilterModule } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';

import Button from '~/components/atoms/Button';
import Input from '~/components/atoms/Input';
import { useOlympicData } from '~/sdk/apis/pets';
import { useStore } from '~/stores';
import { IOlympicData } from '~/types';

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
  QuickFilterModule
]);

const dateFilterParams: IDateFilterParams = {
  comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
    const dateAsString = cellValue;
    if (dateAsString == null) return -1;
    const dateParts = dateAsString.split('/');
    const cellDate = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
    return 0;
  }
};
export default function Home() {
  const {
    MockData: { list }
  } = useStore();
  const gridRef = useRef<AgGridReact<IOlympicData>>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<IOlympicData[]>();
  const [columnDefs] = useState<ColDef[]>([
    { field: 'athlete', filter: 'agTextColumnFilter' },
    { field: 'age', cellEditor: 'agNumberCellEditor', filter: 'agNumberColumnFilter' },
    { field: 'country', filter: 'agTextColumnFilter' },
    {
      field: 'year',
      maxWidth: 120,
      cellEditor: 'agNumberCellEditor'
    },
    {
      field: 'date',
      minWidth: 215,
      filter: 'agDateColumnFilter',
      filterParams: dateFilterParams
    },
    { field: 'sport', filter: 'agTextColumnFilter' },
    {
      field: 'gold',
      headerName: 'Gold',
      filter: 'agNumberColumnFilter',
      filterParams: {
        buttons: ['apply']
      } as INumberFilterParams
    },
    {
      field: 'silver',
      filter: 'agNumberColumnFilter',
      floatingFilterComponentParams: {},
      suppressFloatingFilterButton: true
    },
    {
      field: 'bronze',
      filter: 'agNumberColumnFilter',
      floatingFilterComponentParams: {},
      suppressFloatingFilterButton: true
    },
    { field: 'total', filter: false }
  ]);
  function getBoolean(id: string) {
    const field: any = document.querySelector('#' + id);
    return !!field?.checked;
  }
  function getParams() {
    return {
      allColumns: getBoolean('allColumns')
    };
  }
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 150,
      filter: true,
      floatingFilter: true,
      suppressHeaderMenuButton: true,
      editable: true
    };
  }, []);

  useEffect(() => {
    setRowData(list);
  }, [list]);
  const irelandAndUk = useCallback(() => {
    gridRef
      .current!.api.setColumnFilterModel('country', {
        values: ['Ireland', 'Great Britain']
      })
      .then(() => {
        gridRef.current!.api.onFilterChanged();
      });
  }, []);

  const clearCountryFilter = useCallback(() => {
    gridRef.current!.api.setColumnFilterModel('country', null).then(() => {
      gridRef.current!.api.onFilterChanged();
    });
  }, []);

  const destroyCountryFilter = useCallback(() => {
    gridRef.current!.api.destroyFilter('country');
  }, []);

  const endingStan = useCallback(() => {
    gridRef
      .current!.api.getColumnFilterInstance<ISetFilter>('country')
      .then((countryFilterComponent) => {
        const countriesEndingWithStan = countryFilterComponent!
          .getFilterKeys()
          .filter(function (value: any) {
            return value.indexOf('stan') === value.length - 4;
          });
        gridRef
          .current!.api.setColumnFilterModel('country', {
            values: countriesEndingWithStan
          })
          .then(() => {
            gridRef.current!.api.onFilterChanged();
          });
      });
  }, []);

  const printCountryModel = useCallback(() => {
    const model = gridRef.current!.api.getColumnFilterModel('country');
    if (model) {
      console.log('Country model is: ' + JSON.stringify(model));
    } else {
      console.log('Country model filter is not active');
    }
  }, []);

  const sportStartsWithS = useCallback(() => {
    gridRef
      .current!.api!.setColumnFilterModel('sport', {
        type: 'startsWith',
        filter: 's'
      })
      .then(() => {
        gridRef.current!.api.onFilterChanged();
      });
  }, []);

  const sportEndsWithG = useCallback(() => {
    gridRef
      .current!.api!.setColumnFilterModel('sport', {
        type: 'endsWith',
        filter: 'g'
      })
      .then(() => {
        gridRef.current!.api.onFilterChanged();
      });
  }, []);

  const sportsCombined = useCallback(() => {
    gridRef
      .current!.api!.setColumnFilterModel('sport', {
        conditions: [
          {
            type: 'endsWith',
            filter: 'g'
          },
          {
            type: 'startsWith',
            filter: 's'
          }
        ],
        operator: 'AND'
      })
      .then(() => {
        gridRef.current!.api.onFilterChanged();
      });
  }, []);

  const ageBelow25 = useCallback(() => {
    gridRef
      .current!.api!.setColumnFilterModel('age', {
        type: 'lessThan',
        filter: 25,
        filterTo: null
      })
      .then(() => {
        gridRef.current!.api.onFilterChanged();
      });
  }, []);

  const ageAbove30 = useCallback(() => {
    gridRef
      .current!.api!.setColumnFilterModel('age', {
        type: 'greaterThan',
        filter: 30,
        filterTo: null
      })
      .then(() => {
        gridRef.current!.api.onFilterChanged();
      });
  }, []);

  const ageBelow25OrAbove30 = useCallback(() => {
    gridRef
      .current!.api!.setColumnFilterModel('age', {
        conditions: [
          {
            type: 'greaterThan',
            filter: 30,
            filterTo: null
          },
          {
            type: 'lessThan',
            filter: 25,
            filterTo: null
          }
        ],
        operator: 'OR'
      })
      .then(() => {
        gridRef.current!.api.onFilterChanged();
      });
  }, []);

  const ageBetween25And30 = useCallback(() => {
    gridRef
      .current!.api!.setColumnFilterModel('age', {
        type: 'inRange',
        filter: 25,
        filterTo: 30
      })
      .then(() => {
        gridRef.current!.api.onFilterChanged();
      });
  }, []);

  const clearAgeFilter = useCallback(() => {
    gridRef.current!.api.setColumnFilterModel('age', null).then(() => {
      gridRef.current!.api.onFilterChanged();
    });
  }, []);

  const after2010 = useCallback(() => {
    gridRef
      .current!.api!.setColumnFilterModel('date', {
        type: 'greaterThan',
        dateFrom: '2010-01-01',
        dateTo: null
      })
      .then(() => {
        gridRef.current!.api.onFilterChanged();
      });
  }, []);

  const before2012 = useCallback(() => {
    gridRef
      .current!.api!.setColumnFilterModel('date', {
        type: 'lessThan',
        dateFrom: '2012-01-01',
        dateTo: null
      })
      .then(() => {
        gridRef.current!.api.onFilterChanged();
      });
  }, []);

  const dateCombined = useCallback(() => {
    gridRef
      .current!.api!.setColumnFilterModel('date', {
        conditions: [
          {
            type: 'lessThan',
            dateFrom: '2012-01-01',
            dateTo: null
          },
          {
            type: 'greaterThan',
            dateFrom: '2010-01-01',
            dateTo: null
          }
        ],
        operator: 'OR'
      })
      .then(() => {
        gridRef.current!.api.onFilterChanged();
      });
  }, []);

  const clearDateFilter = useCallback(() => {
    gridRef.current!.api.setColumnFilterModel('date', null).then(() => {
      gridRef.current!.api.onFilterChanged();
    });
  }, []);
  const onBtnExport = useCallback(() => {
    gridRef.current!.api.exportDataAsCsv(getParams());
  }, []);
  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current!.api.setGridOption(
      'quickFilterText',
      (document.getElementById('filter-text-box') as HTMLInputElement).value
    );
  }, []);
  useEffect(() => {
    const t0 = performance.now();
    return () => {
      const t1 = performance.now();
      console.log(`Page loaded in ${t1 - t0}ms`);
    };
  }, []);
  const dataRef = useOlympicData();
  console.log(dataRef);
  return (
    <div style={containerStyle}>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div>
          <span className='button-group'>
            <Button onClick={irelandAndUk}>Ireland &amp; UK</Button>
            <Button onClick={endingStan}>Countries Ending &apos;stan&rsquo;</Button>
            <Button onClick={printCountryModel}>Print Country</Button>
            <Button onClick={clearCountryFilter}>Clear Country</Button>
            <Button onClick={destroyCountryFilter}>Destroy Country</Button>

            <Button onClick={ageBelow25}>Age Below 25</Button>
            <Button onClick={ageAbove30}>Age Above 30</Button>
            <Button onClick={ageBelow25OrAbove30}>Age Below 25 or Above 30</Button>
            <Button onClick={ageBetween25And30}>Age Between 25 and 30</Button>
            <Button onClick={clearAgeFilter}>Clear Age Filter</Button>

            <Button onClick={after2010}>Date after 01/01/2010</Button>
            <Button onClick={before2012}>Date before 01/01/2012</Button>
            <Button onClick={dateCombined}>Date combined</Button>
            <Button onClick={clearDateFilter}>Clear Date Filter</Button>

            <Button onClick={sportStartsWithS}>Sport starts with S</Button>
            <Button onClick={sportEndsWithG}>Sport ends with G</Button>
            <Button onClick={sportsCombined}>Sport starts with S and ends with G</Button>
          </span>
        </div>
        <Button onClick={onBtnExport}>Download CSV export file</Button>
        <div className='example-header'>
          <Input
            type='text'
            label='Quick Filter:'
            id='filter-text-box'
            placeholder='Filter...'
            onInput={onFilterTextBoxChanged}
          />
        </div>
        <div style={{ flexGrow: '1', height: '600px' }}>
          <div style={gridStyle}>
            <AgGridReact<IOlympicData>
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              // onGridReady={onGridReady}
              suppressExcelExport
            />
          </div>
        </div>
      </div>
    </div>
  );
}
