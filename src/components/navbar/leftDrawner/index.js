import React, { useEffect } from 'react';
import Drawer from '@material-ui/core/Drawer';
import useStyles from '../sidenavStyles';
import { getUserPerfil } from '../../services/localStorgeService';
import DrawneList from '../DrawnerList';

import { connect } from 'react-redux';

import { 
    renderNavbar, renderLeftDrawner
} from '../../../components/actions/navbarActions';

import { bindActionCreators } from 'redux';

function LeftDrawner( props ){

    const classes = useStyles();

    const perfil = getUserPerfil();
    
    useEffect(() => {

        props.renderLeftDrawner(true);

    }, [props.navbarState.leftDrawnerRender]);

    return (

        <Drawer className={classes.drawer} variant="permanent" anchor="left" open={props.navbarState.open} classes={{ paper: classes.drawerPaper }}>

            <div style={{marginTop: 58}}></div>
            {props.navbarState.leftDrawnerRender && <DrawneList perfil={perfil}/>}

        </Drawer>
    )
}

const mapDispatchToProps = dispatch => bindActionCreators({ renderNavbar, renderLeftDrawner }, dispatch)
  
const mapStateToProps =  state => state;
export default connect( mapStateToProps, mapDispatchToProps )(LeftDrawner)