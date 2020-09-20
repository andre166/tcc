import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonIcon from '@material-ui/icons/Person';
import useStyles from './appBarStyle';
import XsDrawner from '../xsDrawner';
import withWidth from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { getUserName } from '../../services/localStorgeService';

function NavbarSuperior({ open, setOpen, renderNavbar}, props) {
    
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const anchorRef = useRef(null);
  const prevOpenUserMenu = useRef(openUserMenu);
  const classes = useStyles();
  // const { width } = props;

  const matches = useMediaQuery('(min-width:960px)');

  // const handleDrawerOpen = () => {
  //   setOpen(!open);
  // };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenUserMenu(false);
    }
  }
    
  const handleToggle = () => {
    setOpenUserMenu((prevOpenUserMenu) => !prevOpenUserMenu);
  };

  useEffect(() => {
    if (prevOpenUserMenu.current === true && open === false) {
      anchorRef.current.focus();
    }
  
    prevOpenUserMenu.current = openUserMenu;
  }, [openUserMenu]);

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
  
    setOpenUserMenu(false);
  };

  const sair = ( renderNavBar ) => {
    window.location.assign("/")
    renderNavBar(false);
  }
    let userName = getUserName();

    return (
      <>
        <CssBaseline />
        <AppBar position="fixed" className={clsx(classes.appBar, { [classes.appBarShift]: open, })} >
          <Toolbar>

              <div style={{display: matches && 'none'}}>
                <XsDrawner renderNavbar={renderNavbar}/>
              </div>

            <Typography variant="h6" className={classes.grow}> SCEM </Typography>

            <IconButton ref={anchorRef} aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true" onClick={handleToggle} edge="start" className={classes.menuButtonTeste}
            >

              <div className={classes.accountMenuBtn}>
                <AccountCircleIcon style={{marginRight: 4}} className={classes.xsFont14}/>
                <Typography noWrap variant="subtitle2" component="h6">
                   {userName}
                </Typography>
              </div>

            </IconButton>

            <Popper open={openUserMenu} anchorEl={anchorRef.current} role={undefined} transition disablePortal >

                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                        transformOrigin:
                        placement === 'bottom' ? 'center top' : 'center bottom',
                    }}
                    >

                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>

                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown} >
                          <MenuItem onClick={handleClose}><PersonIcon style={{marginRight: 4}}/>Perfil</MenuItem>
                          <MenuItem onClick={sair}><ExitToAppIcon style={{marginRight: 4}}/>Sair</MenuItem>
                        </MenuList>

                        </ClickAwayListener>
                    </Paper>

                  </Grow>
                )}

              </Popper>

                </Toolbar>

            </AppBar>
      </>
    )
}

NavbarSuperior.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default withWidth()(NavbarSuperior);
