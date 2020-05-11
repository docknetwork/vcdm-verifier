import React, { useState, useMemo } from 'react';
import App from 'next/app';
import {PageTransition} from 'next-page-transitions';
import 'normalize.css';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Layout from '../components/layout';

const TIMEOUT = 250;

const AppWrapper = ({children}) => {
  const [prefersDarkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  let localSetting = false;
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('dark-mode')) {
      localSetting = localStorage.getItem('dark-mode') === 'true';
      // setDarkMode(localSetting);
    }
  }

  function toggleDarkMode() {
    localStorage.setItem('dark-mode', prefersDarkMode ? 'false' : 'true');
    setDarkMode(!prefersDarkMode);
  }

  return (
    <MuiThemeProvider theme={theme}>
      <Layout darkMode={prefersDarkMode || localSetting} toggleDarkMode={toggleDarkMode}>
        {children}
      </Layout>
    </MuiThemeProvider>
  );
};

class MyApp extends App {
  constructor(props) {
    super(props);
  }

  render() {
    const {Component, pageProps} = this.props;
    return (
      <>
        <AppWrapper>
          <PageTransition
            timeout={TIMEOUT}
            classNames="page-transition"
            loadingDelay={250}
            loadingTimeout={{
              enter: TIMEOUT,
              exit: 0,
            }}
            loadingClassNames="loading-indicator"
          >
            <Component {...pageProps} />
          </PageTransition>
        </AppWrapper>
        <style jsx global>{`
          .page-transition-enter {
            opacity: 0;
            transform: translate3d(0, 20px, 0);
          }
          .page-transition-enter-active {
            opacity: 1;
            transform: translate3d(0, 0, 0);
            transition: opacity ${TIMEOUT}ms, transform ${TIMEOUT}ms;
          }
          .page-transition-exit {
            opacity: 1;
          }
          .page-transition-exit-active {
            opacity: 0;
            transition: opacity ${TIMEOUT}ms;
          }
          .loading-indicator-appear,
          .loading-indicator-enter {
            opacity: 0;
          }
          .loading-indicator-appear-active,
          .loading-indicator-enter-active {
            opacity: 1;
            transition: opacity ${TIMEOUT}ms;
          }

          a {
            text-decoration: none;
          }
        `}</style>
      </>
    );
  }
}

export default MyApp;
