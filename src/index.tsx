import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import App from './App';
import reportWebVitals from './reportWebVitals';
import store from 'store';
import { ModalContextProvider } from 'contexts';
import { ToastContainer } from 'react-toastify';
import styled, { ThemeProvider } from 'styled-components';
import { light } from 'styles/theme';

import './styles/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';

// react-slick
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const queryClient = new QueryClient();

const StyledContainer = styled(ToastContainer)`
  // https://styled-components.com/docs/faqs#how-can-i-override-styles-with-higher-specificity
  &&&.Toastify__toast-container {
  }
  .Toastify__toast {
    width: 330px;
    height: 58px;
    border-radius: 0;
  }
  .Toastify__toast--error {
    border-left: 3px solid #ff0000;
  }
  .Toastify__toast--success {
    border-left: 3px solid #15979e;
  }
  .Toastify__toast-body {
    div:last-child {
      margin-top: 2px;
    }
  }
`;

Sentry.init({
  dsn: 'https://18ad99fe0a324626a928a0a8d19c8f68@o487415.ingest.sentry.io/6610005',
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen /> */}
        <ModalContextProvider>
          <ThemeProvider theme={light}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen />
          </ThemeProvider>
        </ModalContextProvider>
        <StyledContainer autoClose={5000} hideProgressBar position={'top-center'} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
