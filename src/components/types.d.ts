
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
type Ratio =
  | '1x1'
  | '354x221'
