import { LicenseInfo } from '@mui/x-license-pro';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { LicenseManager } from 'ag-grid-enterprise';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';

import router from '~/routes';
import { GlobalStoreProvider } from '~/shares/stores';
LicenseInfo.setLicenseKey(import.meta.env.VITE_API_MUI_X_LICENSE_KEY);
LicenseManager.setLicenseKey(import.meta.env.VITE_API_AG_GRID_LICENSE_KEY);
function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: 2,
        staleTime: Infinity,
        cacheTime: 10 * 60 * 1000
      }
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStoreProvider>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </GlobalStoreProvider>
    </QueryClientProvider>
  );
}

export default App;
