/* eslint-disable react/prop-types */
import { createContext, ReactNode, useContext, useMemo } from 'react';

import { ThemeState, useThemeStore } from './theme.slice';
import { DataMockState, useDataMockStore } from './useDataMock';

export { useDataMockStore };

// Provider gom các store
interface GlobalStore {
  MockData: DataMockState;
  Theme: ThemeState;
}
const GlobalStoreContext = createContext<GlobalStore | null>(null);
interface GlobalStoreProviderProps {
  children: ReactNode;
}

export const GlobalStoreProvider: React.FC<GlobalStoreProviderProps> = ({ children }) => {
  const MockData = useDataMockStore();
  const Theme = useThemeStore();

  const combinedStores = useMemo(() => ({ MockData, Theme }), [MockData, Theme]);

  return (
    <GlobalStoreContext.Provider value={combinedStores}>{children}</GlobalStoreContext.Provider>
  );
};

export const useStore = (): GlobalStore => {
  const context = useContext(GlobalStoreContext);
  if (!context) {
    throw new Error('useStore phải được sử dụng trong GlobalStoreProvider');
  }
  return context;
};
