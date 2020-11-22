import React, { useState, useEffect } from 'react';
import verifyUserAuth from '../../../../utils/verificarUsuarioAuth';
import { useHistory } from 'react-router-dom';
import { useStyles } from './style';
import Divider from '@material-ui/core/Divider';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import { Button, Paper } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Formik, Form, ErrorMessage } from 'formik';
import InputLabel from '@material-ui/core/InputLabel';
import GenerateAlert from '../../../../components/errorAlert';
import LightTooltip from '../../../../utils/toolTip';
import LoadingPage from  '../../../../components/loading';
import { listarCidadaoPorTurma  } from '../../../../components/services/cidadaoService';
import { cadastrarParteDeAcidente  } from '../../../../components/services/parteDeAcidenteService';
import { getTurma  } from '../../../../components/services/localStorgeService';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { maskCpf } from '../../../../utils/maskAndValidators/cpf';
import { maskRa } from '../../../../utils/maskAndValidators/ra';
import { maskRg } from '../../../../utils/maskAndValidators/rg';

export default function Saude( ){
    
    let history = useHistory();
    const classes = useStyles();
    const theme = useTheme();
    let [loading, setLoading] = useState(true);
    let [militarList, setMilitarList] = useState([]);
    let [chosenOne, setChosenOne] = useState([]);

    let [descDoFato, setDescDoFato] = useState('');
    let [tratamento, setTratamento] = useState('');
    let [solicitacao, setSolicitacao] = useState('');

    const turma = getTurma();
    

    const xsDownMedia = useMediaQuery(theme.breakpoints.down('xs'));

    useEffect(() => {
        async function isAutenticated(){

            let autenticated = await verifyUserAuth();
        
            if( !autenticated ){
              history.push('/')
            }else{
              loadPage();
            }
        
          } 
        
          isAutenticated();
    }, []);

    const loadPage = async ( ) =>{

        const turmaId = turma.id;

        let cidadaoList = await listarCidadaoPorTurma( turmaId );
        console.log(cidadaoList)
        setMilitarList(cidadaoList);
        setLoading(false);
    }

    const onSubmit = async( ) => {
        
        let parteDeAcidente = {
            id: null,
            descricaoDoFato: descDoFato,
            tratamento: tratamento,
            solicitacao: solicitacao,
            data: '2020',
            cidadao: chosenOne
        }

        console.log("parteDeAcidente", parteDeAcidente)

        await cadastrarParteDeAcidente(parteDeAcidente);

    }

    if(loading){ return <LoadingPage bg={"#bdbfc1"}/>}

    return(
        <Grid className={classes.containerGeral} container direction="column" alignItems="center" >

          <Paper className={classes.paperParteDeAcidente} elevation={1}>

            <Grid container direction="row" alignItems="center" justify="center">

                <Grid item xs>
                    <Grid container alignItems="center" justify="center">
                      <h2>Parte de Acidente</h2>
                    </Grid>
                </Grid>
            </Grid>

            <Divider style={{marginBottom: 10}}/>

            <div style={{ width: 300 }}>
                <Autocomplete
                    disableClearable
                    noOptionsText="Nenhum resultado"
                    onChange={(event, newValue) => {
                        setChosenOne(newValue)
                    }}

                    getOptionLabel={(o, value) => {
                        return o.nomeDeGuerra
                    }}

                    options={militarList.map((option) => option)}
                    renderInput={(params) => (

                        <TextField
                            variant="outlined"
                            {...params}
                            label="Selecione um militar"
                            margin="normal"
                            InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment position="start">
                                  <AccountCircle />
                                </InputAdornment>
                              )
                            }}
                        />

                    )}
                />
            </div>

                {chosenOne.length === undefined && <>
                    
                    
                    <TableContainer component={Paper}>
                        <Table className={classes.table} size="small" aria-label="a dense table">
                            <TableHead style={{background: '#eeeeee'}}>
                                <TableRow>
                                    {chosenOne.numeroRecruta && <TableCell style={{textAlign: 'center'}}>Número</TableCell>}
                                    <TableCell style={{textAlign: 'center'}}>Post/Grad</TableCell>
                                    <TableCell style={{minWidth: 150, textAlign: 'center'}}>Nome de guerra</TableCell>
                                    <TableCell style={{minWidth: 150, textAlign: 'center'}}>Nome Completo</TableCell>
                                    <TableCell style={{textAlign: 'center'}}>cpf</TableCell>
                                    <TableCell style={{textAlign: 'center'}}>RA</TableCell>
                                    <TableCell style={{textAlign: 'center'}}>RG</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                <TableRow key={chosenOne.id} className={classes.hideLastBorder}>
                                    {chosenOne.numeroRecruta && <TableCell style={{textAlign: 'center'}}>{chosenOne.numeroRecruta}</TableCell>}
                                    <TableCell style={{textAlign: 'center'}}>{chosenOne.postGrad}</TableCell>
                                    <TableCell style={{textAlign: 'center'}} >{chosenOne.nomeDeGuerra}</TableCell>
                                    <TableCell style={{textAlign: 'center'}} >{chosenOne.nomeCompleto}</TableCell>
                                    <TableCell style={{textAlign: 'center'}} >{ maskCpf(chosenOne.cpf)}</TableCell>
                                    <TableCell style={{textAlign: 'center'}} >{maskRa(chosenOne.ra)}</TableCell>
                                    <TableCell style={{textAlign: 'center'}} >{maskRg(chosenOne.rg)}</TableCell>
                                </TableRow>
                            </TableBody>

                        </Table>
                    </TableContainer>

            <Formik
            //   validationSchema={cadastroOmShema}
              onSubmit={onSubmit}
              initialValues={{
                nomeOm: 'teste tt tt tt t',
                cnpj: '54510344000170',
                cep: '24325240',
                nomeAbrev: 'teste',
            }}
            render={( { values, handleChange, handleSubmit, errors }) => (

              <Form className={classes.root} noValidate autoComplete="off">

                <Grid  container direction="column" alignItems="center">

                    <Grid style={{padding: 10}}  container direction="row" alignItems="center">
                        <h4 style={{marginBottom: -10, zIndex: 10, background: '#fff', marginLeft: 10, padding: '0px 2px'}}>Descrição do fato*</h4>
                        <textarea className={classes.textAreaCustom} 
                            value={descDoFato}
                            onChange={(e) => setDescDoFato(e.target.value)}
                            placeholder="Exemplo: Sobre o assunto, informo-vos que o SD EP JOÃO relatou que no dia 09 ABR 18 por volta das 18:30 hrs, quando se deslocava do quartel para sua residência, de carona junto com o SD EV ROBERTO, o veículo em que estava acabou colidindo na traseira de um táxi, 
                            ocasionando a batida da cabeça do referido militar no para brisa do veículo. Após o ocorrido o militar foi conduzido para POMN, e foi encaminhado para o HCE onde foi medicado e posteriormente liberado."
                        ></textarea>
                    </Grid>

                    <Grid style={{padding: 10}}  container direction="row" alignItems="center">
                        <h4 style={{marginBottom: -10, zIndex: 10, background: '#fff', marginLeft: 10, padding: '0px 2px'}}>Tratamento*</h4>
                        <textarea className={classes.textAreaCustom}
                            placeholder="Exemplo: A luxação previamente citada, segue em tratamento."
                            value={tratamento}
                            onChange={(e) => setTratamento(e.target.value)}
                         >
                         </textarea>
                    </Grid>

                    <Grid style={{padding: 10}}  container direction="row" alignItems="center">
                        <h4 style={{marginBottom: -10, zIndex: 10, background: '#fff', marginLeft: 10, padding: '0px 2px'}}>Solicitação*</h4>
                        <textarea className={classes.textAreaCustom} 
                            value={solicitacao}
                            onChange={(e) => setSolicitacao(e.target.value)}
                            placeholder="Exemplo: Isto posto, solicito-vos que sejam tomadas as medidas administrativas necessárias para verificação de acidente de serviço, conforme preconiza a documentação de referência.">
                        </textarea>
                    </Grid>

                    <Button style={{margin: '10px 0px'}} type="submit" variant="contained" color="primary" className={classes.buttonSuccess}>
                        Cadastrar
                    </Button>

                </Grid>

              </Form>
          )}
          />
        </>}
        </Paper>   
      </Grid>
    );
}

