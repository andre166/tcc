import React, {useState, useEffect, useRef} from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import { useParams, useHistory} from 'react-router-dom';
import { listarOm } from '../../../../components/services/omServices';
import { Paper } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Grid from '@material-ui/core/Grid';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Divider from '@material-ui/core/Divider';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ContactsIcon from '@material-ui/icons/Contacts';
import SubjectIcon from '@material-ui/icons/Subject';
import DescriptionIcon from '@material-ui/icons/Description';
import { maskCnpj } from '../../../../utils/maskAndValidators/cnpj';
import { maskCep } from '../../../../utils/maskAndValidators/cep';
import ShowRelatorio from 'material-table';
import {colunaSubunidade} from '../../../../utils/columns/colunaSubunidade';
import { Link} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    verifiOm: {
        width: '100%',
        height: '100%',
        border: '1px solid green'
    },
    teste:{
        position: 'relative',
        height: '100%'
    },
    containerGeral: {
        width: '100%',
        maxWidth: 1100,
        marginTop: 70,
    },
    leftNavBar:{
        height: 'calc(100% - 77px) !important',
        borderRight: '1px solid #d6e0f0',
    },
    root: {
        maxWidth: 200,
        backgroundColor: theme.palette.background.paper,
      },
      nested: {
        paddingLeft: theme.spacing(4),
      },
      divInfo:{
        height: 'calc(100% )',
      },
      geral:{
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
        maxWidth: 500
      },
      tituloGeral:{
          fontWeight: 'bold'
      }
  }));

export default function InfoMenu( { om, page } ){

    const classes = useStyles();
    let idParams = useParams();
    const history = useHistory();
    const { id } = idParams;

    function getEfetivoCount(){

        let efetivo = 0;

        // om.subunidades.map( su => {
        //     efetivo += su.cidadao.length
        // })

        return efetivo;
    }

    return(
        <>
            {page == 'geral' && om && <Grid item xs style={{height: 'calc(100% - 77px)'}}>
                <Grid container direction="row" justify="center" align="center">
                    <Paper className={classes.geral}>

                        <p> <span className={classes.tituloGeral}>Nome</span>: {om.nomeOm}</p>
                        <Divider/>
                        <p><span className={classes.tituloGeral}>Nome Abreviado</span>: {om.nomeAbrev}</p>
                        <Divider/>
                        <p><span className={classes.tituloGeral}>Cnpj</span>: {maskCnpj(om.cnpj)}</p>
                        <Divider/>
                        <p><span className={classes.tituloGeral}>Cep</span>: {maskCep(om.cep)}</p>
                        <Divider/>
                        <p><span className={classes.tituloGeral}>Subunidade</span>: {om.subunidades.length}</p>
                        <Divider/>
                        <p><span className={classes.tituloGeral}>Quantidade de usuários</span>: {om.usuario.length}</p>
                        <Divider/>
                        <p><span className={classes.tituloGeral}>Efetivo</span>: {getEfetivoCount()}</p>
                        <Divider/>
                        <p><span className={classes.tituloGeral}>Baixados</span>: Breve</p>
                        <Divider/>
                        <p><span className={classes.tituloGeral}>Férias</span>: Breve</p>
                        <Divider/>
                        <p><span className={classes.tituloGeral}>Missão</span>: Breve</p>
                        <Divider/>
                        <p><span className={classes.tituloGeral}>Outros destinos</span>: Breve</p>

                    </Paper>
                </Grid>
            </Grid>}

        {page == 'usuario' && om &&<Grid item xs style={{height: 'calc(100% - 77px)'}}>
            <div className={classes.divInfo}>
                <ShowRelatorio relatorio={om.usuario} customColumns={colunaSubunidade}/>
            </div>
        </Grid>}

        { om && om.subunidades.map( su => (
            page == su.id && <Grid item xs style={{height: 'calc(100% - 77px)'}}>
                {/* <div className={classes.divInfo}> */}
                <Grid container direction="row" justify="center" align="center">
                    <Paper className={classes.geral}>
                        <strong><h3>{su.nomeSubunidade}</h3></strong>
                        <Divider/>
                        <p> <span className={classes.tituloGeral}>Efetivo:</span> Breve</p>
                        <Divider/>
                        <p> <span className={classes.tituloGeral}>Em condição:</span> Breve</p>
                        <Divider/>
                        <p> <span className={classes.tituloGeral}>Baixados:</span> Breve</p>
                        <Divider/>
                        <p> <span className={classes.tituloGeral}>Férias:</span> Breve</p>
                        <Divider/>
                        <p> <span className={classes.tituloGeral}>Missão:</span> Breve</p>
                        <Divider/>
                        <p> <span className={classes.tituloGeral}>Outros destinos:</span> Breve</p>
                        <Divider/>
                    </Paper>
                </Grid>
                {/* </div> */}
            </Grid>
        ))}

        {page == 'subunidade0' && om &&<Grid item xs style={{height: 'calc(100% - 77px)'}}>
            <Grid container direction="row" justify="center" align="center">
                <Paper className={classes.geral}>
                    <h4>Nenhuma subunidade cadastrada</h4>
                    <p>Para cadastrar uma cadastrar subunidade 
                        <Link to={{pathname: `/Subunidade`}}> clique aqui.</Link>
                    </p>
                </Paper>
            </Grid>
            
        </Grid>}
    </>

    )
}
