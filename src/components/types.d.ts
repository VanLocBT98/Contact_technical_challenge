type FontWeightStyle = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

type TextStyle =
  | 'uppercase'
  | 'capitalize'
  | 'underline'
  | 'italic'
  | 'center'
  | 'justify'
  | 'normal'
  | 'right'
  | 'left';

type TextSize = '9x12';

type ColorStyle = 'white' | 'black' | 'deepSpaceSparkle' | 'darkLiver';

type LetterSpacing = 'ls-md' | 'ls-lg';

type GeneralTextStyle = ColorStyle | FontWeightStyle | TextStyle | LetterSpacing | TextSize;
type LinkTypes = {
  text?: string;
  url?: string;
  target?: string;
  icon?: string;
};
type Ratio = '1x1' | '354x221';
export interface PrintParams {
  PDF_HEADER_COLOR: string;
  PDF_INNER_BORDER_COLOR: string;
  PDF_OUTER_BORDER_COLOR: string;
  PDF_LOGO: string;
  PDF_PAGE_ORITENTATION: 'landscape' | 'portrait';
  PDF_WITH_HEADER_IMAGE: boolean;
  PDF_WITH_FOOTER_PAGE_COUNT: boolean;
  PDF_HEADER_HEIGHT: number;
  PDF_ROW_HEIGHT: number;
  PDF_ODD_BKG_COLOR: string;
  PDF_EVEN_BKG_COLOR: string;
  PDF_WITH_CELL_FORMATTING: boolean;
  PDF_WITH_COLUMNS_AS_LINKS: boolean;
  PDF_SELECTED_ROWS_ONLY: boolean;
}
