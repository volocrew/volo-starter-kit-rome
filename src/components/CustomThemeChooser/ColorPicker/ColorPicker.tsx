import React, { FC, useState, useEffect } from 'react';
import {
  makeStyles,
  Slider,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  useTheme,
  rgbToHex
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { capitalCase } from 'change-case';
import { PaletteName } from '../models';
import {
  SHADE_LIST,
  COLORS,
  COLORS_LIST,
  shadeType,
  colorType,
  getMuiColor
} from '../models/colors';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },
  text: {
    textAlign: 'left',
    fontSize: '1.25rem',
    fontWeight: 500
  },
  sliderContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  slider: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3)
  },
  subText: {
    fontSize: '1rem',
    fontWeight: 400
  },
  paletteContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    width: 192,
    height: 192
  },
  paletteItem: {
    width: 48,
    height: 48,
    '& span': {
      width: '100%',
      height: '100%'
    },
    '& svg': {
      fontSize: 30,
      color: '#FFF'
    }
  },
  previewContainer: {
    display: 'flex',
    width: 192,
    height: 64,
    marginTop: theme.spacing(2)
  },
  previewItem: {
    width: 64,
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

type Props = {
  paletteName: PaletteName;
  initColor: string;
  colorChange: (color: string) => void;
};

const ColorPicker: FC<Props> = ({
  paletteName,
  initColor,
  colorChange
}: Props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [isFirst, setFirst] = useState(true);
  const [selectedColor, setColor] = useState('blue');
  const [shadeIndex, setShadeIndex] = useState(11);

  useEffect(() => {
    const { color, shade } = getMuiColor(initColor);
    if (isFirst) {
      setFirst(false);
      setColor(color);
      setShadeIndex(SHADE_LIST.indexOf(shade));
    }
  }, [initColor]);

  useEffect(() => {
    colorChange(COLORS[selectedColor as colorType][shade]);
  }, [selectedColor, shadeIndex]);

  const handleSliderChange = (
    event: React.ChangeEvent<any>,
    newValue: number | number[]
  ) => {
    setShadeIndex(newValue as number);
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setColor(event.target.name);
    }
  };

  const shade = SHADE_LIST[shadeIndex] as shadeType;
  const paletteColor =
    paletteName === 'primary' ? theme.palette.primary : theme.palette.secondary;

  return (
    <div className={classes.container}>
      <Typography className={classes.text}>
        {capitalCase(paletteName)}
      </Typography>

      <TextField
        type="text"
        label=""
        value={COLORS[selectedColor as colorType][shade]}
      />

      <div className={classes.sliderContainer}>
        <Typography variant="body1" className={classes.subText}>
          Shade:
        </Typography>
        <Slider
          className={classes.slider}
          value={shadeIndex}
          onChange={handleSliderChange}
          aria-labelledby="discrete-slider"
          min={0}
          max={13}
        />
        <Typography variant="body1" className={classes.subText}>
          {SHADE_LIST[shadeIndex]}
        </Typography>
      </div>

      <RadioGroup
        aria-label="color"
        name="color"
        value={selectedColor}
        onChange={handleColorChange}>
        <div className={classes.paletteContainer}>
          {COLORS_LIST.map((color: string) => (
            <div
              key={color}
              className={classes.paletteItem}
              style={{
                backgroundColor: COLORS[color as colorType][shade],
                border: color === selectedColor ? 'solid 1px #FFF' : 'none'
              }}>
              <Radio
                checkedIcon={<CheckIcon />}
                icon={<></>}
                name={color}
                checked={color === selectedColor}
              />
            </div>
          ))}
        </div>
      </RadioGroup>

      <div className={classes.previewContainer}>
        <div
          key="dark"
          className={classes.previewItem}
          style={{
            backgroundColor: paletteColor.dark
          }}>
          <Typography variant="body1">{rgbToHex(paletteColor.dark)}</Typography>
        </div>
        <div
          key="main"
          className={classes.previewItem}
          style={{
            backgroundColor: paletteColor.main
          }}>
          <Typography variant="body1">{paletteColor.main}</Typography>
        </div>
        <div
          key="light"
          className={classes.previewItem}
          style={{
            backgroundColor: paletteColor.light
          }}>
          <Typography variant="body1">
            {rgbToHex(paletteColor.light)}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
