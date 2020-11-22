import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Formik, Form, ErrorMessage} from 'formik';
import TextField from '@material-ui/core/TextField';
import cadastrarMilitarSchema from '../../../../utils/schemas/cadastrarMilitarSchema';
import { editarCidadao, listarCidadaoPorId } from '../../../../components/services/cidadaoService';
import { getTurma } from '../../../../components/services/localStorgeService';
import { listarTurma } from '../../../../components/services/turmaService';
import MenuItem from '@material-ui/core/MenuItem';
import ErrorIcon from '@material-ui/icons/Error';
import moment from 'moment';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import { useParams, useHistory} from 'react-router-dom';
import LoadingPage from  '../../../../components/loading';
import verifyUserAuth from  '../../../../utils/verificarUsuarioAuth';
import { rgMasck } from '../../../../components/masks/rgMasck';
import { cpfMasck } from '../../../../components/masks/cpfMasck';
import { telFixoMasck, telMasck } from '../../../../components/masks/telMasck';
import { raMasck } from '../../../../components/masks/raMasck';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';

export default function EditarContato() {

    let idParams = useParams();
    let history = useHistory();
    let turma = getTurma();
    
    const { id } = idParams;

    let dataAtual = new Date();
    let diaAtual = dataAtual.getDate();
    let mesAtual = dataAtual.getMonth() + 1;
    let anoAtual = dataAtual.getFullYear();
    
    if( mesAtual < 10){
        mesAtual = "0" + mesAtual;
    }

    if( diaAtual < 10 ){
        diaAtual = "0" + diaAtual;
    }

    let dataString = anoAtual + '-' + mesAtual + '-' + diaAtual;

    let [ cidadao, setCidadao] = useState("");
    let [ cidadaoEndereco, setCidadaoEndereco] = useState("");

    let [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadPage = async() => {

            let cidadaoComEndereco = await listarCidadaoPorId( id );
            console.log("cidadaoComEndereco", cidadaoComEndereco)
            
            if( cidadaoComEndereco){

                setCidadao(cidadaoComEndereco);
                setCidadaoEndereco(cidadaoComEndereco.endereco || '');
                setLoading(false);
            }
        }

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
    
    const arrayDeGraduacoes = [
        {grad: 'SGT'}, {grad: 'CB'},{grad: 'SD EP'}, {grad: 'SD EV'}
    ]

    const arrayDeGeneros = [
        'Masculino', 'Feminino'
    ]

    const arrayDeEstadoCivil = [
        'Solteiro', 'Casado','Divorciado', 'Viúvo'
    ]

    const arrayDeTiposDeTelefones = [
        'Fixo', 'Celular'
    ]

    const arrayDeComportamentos = [
        'I', 'R', 'B', 'MB', 'E'
    ]

    async function onSubmit( values ){
        
        let turmaId = await getTurma();

        let id = turmaId.id;

        let turma = await listarTurma( id );

        let numeroDeRecruta = null;

        if( values.postGrad == 'SD EV' ){
            numeroDeRecruta = values.numero
        }

        let hasEndereco = cidadao.endereco;
        
        let novoCidadao = {

            cidadoId: cidadao.id,

            id: cidadao.status.id || null,
            inicio: cidadao.status.inicio || null,
            fim: cidadao.status.fim || null,
            descrição: cidadao.status.descricao || null,
            tipoStatus: cidadao.status.tipo || 'OK',

            nomeCompleto: values.nomeCompleto,
            cpf: values.cpf ,
            rg: values.rg ,
            genero: values.genero ,
            dataDeNascimento: moment( values.dataNasc ).utc().format('DD/MM/YYYY'),
            email: values.email ,
            nomeMae: values.nomeMae ,
            nomePai: values.nomePai ,
            estadoCivil: values.estadoCivil,
            tipoTel: values.tipo ,
            telefone: values.telefone ,
            numeroRecruta: numeroDeRecruta ,
            ra: values.ra ,
            nomeDeGuerra: values.nomeDeGuerra ,
            qm: values.qm ,
            comportamento: values.cpto ,
            dataDePraca:  moment( values.dataPraca ).utc().format('DD/MM/YYYY'),
            postGrad: values.postGrad ,

            turmaId: turma.id,
            turma: turma.turma,

            endId: cidadao.endereco.id,
            estado:  values.estado,
            cidade:  values.cidade,
            bairro:  values.bairro,
            rua:  values.ruaLote,
        }
        
        await editarCidadao( novoCidadao ); 

        let info = {
            severityType: 'info',
            type: 'militar', 
        }
    
        localStorage.setItem("snackBarAlert", JSON.stringify(info));
        localStorage.setItem("navBarItem", 3);
    
        history.push('/ListaEfetivo');
    }

    const cabecalho = () => {

        let txt = `Efetivo: ${ turma.turma }`

        return (
            <List>
                <ListItemText primary="Editar Militar" secondary={txt} />
            </List>
        )
    }
   
    if(loading){ return <LoadingPage/>}

    return(
        <Grid container direction="column"  alignContent="center"  className="container-cadastrarContato">
{console.log("ci", cidadao)}

            <Grid container direction="column"  alignContent="center">
            
            <Formik
                onSubmit={onSubmit}
                validationSchema={cadastrarMilitarSchema}
                initialValues={{
                    //Form pessoal
                    nomeCompleto: cidadao.nomeCompleto,
                    cpf: cidadao.cpf,
                    rg:cidadao.rg,
                    genero:cidadao.genero,
                    dataNasc: dataString,
                    email:cidadao.email,
                    nomeMae:cidadao.nomeMae,
                    nomePai:cidadao.nomePai,
                    estadoCivil:cidadao.estadoCivil,
                    tipo: cidadao.tipo,
                    telefone: cidadao.telefone,
                    //Form militar
                    numero:cidadao.numeroRecruta || '',
                    ra:cidadao.ra,
                    nomeDeGuerra:cidadao.nomeDeGuerra,
                    qm:cidadao.qm,
                    cpto:cidadao.comportamento,
                    dataPraca: dataString,
                    postGrad:cidadao.postGrad,
                    //Form endereço
                    estado: cidadaoEndereco.estado || '',
                    cidade: cidadaoEndereco.cidade || '',
                    bairro: cidadaoEndereco.bairro || '',
                    ruaLote: cidadaoEndereco.rua || '',

                }}
                render={( { values, handleChange, handleSubmit, errors }) => (

                <Form autoComplete="off" style={{marginTop: 5, padding: 10, maxWidth: 1300}}>

                    <Grid container direction="row" alignItems="center"  justify="flex-start">
                        <div style={{background: "#fff", padding: '5px 20px', borderRadius: 4 }}>
                            {cabecalho()}
                        </div>
                    </Grid>

                    <Grid  container direction="row" alignItems="center" justify="flex-start" spacing={2} style={{
                        padding: 10, boxShadow: '2px 2px 2px #bdbfc1', borderRadius: 4, background: "#fff"
                        }} 
                    >


                        <Grid item xs={12} sm={4} lg={3}>

                            <TextField
                                value={values.nomeCompleto}
                                autoComplete="off"
                                fullWidth
                                label="Nome completo"
                                margin="dense"
                                style={{marginBottom: 0}}
                                variant="outlined"
                                name="nomeCompleto"
                                onChange={handleChange}
                            />

                        </Grid>

                        <Grid item xs={12} sm={4} lg={2}>

                            <FormControl>

                                <InputLabel htmlFor="my-input">CPF</InputLabel>

                                <Input
                                    name="cpf"
                                    value={values.cpf}
                                    inputComponent={cpfMasck}
                                    onChange={handleChange}
                                />

                            </FormControl>

                            <ErrorMessage name="cpf">{(msg) =>  <div className="alertCustom" style={{width: '100%', maxWidth: 210}}> <ErrorIcon style={{height: 15, margin: 0, padding: 0}} /> { msg } </div> }</ErrorMessage>

                        </Grid>
          
                        <Grid item xs={12} sm={4} lg={2}>

                            <FormControl>

                                <InputLabel htmlFor="my-input">RG</InputLabel>

                                <Input
                                    name="rg"
                                    value={values.rg}
                                    inputComponent={rgMasck}
                                    onChange={handleChange}
                                />

                            </FormControl>

                        </Grid>

                        <Grid item xs={12} sm={4} lg={2}>

                            <TextField
                                value={values.genero}
                                name="genero"
                                autoComplete="off"
                                fullWidth
                                label="Genero"
                                margin="dense"
                                style={{marginBottom: 0}}
                                variant="outlined"
                                style={{width: '100%', maxWidth: 150}}
                                select
                                onChange={handleChange}
                            >

                                {arrayDeGeneros.map( (genero, index) => (

                                <MenuItem  key={index} value={ genero}>
                                    {genero}
                                </MenuItem >

                                ))}

                            </TextField>

                        </Grid>

                        <Grid item xs={12} sm={4} lg={3}>

                            <TextField
                                value={values.nomePai}
                                fullWidth
                                autoComplete="off"
                                id="outlined-required"
                                label="Nome do pai"
                                margin="dense"
                                style={{marginBottom: 0}}
                                variant="outlined"
                                onChange={handleChange}
                                name="nomePai"
                            />

                        </Grid>

                        <Grid item xs={12} sm={4} lg={3}>

                            <TextField
                                value={values.nomeMae}
                                name="nomeMae"
                                autoComplete="off"
                                fullWidth
                                id="outlined-required"
                                label="Nome da mãe"
                                margin="dense"
                                style={{marginBottom: 0}}
                                variant="outlined"
                                onChange={handleChange}
                            />

                        </Grid>

                        <Grid item xs={12} sm={4} lg={3}>

                            <TextField
                                value={values.email}
                                autoComplete="off"
                                fullWidth
                                id="outlined-required"
                                label="Email"
                                margin="dense"
                                style={{marginBottom: 0}}
                                variant="outlined"
                                onChange={handleChange}
                                name="email"
                            />

                        </Grid>

                        <Grid item xs={12} sm={4} lg={3}>

                            <TextField
                                value={values.dataNasc}
                                name="dataNasc"
                                style={{width: '100%', maxWidth: 150}}
                                autoComplete="off"
                                fullWidth
                                label="Data de nascimento"
                                type="date"
                                margin="dense"
                                style={{marginBottom: 0}}
                                // defaultValue={dataString}
                                onChange={handleChange}
                            />

                        </Grid>

                        <Grid item xs={12} sm={4} lg={3}>
                            <TextField
                                value={values.estadoCivil}
                                autoComplete="off"
                                fullWidth
                                label="Estado Civil"
                                margin="dense"
                                style={{marginBottom: 0}}
                                variant="outlined"
                                select
                                value={values.estadoCivil}
                                onChange={handleChange}
                                name="estadoCivil"
                            >

                                {arrayDeEstadoCivil.map( (tipo, index) => (

                                <option key={index} value={ tipo} className="option">
                                    {tipo}
                                </option>

                                ))}

                            </TextField>

                        </Grid>


                    <Grid item xs={12} sm={6} lg={3} style={{minWidth: 340 }}>

                        <TextField
                            value={values.tipo}
                            autoComplete="off"
                            label="Tipo"
                            margin="dense"
                            variant="outlined"
                            select
                            style={{width: '100%', maxWidth: 120}}
                            onChange={handleChange}
                            name="tipo"
                            value={values.tipo}
                        >

                            {arrayDeTiposDeTelefones.map( (tipo, index) => (

                            <option key={index} value={ tipo} className="option">
                                {tipo}
                            </option>

                            ))}

                        </TextField>

                        <FormControl>

                            <InputLabel htmlFor="my-input">Telefone</InputLabel>

                            <Input
                                style={{width: 'calc( 100% - 5px)'}}
                                variant="outlined"
                                name="telefone"
                                value={values.telefone}
                                inputComponent={values.tipo == 'Celular' ? telMasck : telFixoMasck}
                                onChange={handleChange}
                            />

                        </FormControl>

                    </Grid>

                        <Grid item xs={6} sm={4} lg={3}>

                            <FormControl>

                                <InputLabel htmlFor="my-input">RA</InputLabel>

                                <Input
                                    variant="outlined"
                                    name="ra"
                                    value={values.ra}
                                    inputComponent={raMasck}
                                    onChange={handleChange}
                                />

                            </FormControl>

                            <ErrorMessage name="ra">{(msg) =>  <div className="alertCustom" style={{width: '100%', maxWidth: 210}}> <ErrorIcon style={{height: 15, margin: 0, padding: 0}} /> { msg } </div> }</ErrorMessage>
                            
                        </Grid>

                        <Grid item xs={6} sm={4} lg={1} style={{ minWidth: 250}}>

                            <TextField
                                value={values.nomeDeGuerra}
                                name="nomeDeGuerra"
                                style={{width: '100%'}}
                                id="outlined-required"
                                label="Nome de guerra"
                                margin="dense"
                                style={{marginBottom: 0}}
                                style={{marginBottom: 0}}
                                variant="outlined"
                                onChange={handleChange}
                            />
                            
                            <ErrorMessage name="nomeDeGuerra">{(msg) =>  <div className="alertCustom" style={{width: '100%', maxWidth: 210}}> <ErrorIcon style={{height: 15, margin: 0, padding: 0}} /> { msg } </div> }</ErrorMessage>
                        </Grid>

                        <Grid item xs={6} sm={4} lg={3} >

                            <TextField
                                value={values.qm}
                                name="qm"
                                style={{width: '100%', maxWidth: 150}}
                                id="outlined-required"
                                label="QM"
                                margin="dense"
                                style={{marginBottom: 0}}
                                variant="outlined"
                                onChange={handleChange}                      
                            />

                        </Grid>

                        <Grid item xs={6} sm={4} lg={3}>
    
                            <TextField
                                value={values.cpto}
                                name="cpto"
                                style={{width: '100%', maxWidth: 180}}
                                select
                                id="outlined-required"
                                margin="dense"
                                style={{marginBottom: 0}}
                                variant="outlined"
                                label="Comportamento"
                                onChange={handleChange}
                            >

                                {arrayDeComportamentos.map( (tipo, index) => (

                                    <option key={index} value={ tipo } className="option">
                                        { tipo }
                                    </option>

                                ))}

                            </TextField>

                        </Grid>


                        <Grid item xs={12} sm={4} lg={3}>

                            <TextField
                                value={values.dataPraca}
                                label="data de praça"
                                style={{width: '100%', maxWidth: 150}}
                                type="date"
                                id="outlined-required"
                                margin="dense"
                                style={{marginBottom: 0}}
                                // defaultValue={dataString}
                                onChange={handleChange}
                                name="dataPraca"
                            />

                        </Grid>

                        <Grid item xs={6} sm={4} lg={3}>

                            <TextField
                                value={values.postGrad}
                                style={{width: '100%', maxWidth: 150}}
                                select
                                id="outlined-required"
                                margin="dense"
                                style={{marginBottom: 0}}
                                variant="outlined"
                                label="Post/Grad"
                                onChange={handleChange}
                                name="postGrad"
                            > 

                                {arrayDeGraduacoes.map( graduacao => (

                                    <option key={graduacao.grad} value={graduacao.grad} className="option">
                                        {graduacao.grad}
                                    </option>

                                ))}

                            </TextField>

                        </Grid>

                        <Grid item xs={6} sm={4} lg={2}>

                            <TextField
                                disabled={ values.postGrad == 'SD EV' ? false : true }
                                value={values.numero}
                                style={{width: '100%', maxWidth: 100}}
                                label="Nº"
                                margin="dense"
                                style={{marginBottom: 0}}
                                variant="outlined"
                                type="number"
                                min="1"
                                onChange={handleChange}
                                name="numero"
                            />

                        </Grid>

                        <Grid item xs={6} sm={4} lg={3}>

                            <TextField
                                value={values.estado}
                                label="Estado"
                                margin="dense"
                                style={{marginBottom: 0}}
                                variant="outlined"
                                onChange={handleChange}
                                name="estado"
                            />

                        </Grid>

                        <Grid item xs={6} sm={4} lg={3}>

                            <TextField
                                value={values.cidade}
                                name="cidade"
                                id="outlined-required"
                                label="Cidade"
                                margin="dense"
                                style={{marginBottom: 0}}
                                variant="outlined"
                                onChange={handleChange}
                            />

                        </Grid>

                        <Grid item xs={6} sm={4} lg={3}>

                            <TextField
                                value={values.bairro}
                                name="bairro"
                                id="outlined-required"
                                margin="dense"
                                style={{marginBottom: 0}}
                                variant="outlined"
                                label="Bairro"
                                onChange={handleChange}
                            />

                        </Grid>

                <Grid item xs={12} sm={4} lg={3}>

                    <TextField
                        value={values.ruaLote}
                        fullWidth
                        id="outlined-required"
                        margin="dense"
                        style={{marginBottom: 0}}
                        variant="outlined"
                        label="Rua/lote"
                        onChange={handleChange }
                        name="ruaLote"
                    />

                </Grid>

                    <div style={{minHeigth: 1, height: 1, width: '100%', background: '#bdbfc1', borderRadius: 2, margin: '10px 0px'}}>
                    </div>

                    <Grid container direction="row" justify="center" alignItems="center">

                        <Button variant="contained" color="primary" className="btn-success" type="submit" style={{margin: '10px 0px'}}>
                            Editar
                        </Button>

                    </Grid>

                </Grid>
            </Form>
          )}
          />
          </Grid>
        </Grid>
              
    );
}
