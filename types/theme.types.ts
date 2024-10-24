export type ColorScheme = {
  text: string;
  textLight: string;
  clickable: string;
  toggleBackground: string;
  alert: string;
  buttonText: string;
  background: string;
  backgroundDarker: string;
  backgroundEvenDarker: string;
  selected: string;
  tint: string;
  icon: string;
  tabIconDefault: string;
  tabIconSelected: string;
  primary: string;
  secondary: string;
  dark: string;
  border: string;
  coral: string;
  important: string;
  taskBorder: string;
  shadow: string;
  negative: string;
  lightGrey: string;
  success: string;
  failure: string;
  incomplete: string;
  graphs: Graphs;
  hueSets: string[][];
};

export type Graphs = {
  electricBlue: string;
  neonYellow: string;
  magenta: string;
  cyan: string;
  mintGreen: string;
  pastelPurple: string;
  pastelPink: string;
  softOrange: string;
  deepRed: string;
  gunmetal: string;
  cream: string;
};

export type Size = {
  navBarHeight: string;
  tabletBreakpoint: string;
  mobileBreakpoint: string;
  mobileNavBarHeight: string;
};

export type Font = {
  title: string;
  body: string;
};

export type Theme = {
  color: ColorScheme;
  size: Size;
  font: Font;
};

export type ThemeCollection = {
  dark: ColorScheme;
  light: ColorScheme;
  size: Size;
  font: Font;
};

export type ThemeProps = {
  theme: Theme;
  setTheme: () => void;
};
