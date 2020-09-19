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
import InfoMenu from './infoMenu';
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

export default function VerificarOm( props ){
    
    const classes = useStyles();
    let idParams = useParams();
    const history = useHistory();
    const { id } = idParams;

    let [om, setOm] = useState("");
 
    const [open, setOpen] = React.useState(false);
    const [usuarios, setUsuarios] = React.useState(false);

    const [page, setPage] = React.useState('geral');

    const [selectedIndex, setSelectedIndex] = React.useState(1);
    let [loading, setLoading] = useState(true);

    const handleClick = () => {
      setOpen(!open);
    };
      
    useEffect(() => {


        const getOm = async( id ) => {

            let _om = await listarOm( id )

            let su = _om.subunidades;

            let qtdCidadao = 0;

            // su.map( s => { //qtd do efetivo geral
            //     qtdCidadao += s.cidadao.length
            // })

            await setOm(_om)

            setLoading(false)

        }

        getOm(id)
        
    }, []); 

    if(loading){ // caso a página esteja carregando mostra uma msg de loading
        return(
          <div className="loading-container">
            <CircularProgress />
          </div>
        )
    }

    return(
        <Grid container direction="row" justify="center" className={classes.verifiOm}>
            
            <Paper  className={classes.containerGeral}>
                <Grid container direction="row" justify="space-between" className={classes.teste}>


                    <Grid container direction="row" justify="center" alignItems="center">
                        <h1 class="text-center">{om.nomeAbrev}</h1>
                        <Divider style={{margin: 10}}/>
                    </Grid>



                    <Paper className={classes.leftNavBar}>

                    
                    <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader" style={{textAlign: 'center'}}>
                                Informações
                            </ListSubheader>
                        }
                        className={classes.root}
                        >
                        <ListItem 
                            button
                            selected={page == 'geral'}
                        >
                        
                            <ListItemIcon>
                            <AssignmentIcon />
                            </ListItemIcon>
                            <ListItemText primary="Geral" onClick={() => setPage('geral')}/>
                        </ListItem>
                        <ListItem 
                            button
                            selected={page == 'usuario'}
                        >
                            <ListItemIcon>
                            <ContactsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Usuario" onClick={() => setPage('usuario')} />
                        </ListItem>
                        {om &&  om.subunidades.length > 0 ? <>
                            <ListItem button onClick={handleClick}>
                            <ListItemIcon>
                            <SubjectIcon />
                            </ListItemIcon>
                            <ListItemText primary="Subunidade" />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>

                                { om.subunidades.map( su => (
                                    <ListItem 
                                    button 
                                    selected={page == su.id}
                                    className={classes.nested} 
                                    onClick={() => setPage(su.id)}
                                    >

                                        <ListItemIcon>
                                        <DescriptionIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={su.nomeSubunidade} />
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                        </> : 
                        
                        <ListItem 
                            button
                            selected={page == 'subunidade0'}
                        >
                        
                            <ListItemIcon>
                            <AssignmentIcon />
                            </ListItemIcon>
                            <ListItemText primary="Subunidade" onClick={() => setPage('subunidade0')}/>
                        </ListItem>
                
                    }
                    </List>
                    </Paper>
                    {/* =================================== */}

                   {om && <InfoMenu om={om} page={page}/>}

                </Grid>
            </Paper>
        </Grid>
    );
    
}
  
  

