import React, {useState, useEffect } from 'react';
import Card from './card';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import withWidth from '@material-ui/core/withWidth';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpIcon from '@material-ui/icons/Help';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import GroupIcon from '@material-ui/icons/Group';
import ContactMailRoundedIcon from '@material-ui/icons/ContactMailRounded';
import { getUserPerfil } from '../../../components/services/localStorgeService';
import { 
    renderNavbar, renderLeftDrawner
} from '../../../components/actions/navbarActions';

import { bindActionCreators } from 'redux';

const useStyles = makeStyles((theme) => ({
    root: {
        background: '#eeeeee',
        width:'100%',
        marginTop: 65,
        padding: 10,
        minHeight: 'calc(100vh - 65px)',
        [theme.breakpoints.down('xs')]: {
            marginTop: 55,
        },
    },
    cardsContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
    },
    avatarIcon: {
        width: theme.spacing(6),
        height: theme.spacing(6),
        color: 'rgba(0, 0, 0, 0.54)',
        [theme.breakpoints.down('sm')]: {
            width: theme.spacing(5),
            height: theme.spacing(5),
        },
        [theme.breakpoints.down('xs')]: {
            width: theme.spacing(5),
            height: theme.spacing(5),
        },
    },
 
}));

function Home( props ){

    const changeLeftDrawner = ( id ) => {

        let test = localStorage.getItem("navBarItem");
        
        if(test == id){
            return;
        }
        localStorage.setItem("navBarItem", id);
    
        props.renderLeftDrawner(false);
    }

    const classes = useStyles();
    const perfil = getUserPerfil();

    const defineCols = () => {

        let wd = props.width;
  
        if(wd == 'xl' ){
          return 3;
        }else if(wd == 'lg' ){
          return 3;
        }else if(wd == 'md' ){
          return 2;
        }else if(wd == 'sm' ){
          return 2;
        }if(wd == 'xs' ){
          return 1;
        }
  
    }
    
    return(
        <div className={classes.root}>
            {/* <GridList cellHeight={'100%'} cols={defineCols()} spacing={10}>
                {colunas.map( (col, i) => (
                    <GridListTile key={i} cols={1}>
                        <Card info={col}/>
                    </GridListTile>
                ))}
            </GridList> */}
            <h1>Home</h1>
                
        </div>
    );
    
}

const mapDispatchToProps = dispatch => bindActionCreators({ renderNavbar, renderLeftDrawner }, dispatch)
  
const mapStateToProps =  state => state;
export default connect( mapStateToProps, mapDispatchToProps )(withWidth()(Home))
  
  

