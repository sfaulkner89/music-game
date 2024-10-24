import { createContext, useEffect, useState } from "react";
import { Graphs, Theme, ThemeCollection } from "types/theme.types";

export const graphs: Graphs = {
  electricBlue: "#0074D9",
  neonYellow: "#FFDC00",
  magenta: "#FF00FF",
  cyan: "#00FFFF",
  mintGreen: "#3FFF99",
  pastelPurple: "#CAB6D8",
  pastelPink: "#FFB6C1",
  softOrange: "#FFA07A",
  deepRed: "#FF4136",
  gunmetal: "#2F4F4F",
  cream: "#FFFDD0",
};

const hueSets = [
  ["#0074D9", "#7FDBFF", "#001F3F"],
  ["#FFDC00", "#FF851B", "#FF4136"],
  ["#3FFF99", "#2ECC40", "#B10DC9"],
  ["#FFB6C1", "#F012BE", "#7FDBFF"],
  ["#CAB6D8", "#B10DC9", "#AAAAAA"],
  ["#00FFFF", "#01FF70", "#001F3F"],
];

export const Colors = {};

const themeCollection: ThemeCollection = {
  light: {
    text: "#000000",
    textLight: "#808080",
    clickable: "#0074D9",
    toggleBackground: "#F0F0F0",
    alert: "#FF4136",
    buttonText: "#FFFFFF",
    background: "#F8F8F8",
    backgroundDarker: "#EAEAEA",
    backgroundEvenDarker: "#E0E0E0",
    selected: "#FFDC00",
    tint: "#CAB6D8",
    icon: "#A9A9A9",
    tabIconDefault: "#A9A9A9",
    tabIconSelected: "#0074D9",
    primary: "#FFDC00",
    secondary: "#FF851B",
    dark: "#001F3F",
    border: "#DDDDDD",
    coral: "#FF7F50",
    important: "#FF4136",
    taskBorder: "#CCCCCC",
    shadow: "#2F4F4F",
    negative: "#FF4136",
    lightGrey: "#D3D5D8",
    success: "#2ECC40",
    failure: "#FF4136",
    incomplete: "#808080",
    hueSets,
    graphs,
  },
  dark: {
    text: "#FFFFFF",
    textLight: "#AAAAAA",
    clickable: "#0074D9",
    toggleBackground: "#333333",
    alert: "#FF4136",
    background: "#111111",
    buttonText: "#FFFFFF",
    backgroundDarker: "#1A1A1A",
    backgroundEvenDarker: "#0F0F0F",
    selected: "#3FFF99",
    tint: "#B10DC9",
    icon: "#AAAAAA",
    tabIconDefault: "#AAAAAA",
    tabIconSelected: "#0074D9",
    primary: "#3FFF99",
    secondary: "#FFDC00",
    dark: "#001F3F",
    border: "#333333",
    coral: "#FF7F50",
    important: "#FF4136",
    taskBorder: "#888888",
    shadow: "#2F4F4F",
    negative: "#FF4136",
    lightGrey: "#D3D5D8",
    success: "#2ECC40",
    failure: "#FF4136",
    incomplete: "#808080",
    graphs,
    hueSets,
  },
  size: {
    navBarHeight: "96px",
    mobileNavBarHeight: "111px",
    tabletBreakpoint: "1024px",
    mobileBreakpoint: "768px",
  },
  font: {
    title: "Comfortaa",
    body: "Roboto",
  },
};

type Props = {
  children: React.ReactNode;
};

let savedTheme = "light";

if (typeof window !== "undefined") {
  savedTheme = window.localStorage.getItem("theme") || "light";
}

const ThemeContext = createContext({
  theme: {
    size: themeCollection.size,
    color: themeCollection.light,
    font: themeCollection.font,
  },
  setTheme: () => {},
  mode: savedTheme,
  screenSize: { width: 0, height: 0 },
  isMobile: false,
});

const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<Theme>({
    size: themeCollection.size,
    color: themeCollection[savedTheme as "light" | "dark"],
    font: themeCollection.font,
  });
  const [mode, setMode] = useState<"light" | "dark">(
    savedTheme as "light" | "dark"
  );

  const [screenSize, setScreenSize] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const updateSize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const toggleTheme = () => {
    setTheme(
      mode === "dark"
        ? { ...theme, color: themeCollection.light }
        : { ...theme, color: themeCollection.dark }
    );
    setMode(mode === "dark" ? "light" : "dark");
    if (typeof window !== "undefined") {
      window.localStorage.setItem("theme", mode === "dark" ? "light" : "dark");
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: toggleTheme,
        mode,
        screenSize,
        isMobile,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
