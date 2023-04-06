import red from '@material-ui/core/colors/red';
import pink from '@material-ui/core/colors/pink';
import purple from '@material-ui/core/colors/purple';
import deepPurple from '@material-ui/core/colors/deepPurple';
import indigo from '@material-ui/core/colors/indigo';
import blue from '@material-ui/core/colors/blue';
import lightBlue from '@material-ui/core/colors/lightBlue';
import cyan from '@material-ui/core/colors/cyan';
import teal from '@material-ui/core/colors/teal';
import green from '@material-ui/core/colors/green';
import lightGreen from '@material-ui/core/colors/lightGreen';
import lime from '@material-ui/core/colors/lime';
import yellow from '@material-ui/core/colors/yellow';
import amber from '@material-ui/core/colors/amber';
import orange from '@material-ui/core/colors/orange';
import deepOrange from '@material-ui/core/colors/deepOrange';

export type shadeType =
  | '900'
  | '800'
  | '700'
  | '600'
  | '500'
  | '400'
  | '300'
  | '200'
  | '100'
  | '50'
  | 'A700'
  | 'A400'
  | 'A200'
  | 'A100';

export const SHADE_LIST: string[] = [
  '900',
  '800',
  '700',
  '600',
  '500',
  '400',
  '300',
  '200',
  '100',
  '50',
  'A700',
  'A400',
  'A200',
  'A100'
];

export type colorType =
  | 'red'
  | 'pink'
  | 'purple'
  | 'deepPurple'
  | 'indigo'
  | 'blue'
  | 'lightBlue'
  | 'cyan'
  | 'teal'
  | 'green'
  | 'lightGreen'
  | 'lime'
  | 'yellow'
  | 'amber'
  | 'orange'
  | 'deepOrange';

export const COLORS_LIST = [
  'red',
  'pink',
  'purple',
  'deepPurple',
  'indigo',
  'blue',
  'lightBlue',
  'cyan',
  'teal',
  'green',
  'lightGreen',
  'lime',
  'yellow',
  'amber',
  'orange',
  'deepOrange'
];

export const COLORS = {
  red,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  lime,
  yellow,
  amber,
  orange,
  deepOrange
};

export const getMuiColor = (
  selectedColor: string
): { color: colorType; shade: shadeType } => {
  const ret: { color: colorType; shade: shadeType } = {
    color: 'blue',
    shade: 'A400'
  };

  Object.keys(COLORS).forEach(c => {
    const color = COLORS[c as colorType];
    Object.keys(color).forEach(s => {
      const currentColor = color[s as shadeType];
      if (currentColor === selectedColor) {
        Object.assign(ret, { color: c as colorType, shade: s as shadeType });
      }
    });
  });

  return ret;
};
