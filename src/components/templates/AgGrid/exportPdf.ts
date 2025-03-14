import { Column, GridApi, RowNode } from 'ag-grid-community';
import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

if (pdfFonts?.pdfMake?.vfs) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
}

const PDF_LOGO =
  'https://raw.githubusercontent.com/AhmedAGadir/ag-grid-todo-list-react-typescript/master/src/assets/new-ag-grid-logo.png';
const getHeaderToExport = (
  columns: Column[]
): {
  text: string;
  colSpan?: number;
  colId: string;
  style: string;
  fillColor?: string;
  bold?: boolean;
  alignment?: string;
}[] => {
  return [
    {
      text: 'STT',
      colId: 'stt',
      style: 'tableHeader',
      fillColor: '#d3d3d3',
      bold: true,
      alignment: 'center'
    },
    ...columns.map((col) => {
      const headerCell: {
        text: string;
        colSpan?: number;
        colId: string;
        style: string;
        fillColor?: string;
        bold?: boolean;
        alignment?: string;
      } = {
        text: '',
        colId: '',
        style: 'tableHeader',
        fillColor: '#d3d3d3',
        bold: true,
        alignment: 'center'
      };

      const parentGroup = col.getParent();

      if (parentGroup && parentGroup.getGroupId) {
        headerCell.text = parentGroup.getColGroupDef()?.headerName ?? 'Group';
        headerCell.colSpan = parentGroup.getChildren()?.length ?? 1;
        headerCell.colId = parentGroup.getGroupId();
      } else {
        const colDef = col.getColDef();
        const field = colDef.field ?? '';

        let headerName = colDef.headerName ?? '';
        const headerNameUppercase = field.charAt(0).toUpperCase() + field.slice(1);

        headerName = headerName || headerNameUppercase;

        if (col.isFilterActive()) {
          headerName += ` [FILTERING]`;
        }

        headerCell.text = headerName;
        headerCell.colId = col.getId();
      }

      return headerCell;
    })
  ];
};

const getRowsToExport = (
  gridApi: GridApi,
  columns: Column[]
): { text: string; bold?: boolean; alignment?: string }[][] => {
  const getCellToExport = (
    column: Column,
    node: RowNode,
    isFirstGroupColumn: boolean
  ): { text: string; bold?: boolean; alignment?: string } => {
    if (node.group && isFirstGroupColumn) {
      return {
        text: node.key ?? '',
        bold: true
      };
    }
    return { text: node.data?.[column.getColId()] ?? '' };
  };

  const rowsToExport: { text: string; bold?: boolean; alignment?: string }[][] = [];
  let currentIndex = 0;

  gridApi?.forEachNodeAfterFilterAndSort((node) => {
    let isFirstGroupColumn = true;

    if (node.group) {
      currentIndex = 0;
      rowsToExport.push([
        { text: '', bold: true, alignment: 'left' },
        ...columns.map((column, colIndex) => ({
          text: colIndex === 0 ? node.key : node.aggData?.[column.getColId()] ?? '',
          bold: !!node.aggData
        }))
      ]);
    } else {
      currentIndex++;
      const rowToExport = [
        { text: currentIndex.toString(), alignment: 'center' },
        ...columns.map((column) => {
          const cell = getCellToExport(column, node as RowNode, isFirstGroupColumn);
          if (node.group && isFirstGroupColumn) isFirstGroupColumn = false;
          return cell;
        })
      ];
      rowsToExport.push(rowToExport);
    }
  });

  return rowsToExport;
};

const getDocument = (gridApi: GridApi) => {
  const columns: Column[] = gridApi.getAllDisplayedColumnGroups() as Column[];

  const headerRow = getHeaderToExport(columns);
  const rows = getRowsToExport(gridApi, columns);

  return {
    pageSize: 'A4',
    pageOrientation: 'portrait',
    pageMargins: [40, 40, 40, 80],

    header: (currentPage: number) => {
      if (currentPage === 1) {
        return {
          widths: ['100%', '*'],
          margin: [40, 10, 40, 20],
          stack: [
            {
              image: 'ag-grid-logo',
              width: 80,
              absolutePosition: { x: 460, y: 20 }
            }
          ]
        };
      }
    },

    footer: (currentPage: number, pageCount: number) => ({
      margin: [40, 0, 40, 0],
      columns: [{ text: `Page ${currentPage} of ${pageCount}`, alignment: 'right' }]
    }),

    content: [
      {
        text: 'Report Title',
        fontSize: 14,
        bold: true,
        alignment: 'left',
        margin: [0, 0, 0, 10]
      },
      {
        table: {
          headerRows: 1,
          widths: ['10%', ...columns.map(() => `${90 / columns.length}%`)],
          body: [headerRow, ...rows],
          heights: 15
        },
        fontSize: 12
      }
    ],
    images: {
      'ag-grid-logo': PDF_LOGO
    },
    styles: {
      header: {
        fontSize: 22,
        bold: true
      }
    }
  };
};

export const exportToPDF = (gridApi: GridApi) => {
  const doc = getDocument(gridApi);
  pdfMake.createPdf(doc).download();
};
