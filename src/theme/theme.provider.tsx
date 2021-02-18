import * as React from 'react';

import { ThemeType } from './type';
import { ThemeContext } from './theme.context';
import { defaultTheme } from '../style';
import deepmerge from 'deepmerge';

export interface ThemeProviderProps {
  theme?: ThemeType;
}

export const ThemeProvider: React.FunctionComponent<ThemeProviderProps> = (
  props
) => {
  const { theme: themeProp = {}, children } = props;

  const [themeState, setThemeState] = React.useState(
    deepmerge(defaultTheme, themeProp)
  );

  React.useEffect(() => {
    const mergedTheme = deepmerge(defaultTheme, themeProp);
    setThemeState(mergedTheme);
  }, [themeProp]);

  const setTheme = (newTheme: ThemeType) => {
    const mergedTheme = deepmerge(defaultTheme, newTheme);
    setThemeState(mergedTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme: themeState, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
