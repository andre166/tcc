import React, {useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { listarOm } from '../../components/services/omServices';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from './card';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { Paper } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Link} from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import AddBoxIcon from '@material-ui/icons/AddBox';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import LightTooltip from '../../utils/toolTip';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpIcon from '@material-ui/icons/Help';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import GroupIcon from '@material-ui/icons/Group';
import ContactMailRoundedIcon from '@material-ui/icons/ContactMailRounded';

import { 
    renderNavbar, 
} from '../../components/actions/navbarActions';

import { bindActionCreators } from 'redux';

const useStyles = makeStyles((theme) => ({
    root: {
        background: '#eeeeee',
        width:'100%',
        marginTop: 65,
        padding: 10,
        minHeight: 'calc(100vh - 65px)',
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

    const classes = useStyles();

    const colunas =  [

        { 
            icon: <SettingsIcon className={classes.avatarIcon}/>, 
            title: 'Configurações', desc: 'Configurações de usuário', 
            subDesc: 'Editar configuraçõs pré-estabelecidas e informações do próprio usuário',
            link: '/userConfig'
        },
        { 
            icon: <HomeWorkIcon className={classes.avatarIcon}/>, 
            title: 'Organização Militar[OM]', 
            desc: "Gerenciamento de OM", subDesc: "Cadastra, edita, exclui e lista Organizações Militares com suas devidas subunidades",
            link: '/Om'
        },
        { 
            icon: <SupervisedUserCircleIcon className={classes.avatarIcon}/>, 
            title: 'Subunidade[SU]', desc: "Gerenciamento de SU", 
            subDesc: 'Cadastra, edita, exclui, lista de Subunidades com seu devido efetivo e suas informações por ano',
            link: '/Subunidade'
        },
        { 
            icon: <GroupIcon className={classes.avatarIcon}/>, 
            title: 'Usuários', desc: "Gerenciamento de Usuários", 
            subDesc: 'Cadastrar, editar, excluir, alterar senha de usuários do sistema, lista de usuários por OM',
            link: '/GerenciarAdmin'
        },
        { 
            icon: <ContactMailRoundedIcon className={classes.avatarIcon}/>, 
            title: 'Administrador geral', desc: 'Fale aqui', 
            subDesc: 'Contato do administrador geral do sistema para relatar erros, pedidos,  dúvidas em geral',
            link: '/Error'
        },
        { 
            icon: <HelpIcon className={classes.avatarIcon}/>, 
            title: 'Ajuda', desc: 'Assistência para utililar o sistema', 
            subDesc: 'Dúvidas sobre o sistema e suas funcionalidades, regras de cadastro',
            link: '/Error'
        }
    ]

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
            <GridList cellHeight={180} cols={defineCols()} spacing={10}>
                {colunas.map( (col, i) => (
                    <GridListTile key={i} cols={1}>
                        <Card info={col}/>
                    </GridListTile>
                ))}
            </GridList>
                
        </div>
    );
    
}

const mapDispatchToProps = dispatch => bindActionCreators({ renderNavbar }, dispatch)
  
const mapStateToProps =  state => state;
export default connect( mapStateToProps, mapDispatchToProps )(withWidth()(Home))
  
  

