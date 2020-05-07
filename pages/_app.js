import React from 'react';
import App from 'next/app';
import {MuiThemeProvider} from '@material-ui/core/styles';
import {PageTransition} from 'next-page-transitions';
import 'normalize.css';

import materialTheme from '../components/theme';
import Layout from '../components/layout';

import dock from '@docknetwork/sdk';

const TIMEOUT = 250;

class MyApp extends App {
  constructor(props) {
    super(props);
    this.state = {
      connected: false,
    };
  }

  componentDidMount() {
    // dock.init('ws://127.0.0.1:9944')
    //   .then(() => {
    //     this.setState({
    //       ...this.state,
    //       connected: true,
    //     });
    //   });
  }

  componentWillUnmount() {
    // TODO: disconnect from node
  }

  render() {
    const {Component, pageProps} = this.props;
    return (
      <>
        <MuiThemeProvider theme={materialTheme}>
          <Layout {...this.state}>
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
          </Layout>
        </MuiThemeProvider>
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
