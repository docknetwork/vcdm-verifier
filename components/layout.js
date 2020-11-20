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
    flexDirection: 'column',
    minHeight: '100vh',
  },
  logo: {
    marginTop: '12px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '17px',
    }
  },
  appBar: {
    height: '70px',
    boxShadow: '0 3px 12px -3px rgba(0, 0, 0, 0.09)',
  },
  nav: {
    marginLeft: 'auto',
    marginTop: '2px',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
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
      color: '#2887de',
    },
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
  footer: {
    marginTop: '0px',
    paddingBottom: '46px',
    backgroundColor: '#222222',
  },
  footerInner: {
    display: 'flex',
    maxWidth: '1170px',
    marginRight: 'auto',
    marginLeft: 'auto',
    padding: '61px 10px',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      padding: '61px 20px',
    }
  },
  footerDivBlock16: {
    display: 'flex',
    width: '160px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0',
      marginBottom: '26px'
    }
  },
  footerDivBlock14: {
    order: 0,
    flex: 1,
    display: 'flex',
    alignItems: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  footerDivBlock15: {
    display: 'flex',
    width: '370px',
    justifyContent: 'center',
    alignItems: 'stretch',
    alignSelf: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginTop: '5px'
    }
  },
  iconContainer: {
    display: 'flex',
    width: '30px',
    height: '30px',
    marginRight: '18px',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    opacity: 0.8,
    textAlign: 'left',
    '&:last-child': {
      marginRight: '0',
    },
  },
  bottomLinks: {
    display: 'inline-block',
    marginLeft: '52px',
    fontFamily: '"Nunito Sans", sans-serif',
    color: '#ffffff',
    fontSize: '18px',
    lineHeight: '34px',
    fontWeight: 300,
    letterSpacing: '0.2px',
    marginLeft: '52px',
    '&:first-child': {
      marginLeft: '37px',
      [theme.breakpoints.down('sm')]: {
        marginLeft: '0',
      }
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0',
      marginBottom: '19px'
    }
  },
  footerLink: {
    color: '#c5c5c5',
    textDecoration: 'none',
    '&:hover': {
      color: '#ffffff',
    },
  }
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

          {/* <IconButton
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
          </IconButton> */}

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
      <br />
      <footer className={clsx(classes.footer)}>
        <div className={clsx(classes.footerInner)}>
          <div className={clsx(classes.footerDivBlock16)}>
            <a href="https://dock.io" target="_blank" rel="noreferrer noopener">
              <img src="https://uploads-ssl.webflow.com/5e97941735e37a5ef19d10aa/5e9a3dfefb5d853d04f5358b_dock-white.svg" alt=""/>
            </a>
          </div>
          <div className={clsx(classes.footerDivBlock14)}>
            <div className={clsx(classes.bottomLinks)}>
              <a href="https://www.dock.io/#Features"
                target="_blank"
                rel="noreferrer noopener"
                className={clsx(classes.footerLink)}>
                Features
              </a>
              <br />

              <a href="https://www.dock.io/#Getting-started"
                target="_blank"
                rel="noreferrer noopener"
                className={clsx(classes.footerLink)}>
                Getting started
              </a>
              <br />

              <a href="https://www.dock.io/docs"
                target="_blank"
                rel="noreferrer noopener"
                className={clsx(classes.footerLink)}>
                Docs
              </a>
            </div>
            <div className={clsx(classes.bottomLinks)}>
              <a href="https://www.dock.io/case-study-verifiable"
                target="_blank"
                rel="noreferrer noopener"
                className={clsx(classes.footerLink)}>
                Case Study
              </a>
              <br />
              <a href="https://www.dock.io/privacy"
                target="_blank"
                rel="noreferrer noopener"
                className={clsx(classes.footerLink)}>
                Privacy
              </a>
            </div>
            <div className={clsx(classes.bottomLinks)}>
              <a href="https://blog.dock.io/"
                target="_blank"
                rel="noreferrer noopener"
                className={clsx(classes.footerLink)}>
                Blog
              </a>
              <br />
              <a href="https://www.dock.io/contact"
                target="_blank"
                rel="noreferrer noopener"
                className={clsx(classes.footerLink)}>
                Contact
              </a>
            </div>
          </div>
          <div className={clsx(classes.footerDivBlock15)}>
            <a telegram="Telegram" href="https://t.me/dockio" target="_blank" rel="noreferrer noopener" className={clsx(classes.iconContainer)}>
              <img src="https://uploads-ssl.webflow.com/5e97941735e37a5ef19d10aa/5e9a3e1d4c5ff9e1e7b9ec93_icn-telegram.svg" alt=""/>
            </a>
            <a href="https://www.reddit.com/r/dockio" target="_blank" rel="noreferrer noopener" className={clsx(classes.iconContainer)}>
              <img src="https://uploads-ssl.webflow.com/5e97941735e37a5ef19d10aa/5e9a3e1d9aae7e61b7ae296f_icn-reddit.svg" reddit="Reddit" alt=""/>
            </a>
            <a medium="Medium" href="https://medium.com/dock" target="_blank" rel="noreferrer noopener" className={clsx(classes.iconContainer)}>
              <img src="https://uploads-ssl.webflow.com/5e97941735e37a5ef19d10aa/5e9a3e1db27cf652eb928319_icn-medium.svg" alt=""/>
            </a>
            <a twitter="Twitter" href="https://twitter.com/docknetwork" target="_blank" rel="noreferrer noopener" className={clsx(classes.iconContainer)}>
              <img src="https://uploads-ssl.webflow.com/5e97941735e37a5ef19d10aa/5e9a3e1dd3886a0e62ea2662_icn-twitter.svg" alt=""/>
            </a>
            <a facebook="Facebook" href="https://www.facebook.com/docknetwork/" target="_blank" rel="noreferrer noopener" className={clsx(classes.iconContainer)}>
              <img src="https://uploads-ssl.webflow.com/5e97941735e37a5ef19d10aa/5e9a3e1ce014f94eaf990163_icn-facebook.svg" alt=""/>
            </a>
            <a github="Github" href="https://github.com/docknetwork" target="_blank" rel="noreferrer noopener" className={clsx(classes.iconContainer)}>
              <img src="https://uploads-ssl.webflow.com/5e97941735e37a5ef19d10aa/5e9a3e1db27cf6e3aa928315_icn-github.svg" alt=""/>
            </a>
            <a binance="Binance" href="https://www.binance.com/en/trade/DOCK_BTC" target="_blank" rel="noreferrer noopener" className={clsx(classes.iconContainer)}>
              <img src="https://uploads-ssl.webflow.com/5e97941735e37a5ef19d10aa/5e9a3e1c572a4918c6c7a603_icn-b.svg" alt=""/>
            </a>
            <a riot="Riot" href="https://riot.im/app/#/room/#!KpPIERdKQjLTTwsOkn:matrix.org" target="_blank" rel="noreferrer noopener" className={clsx(classes.iconContainer)}>
              <img src="https://uploads-ssl.webflow.com/5e97941735e37a5ef19d10aa/5e9a3e1d9aae7e417bae296e_icn-riot.svg" alt=""/>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
