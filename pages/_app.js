import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { PageTransition } from 'next-page-transitions';
import React, { useState, useMemo } from 'react';
import App from 'next/app';
import 'normalize.css';

import Layout from '../components/layout';

const TIMEOUT = 250;

const AppWrapper = ({ children }) => {
  const [prefersDarkMode, setDarkMode] = useState(false);
  const theme = useMemo(
    () => {
      const palette = {
        type: prefersDarkMode ? 'dark' : 'light',
        primary: {
          main: '#2074bd',
        },
      };

      if (!prefersDarkMode) {
        palette.background = {
          default: '#f9fafb',
        };
      }

      const bodyTypography = {
        fontFamily: "'Nunito Sans', sans-serif",
      };

      const defaultTheme = createMuiTheme();
      const typography = {
        fontFamily: 'Montserrat, sans-serif',
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
        color: 'rgb(8, 0, 34)',
        button: bodyTypography,
        subtitle1: bodyTypography,
        subtitle2: bodyTypography,
        body1: bodyTypography,
        body2: {
          ...bodyTypography,
          fontSize: 16,
        },
        h5: bodyTypography,
        h6: {
          fontWeight: 500,
        },
        h1: {
          fontSize: 60,
          lineHeight: '60px',
          fontWeight: 700,
          [defaultTheme.breakpoints.down('sm')]: {
            fontSize: 50,
            lineHeight: '50px',
          }
        },
      };

      return createMuiTheme({
        typography,
        palette,
      });
    },
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
  render() {
    const { Component, pageProps } = this.props;
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
