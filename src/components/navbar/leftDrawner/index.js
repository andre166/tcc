import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import useStyles from '../sidenavStyles';
import { getUserPerfil } from '../../services/localStorgeService';
import DrawneList from '../DrawnerList';

export default function LeftDrawner( { open, renderNavbar } ){

    const classes = useStyles();

    const perfil = getUserPerfil()

    return (

        <Drawer className={classes.drawer} variant="permanent" anchor="left" open={open} classes={{ paper: classes.drawerPaper }}>

            <div style={{marginTop: 65}}></div>
            <DrawneList perfil={perfil} renderNavbar={renderNavbar}/>

        </Drawer>
    )
}