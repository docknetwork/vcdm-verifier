import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DoneIcon from '@material-ui/icons/Done';

import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';

import dockLogo from '../assets/logo.svg';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  logo: {
    marginTop: '10px'
  },
  appBar: {
    height: '70px',
    boxShadow: '0 3px 12px -3px rgba(0, 0, 0, 0.09)',
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


export default function Layout({children, darkMode, toggleDarkMode}) {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar color="inherit" className={classes.appBar}>
        <Toolbar>
          <a href="https://dock.io" target="_blank" rel="noreferrer noopener">
            <img src={dockLogo} className={classes.logo} />
          </a>

          <IconButton
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
          </IconButton>
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
