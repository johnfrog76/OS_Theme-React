import { useRef, useEffect, useState } from "react";
import { ButtonGroup, Button } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightlightIcon from "@mui/icons-material/Nightlight";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import "./App.scss";
import { IMode, IUserPrefers } from "./constants/mode-enums";

function App() {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const modeHandler = useRef<((e: MediaQueryListEvent) => void) | null>(null);
  const [darkMode, setDarkMode] = useState<IMode>(IMode.light);
  const [isAuto, setIsAuto] = useState<boolean>(true);

  modeHandler.current = (e: MediaQueryListEvent): void => {
    e.matches ? setDarkMode(IMode.dark) : setDarkMode(IMode.light);
  };

  useEffect(() => {
    if (isAuto) {
      const changeHandler = (e: MediaQueryListEvent) => {
        if (isAuto && modeHandler.current) {
          console.log("sup?");
          modeHandler.current(e);
        }
      };
      mediaQuery.matches ? setDarkMode(IMode.dark) : setDarkMode(IMode.light);
      mediaQuery.addEventListener("change", changeHandler);
      console.log("listener added");

      return () => {
        mediaQuery.removeEventListener("change", changeHandler);
        console.log("listener removed");
      };
    }
  }, [isAuto]);

  const handleSetMode = (mode: IUserPrefers) => {
    if (mode === IUserPrefers.auto) {
      setIsAuto(true);
    } else if (mode === IUserPrefers.light) {
      setIsAuto(false);
      setDarkMode(IMode.light);
    } else if (mode === IUserPrefers.dark) {
      setIsAuto(false);
      setDarkMode(IMode.dark);
    }
  };

  return (
    <main className={darkMode}>
      <h1 className="holtwood-one">
        {darkMode === IMode.dark ? "OS Dark Mode" : "OS Light Mode"}
      </h1>
      <div className="group-wrap">
        <ButtonGroup
          size="small"
          variant="outlined"
          color="success"
          aria-label="Basic button group"
        >
          <Button onClick={() => handleSetMode(IUserPrefers.auto)}>
            <SettingsBrightnessIcon />
          </Button>
          <Button onClick={() => handleSetMode(IUserPrefers.dark)}>
            <NightlightIcon />
          </Button>
          <Button onClick={() => handleSetMode(IUserPrefers.light)}>
            <LightModeIcon />{" "}
          </Button>
        </ButtonGroup>
      </div>
      <h3>how to test: use webkit</h3>
      <ol>
        <li>On windows: Settings &gt; Personalization &gt; Color mode</li>
        <li>On mac: System Preferences &gt; Displays &gt; Color</li>
        <li>On linux: Settings &gt; Display &gt; Color</li>
        <li>Toggle OS dark mode and observe results</li>
        <ul>
          <li>expect theme to change with system color change</li>
        </ul>
        <li>Tap Dark mode and then toggle system color change</li>
        <ul>
          <li>expect theme selection to override system color mode change</li>
        </ul>
        <li>Tap Light mode and then toggle system color change</li>
        <ul>
          <li>expect theme selection to override system color mode change</li>
        </ul>
      </ol>
    </main>
  );
}

export default App;
