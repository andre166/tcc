import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import { adminDrawner, cadastradorDrawner, gerencialDrawner, userDrawner } from '../leftDrawner/drawnerList';

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
  const [state, setState] = React.useState({
    left: false,
  });
  const [ credencial, setCredencial ] = useState('');

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  useEffect(() => {

    let response = JSON.parse(localStorage.getItem("userInfo"));
    
    if(response){
        let userPerfil = response.perfil;
        setCredencial(userPerfil)
    }

  }, []);

  const renderBtns = ( text ) => {

    if(text.func){

      return(
          // <Link className={classes.link} }> 
              <ListItem button key={text.nome} className={classes.link} onClick={() => text.func(renderNavbar.bind(this))}>
                  <span style={{ marginRight: 10 }}>{text.icone} </span> {text.nome}  
              </ListItem>
          // </Link>
      )
    }else{
        return(
            <Link to={text.link} className={classes.link} onClick={() => ''}> 
                <ListItem button key={text.nome} className={classes.link}>
                    <span style={{ marginRight: 10 }}>{text.icone} </span> {text.nome}  
                </ListItem>
            </Link>
        )

    }

  }

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {credencial && credencial === 'ROLE_ADMIN' &&       
                <>
                    <List>
                        { adminDrawner.map( text => (

                            renderBtns(text)

                        ))}
                    </List>

                    {/* <Divider /> */}
                </>
            }

            {credencial && credencial !== 'ROLE_ADMIN' && 
                <>
                
                    <div className={classes.adminTextSidenav}>
                        <span>Admin2</span>
                    </div>

                    <List>
                        { cadastradorDrawner.map((text, index) => (
                            <Link to={text.link} className={classes.link}> 
                                <ListItem button key={text.nome} className={classes.link}>
                                    <span style={{marginRight: 5}}>{text.icone} </span> {text.nome}  
                                </ListItem>
                            </Link>
                        ))}
                    </List>

                    <Divider />
                </>
            }

            {credencial && credencial !== 'ROLE_ADMIN' && 
                <>
                    <div className={classes.adminTextSidenav}>
                        <span>Usuário1</span>
                    </div>


                    <List>
                        { gerencialDrawner.map( text => (
                            <Link to={text.link} className={classes.link}> 
                                <ListItem button key={text.nome} className={classes.link}>
                                    <span style={{marginRight: 5}}>{text.icone} </span> {text.nome}  
                                </ListItem>
                            </Link>
                        ))}
                    </List>


                    <Divider />
                </>
            }

            {credencial && credencial !== 'ROLE_ADMIN' && 

                <>
                    <div className={classes.adminTextSidenav}>
                        <span>Usuário2</span>
                    </div>


                    <List>
                        { userDrawner.map( text => (
                            <Link to={text.link} className={classes.link} onClick={() => text.func(renderNavbar.bind(this))}> 
                                <ListItem button key={text.nome} className={classes.link}>
                                    <span style={{ marginRight: 5 }}>{text.icone} </span> {text.nome}  
                                </ListItem>
                            </Link> 
                        ))}

                    </List>
                </>
            }
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