import { FC, ReactNode, createContext, useContext, useEffect, useState } from "react";
import { DarkMode } from "../@types/context";

export const DarkModeContext = createContext<[boolean, React.Dispatch<React.SetStateAction<boolean>>]>([
  false,
  () => {},
]);

export const DarkModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dark, setDark] = useState<DarkMode>(false);

  return <DarkModeContext.Provider value={[dark, setDark]}>{children}</DarkModeContext.Provider>;
};
