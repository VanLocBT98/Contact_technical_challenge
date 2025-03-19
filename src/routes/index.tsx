import React, { Suspense } from 'react';

import { createBrowserRouter } from 'react-router-dom';

import EditStandard from '~/pages/services/editStandard';

// Containers Layout
const ExampleLayout = React.lazy(() => import('~/layouts/ExampleLayout'));
const Normal = React.lazy(() => import('~/pages/services/normal'));
const Standard = React.lazy(() => import('~/pages/services/standard'));
const Premium = React.lazy(() => import('~/pages/services/premium'));

// Pages
const Home = React.lazy(() => import('~/pages/home'));

const router = createBrowserRouter([
  {
    path: '',
    element: (
      <Suspense>
        <ExampleLayout />
      </Suspense>
    ),
    children: [
      {
        path: '',
        element: (
          <Suspense>
            <Home />
          </Suspense>
        )
      },
      {
        path: 'services',
        children: [
          {
            path: 'normal',
            element: (
              <Suspense>
                <Normal />
              </Suspense>
            )
          },
          {
            path: 'standard',

            children: [
              {
                path: '',
                element: (
                  <Suspense>
                    <Standard />
                  </Suspense>
                )
              },
              {
                path: 'edit/:id',
                element: (
                  <Suspense>
                    <EditStandard />
                  </Suspense>
                )
              }
            ]
          },
          {
            path: 'premium',
            element: (
              <Suspense>
                <Premium />
              </Suspense>
            )
          }
        ]
      }
    ]
  }
]);
export default router;
