import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import DrawnerList from '../DrawnerList';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { getUserPerfil } from '../../services/localStorgeService';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  menuIcon:{
      color: '#fefefe'
  },
  link: {
    textDecoration: 'none !important',
    color: '#1d3724 !important',
    letterSpacing: 1,
    '&:hover': {
      backgroundColor: '#1d3724 !important',
      color: '#fff !important',
    }
  },
});

export default function SwipeableTemporaryDrawer( { renderNavbar } ) {
  const classes = useStyles();
  const [state, setState] = React.useState({left: false});

  const perfil = getUserPerfil();

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >

      <DrawnerList perfil={perfil}/>

    </div> 
  );

  return (
    <div>
        <React.Fragment key={'left'}>

        <IconButton className={classes.margin} onClick={toggleDrawer('left', true)}>
          <MenuIcon className={classes.menuIcon} fontSize="inherit" />
        </IconButton>

          <SwipeableDrawer
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
            onOpen={toggleDrawer('left', true)}
          >
            {list('left')}
          </SwipeableDrawer>
        </React.Fragment>
    </div>
  );
}