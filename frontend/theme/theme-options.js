import { components } from "./components";
import { typography } from "./typography";
import { blue, marron, paste, primary, themeColors, orange, bluish, success, warning, gold } from "./theme-colors";
const THEMES = {
  GIFT: "GIFT",
  HEALTH: "HEALTH",
  DEFAULT: "DEFAULT",
  GROCERY: "GROCERY",
  PASTE: "PASTE",
  ORANGE: "ORANGE",
  GOLD: "GOLD",
  BLUISH: "BLUISH",
  GREEN: "GREEN",
  YELLOW: "YELLOW"
};
const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1600,
    xxl: 1920
  }
};

const themesOptionList = {
  [THEMES.DEFAULT]: {
    typography,
    components,
    breakpoints,
    palette: {
      primary: { ...primary,
        light: primary[100]
      },
      ...themeColors
    }
  },
  [THEMES.GROCERY]: {
    typography,
    components,
    breakpoints,
    palette: {
      primary: { ...primary,
        light: primary[100]
      },
      ...themeColors
    }
  },
  [THEMES.PASTE]: {
    typography,
    components,
    breakpoints,
    palette: {
      primary: { ...paste,
        light: paste[100]
      },
      ...themeColors
    }
  },
  [THEMES.HEALTH]: {
    typography,
    components,
    breakpoints,
    palette: {
      primary: { ...blue,
        light: blue[100]
      },
      ...themeColors
    }
  },
  [THEMES.GIFT]: {
    typography,
    components,
    breakpoints,
    palette: {
      primary: { ...marron,
        light: marron[100]
      },
      ...themeColors
    }
  },
  [THEMES.ORANGE]: {
    typography,
    components,
    breakpoints,
    palette: {
      primary: { ...orange
      },
      ...themeColors
    }
  },
  [THEMES.GOLD]: {
    typography,
    components,
    breakpoints,
    palette: {
      primary: { ...gold
      },
      ...themeColors
    }
  },
  [THEMES.BLUISH]: {
    typography,
    components,
    breakpoints,
    palette: {
      primary: { ...bluish
      },
      ...themeColors
    }
  },
  [THEMES.GREEN]: {
    typography,
    components,
    breakpoints,
    palette: {
      primary: { ...success
      },
      ...themeColors
    }
  },
  [THEMES.YELLOW]: {
    typography,
    components,
    breakpoints,
    palette: {
      primary: { ...warning
      },
      ...themeColors
    }
  }
};

const themeOptions = pathname => {
  return themesOptionList[THEMES.HEALTH];
};

export default themeOptions;