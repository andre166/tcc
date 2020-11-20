import React, { useState, useEffect } from 'react';
import verifyUserAuth from '../../../../utils/verificarUsuarioAuth';
import { useHistory, useParams } from 'react-router-dom';
import { useStyles } from './style';
import Divider from '@material-ui/core/Divider';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import { Button, Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import LoadingPage from  '../../../../components/loading';
import { listarCidadaoPorId } from  '../../../../components/services/cidadaoService';
import { alterarStatus } from '../../../../components/services/statusService';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import { cidadaoStatus } from '../../../../utils/cidadaoStatus';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from 'moment';
import getTime from 'date-fns/getTime';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';

export default function Status( ){
    
    let history = useHistory();
    let { id } = useParams();
    const classes = useStyles();
    const theme = useTheme();

    let [loading, setLoading] = useState(true);
    let [militar, setMilitar] = useState('');
    let [ status, setStatus ] = useState('');

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

    let [ data1, setData1 ] = useState('');
    let [ data2, setData2 ] = useState('');
    let [ descricao, setDescricao ] = useState('');

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      }

    const xsDownMedia = useMediaQuery(theme.breakpoints.down('xs'));

    useEffect(() => {
        async function isAutenticated(){

            let autenticated = await verifyUserAuth( id );
        
            if( !autenticated ){
              history.push('/')
            }else{
              loadPage();
            }
        
          } 
        
          isAutenticated();
    }, []);

    const loadPage = async ( ) => {

        let cidadao = await listarCidadaoPorId( id );
        console.log("a", cidadao)
        setMilitar(cidadao);
        setLoading(false);
    }

    const onSubmit = async ( ) => {
        
        var result = getTime(new Date(data1))
        var result2 = getTime(new Date(data2))

        if( result >  result2){
            handleClick();
            return;
        }

        let data1Formatada = moment( data1 ).utc().format('DD/MM/YYYY');
        let data2Formatada = moment( data2 ).utc().format('DD/MM/YYYY');

        let idST = militar.status.id;
        let militarId = militar.id;

        let st = status.status;
        let novoStatus = {
            id: idST, 
            tipo: st, 
            inicio: data1Formatada, 
            fim: data2Formatada, 
            descricao: descricao || null,
            cidadaoId: militarId
        }

        console.log("novoStatus", novoStatus)
        console.log("status", status.status)

        await alterarStatus( novoStatus );
    }

    if(loading){ return <LoadingPage bg={"#bdbfc1"}/>}

    return(
        <Grid className={classes.containerGeral} container direction="column" alignItems="center" justify="center">

          <Paper className={classes.paperCadastrarOm} elevation={3}>

            <Grid container direction="row" alignItems="center" justify="center">
                <div>
                    <Button 
                        size='small'
                        style={{marginTop: '-40px',marginLeft: '-8px', position: 'absolute'}}
                        variant="outlined"
                        color="primary"
                        startIcon={<KeyboardReturnIcon />}
                        onClick={ () => history.goBack()}
                    >
                        {!xsDownMedia && 'Voltar'}
                    </Button>

                </div>

                <Grid item xs>
                    <Grid container alignItems="center" justify="center">
                      <h2>Alterar status</h2>
                    </Grid>
                </Grid>
            </Grid>

            {militar && 
                <Accordion style={{marginBottom: 14, width: '90%'}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>Descrição do Militar</Typography>
                    </AccordionSummary>
                        <List dense="true" disablePadding>
                            {militar.numeroRecruta && <ListItem>
                                <ListItemText primary="Número de recruta:" secondary={militar.numeroRecruta} />
                            </ListItem>}
                            <Divider/>
                            <ListItem>
                                <ListItemText primary="Post/Grad:" secondary={militar.postGrad} />
                            </ListItem>
                            <Divider/>

                            <ListItem>
                                <ListItemText primary="Nome completo:" secondary={militar.nomeCompleto} />
                            </ListItem>
                            <Divider/>

                            <ListItem>
                                <ListItemText primary="Nome de guerra:" secondary={militar.nomeDeGuerra} />
                            </ListItem>
                            <Divider/>

                            <ListItem>
                                <ListItemText primary="Status:" secondary={militar.status.tipo} />
                            </ListItem>

                            <Divider/>

                            <ListItem>
                                <ListItemText primary="Data:" secondary={`Início: ${militar.status.inicio}  -  Fim: ${militar.status.fim}`} />
                            </ListItem>

                            <ListItem>
                                <ListItemText primary="Descrição do Status:" secondary={militar.status.descricao} />
                            </ListItem>

                            <Divider/>

                        </List>
                </Accordion>
            }


            <FormControl >
                <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    {cidadaoStatus.map( s => (
                        <MenuItem value={s}>{s.status}</MenuItem>
                    ))}
                </Select>
                <FormHelperText>Selecione um status para altera-lo</FormHelperText>
            </FormControl>

            {status &&  status.status !== 'OK' && 
                <>
                    <div style={{minHeight: 1, background: "#D1D1D1", width: '100%', margin: '10px 0px'}}></div>

                    <Grid container direction="row" justify="space-around" alignItems="center" style={{marginTop: 10}}>

                        <Grid item xs={12} sm={6}>
                            <Grid container justify="space-around" alignItems="center">
                            <TextField    
                                required                
                                label="Início"
                                type="date"
                                value={data1}
                                onChange={(e) => setData1(e.target.value)}
                                className={classes.textField}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                            </Grid>

                        </Grid>
                        
                        <Grid item xs={12} sm={6}>
                            <Grid container justify="space-around" alignItems="center">
                                    
                                <TextField
                                    style={{marginTop: xsDownMedia && 15}}
                                    required
                                    label="Término"
                                    type="date"
                                    value={data2}
                                    onChange={(e) => setData2(e.target.value)}
                                    defaultValue="2017-05-24T10:30"
                                    className={classes.textField}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                />

                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={12}>

                        <div style={{minHeight: 1, background: "#D1D1D1", width: '100%', margin: '20px 0px'}}></div>

                                <h4>Descrição:</h4>

                            <Grid container direction="row" justify="space-around" alignItems="center" >
                                <TextareaAutosize
                                    value={descricao} 
                                    onChange={(e) => setDescricao(e.target.value)}
                                    placeholder="Descreva aqui o motivo da alteração do status. Ex: Acidentou-se em prática desportiva." 
                                    style={{width: '90%',minWidth: 300, minHeight: 200}}
                                    maxLength="255"
                                />
                            </Grid>
                            <div  style={{marginLeft: 27}}>
                                <div style={{fontSize: '9pt'}}>Quantidade máxima de caracter: 255</div>
                                <div style={{fontSize: '9pt'}}>Restando: {255 - descricao.length}</div>
                            </div>

                        </Grid>

            
                    </Grid>

                </>

            }

            <Button onClick={onSubmit}
            disabled={status == '' ? true : status.status == 'OK' ? false : data1 == '' || data2 == '' && true} 
            variant="contained" color="primary" style={{marginTop: 20}}>Alterar Status</Button>

        </Paper>  

        <Snackbar
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Note archived"
        >
            <Alert onClose={handleClose} severity="error">
                Data de término não pode ser menor que a data de início, favor corrigir.
            </Alert>
        </Snackbar>

      </Grid>
    );
}

