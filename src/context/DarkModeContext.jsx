import { createContext, useContext, useEffect } from "react";

import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    prefersDarkMode,
    "isDarkMode",
  );

  useEffect(
    function () {
      document.documentElement.classList.toggle("dark-mode", isDarkMode);
      document.documentElement.classList.toggle("light-mode", !isDarkMode);
    },
    [isDarkMode],
  );

  function toggleDarkMode() {
    setIsDarkMode((currentMode) => !currentMode);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (context === undefined) {
    throw new Error("DarkModeContext was used outside DarkModeProvider");
  }

  return context;
}
// The provider and its custom hook intentionally share this module.
// eslint-disable-next-line react-refresh/only-export-components
export { DarkModeProvider, useDarkMode };
