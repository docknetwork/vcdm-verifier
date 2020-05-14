import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Toolbar, AppBar, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';

import dockLogo from '../assets/logo.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  logo: {
    marginTop: '10px',
  },
  appBar: {
    height: '70px',
    boxShadow: '0 3px 12px -3px rgba(0, 0, 0, 0.09)',
  },
  nav: {
    marginLeft: 'auto',
  },
  navItem: {
    padding: '20px',
    fontFamily: "'Nunito Sans', sans-serif",
    fontSize: 18,
    fontWeight: 400,
    lineHeight: '26px',
    letterSpacing: '0.2px',
    color: '#435665',
    '&:hover': {
      color: '#2887de'
    }
  },
  menuButton: {
    marginLeft: 'auto',
    marginTop: '5px',
  },
  hide: {
    display: 'none',
  },
  content: {
    maxWidth: '100vw',
    flexGrow: 1,
    paddingTop: theme.spacing(3),
  },
}));


export default function Layout({ children, darkMode, toggleDarkMode }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar color="inherit" className={classes.appBar}>
        <Toolbar>
          <a href="https://dock.io" target="_blank" rel="noreferrer noopener">
            <img src={dockLogo} className={classes.logo} />
          </a>

          {/*<IconButton
            color="inherit"
            aria-label="toggle dark mode"
            onClick={toggleDarkMode}
            edge="start"
            className={clsx(classes.menuButton)}
          >
            {darkMode ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>*/}

          <nav className={clsx(classes.nav)}>
            <a href="https://www.dock.io/#Features"
              target="_blank"
              rel="noreferrer noopener"
              className={clsx(classes.navItem)}>
              Features
            </a>
            <a href="https://www.dock.io/#Getting-started"
              target="_blank"
              rel="noreferrer noopener"
              className={clsx(classes.navItem)}>
              Getting Started
            </a>
            <a href="https://www.dock.io/docs"
              target="_blank"
              rel="noreferrer noopener"
              className={clsx(classes.navItem)}>
              Docs
            </a>
            <a href="https://www.dock.io/case-study-verifiable"
              target="_blank"
              rel="noreferrer noopener"
              className={clsx(classes.navItem)}>
              Case Study
            </a>
            <a href="https://blog.dock.io/"
              target="_blank"
              rel="noreferrer noopener"
              className={clsx(classes.navItem)}>
              Blog
            </a>
            <a href="https://www.dock.io/contact"
              target="_blank"
              rel="noreferrer noopener"
              className={clsx(classes.navItem, {
                [classes.navItemEnd]: true,
              })}>
              Contact
            </a>
          </nav>
        </Toolbar>
      </AppBar>
      <main className={clsx(classes.content)}>
        <div className={classes.drawerHeader} />
        {children}
        <br />
      </main>
    </div>
  );
}
