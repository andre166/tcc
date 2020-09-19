import React, { useState } from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Link } from 'react-router-dom';
import Routes from '../../routes';
import useStyles from './leftDrawner/sidenavStyles';
import AppBar from './appBar';
import LeftDrawner from './leftDrawner';
import Login from '../../pages/login';
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';

import { connect } from 'react-redux';

import { 
    renderNavbar, 
} from '../../components/actions/navbarActions';

import { bindActionCreators } from 'redux';

function PersistentDrawerLeft( props ) {

  const classes = useStyles();
  
  const [ open, setOpen ] = useState(true);

  return (

    <BrowserRouter style={{minHeight: "100% !important"}}>
      <div className={classes.root}  style={{height: "100% !important"}}>

        {props.navbarState.renderNavBar == false ? '' :  
          <div style={{minHeight: "100% !important"}}>
            {/* <CssBaseline /> */}
              <AppBar open={open} setOpen={setOpen} classes={classes} useStyles={useStyles} renderNavbar={props.renderNavbar}/>
              <Hidden smDown>
                <LeftDrawner open={open} renderNavbar={props.renderNavbar}/>  
              </Hidden>
          </div>
        }

        <main className={clsx(classes.content, { [classes.contentShift]: open })} style={{height: "100% !important"}} >

          <div className={classes.mainContent}  style={{height: "100% !important"}}>
            <Routes  style={{height: "100% !important"}}/>
          </div>

        </main>

      </div>
    </BrowserRouter>
  );
}

const mapDispatchToProps = dispatch => bindActionCreators({ renderNavbar }, dispatch)
  
const mapStateToProps =  state => state;
export default connect( mapStateToProps, mapDispatchToProps )(withWidth()(PersistentDrawerLeft))