import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { makeStyles, fade } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { listarOm } from '../../../components/services/omServices';
import { cadastrarUsuarioAutenticado } from '../../../components/services/authService';
import { listarSubunidades } from '../../../components/services/subunidadeService';
import CircularProgress from '@material-ui/core/CircularProgress';
import { perfilList } from '../../../utils/perfilList';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import cadastroAdminAchema from '../../../utils/schemas/cadastroAdminAchema';
import { Paper } from '@material-ui/core';
import GenerateAlert from '../../../components/errorAlert';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import LockIcon from '@material-ui/icons/Lock';
import { useParams, useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '10px 20px',
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    buttonSuccess: {
      backgroundColor: '#1d3724',
      '&:hover': {
        background: "#4a5442",
     },
    },
    buttonInfo: {
      backgroundColor: '#0064a6',
      '&:hover': {
        background: "#195493",
     },
    },
    CcontainerEditarSenha: {
      marginTop: 10,
      padding: 10
    }
}))

function CadastrarAdmin2(){

  const classes = useStyles();

    let [listaDeOm, setListaDeOm] = useState("");
    let [listaDePerfis, setListaDePerfis] = useState("");
    let [loading, setLoading] = useState(true);
    let [om, setOm] = useState([]);

    let [nome, setNome] = useState("Billi");
    let [cpf, setCpf] = useState("1587447");
    let [nomeUsuario, setNomeUsuario] = useState("The Kid");
    let [senha, setSenha] = useState("123");
    let [perfil, setPerfil] = useState("");

    const history = useHistory();

    useEffect(() => {

      const inicializarForm = async () => {

        let omList = await listarOm( );

        setListaDeOm(omList);

        let listaSu = await listarSubunidades( om );

        console.log("listaSu", listaSu);
        setListaDePerfis(perfilList);
        setLoading(false);

      }

      inicializarForm();
    }, []);

    async function onSubmit( values, action ){

      let info = {
        severityType: 'success',
        type: 'user', 
      }

      localStorage.setItem("snackBarAlert", JSON.stringify(info));

      await cadastrarUsuarioAutenticado( values );
      
      history.push('/GerenciarAdmin');



    }


    if(loading){ // caso a página esteja carregando mostra uma msg de loading
        return(
          <div className="loading-container">
            <CircularProgress />
          </div>
        )
      }



    return(

      <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Paper className={classes.paper}>

      <Grid container direction="row" justify="space-between" alignItems="center">

          <Hidden xsDown>
            <Grid item xs={4} sm={4} >
                  <Link to={'/GerenciarAdmin'}  style={{textDecoration: 'none'}}>
                      <Button
                          variant="outlined"
                          color="primary"
                          startIcon={<KeyboardReturnIcon />}
                      >
                          Voltar
                      </Button>
                  </Link>
            </Grid>
          </Hidden>
            <Grid item xs={12} sm={6}>
              <Typography component="h1" variant="h5" style={{margin: '10px 0px'}}>
                Cadastrar Usuário
              </Typography>
            </Grid>

            <Grid item xs={4} sm={1}></Grid>

          </Grid>

        <Formik
        validationSchema={cadastroAdminAchema}
        onSubmit={onSubmit}
        initialValues={{
          nome: '',
          cpf: '',
          om: '',
          perfil: '',
          userName: '',
          senha:''
        }}
        render={( { values, handleChange, handleSubmit, errors, touched }) => (

        <Form onSubmit={handleSubmit} className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                
                fullWidth
                label="Nome Completo"
                name="nome"
                value={values.nome}
                onChange={handleChange}
              />
        <ErrorMessage name="nome">{(msg) =>  <GenerateAlert alertConfig={ {msg: msg, tipo: "warning"} } /> }</ErrorMessage>

            </Grid>
           
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Cpf"
                name="cpf"
                value={values.cpf}
                onChange={handleChange}
              />
              <ErrorMessage name="cpf">{(msg) =>  <GenerateAlert alertConfig={ {msg: msg, tipo: "warning"} } /> }</ErrorMessage>

            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                
                fullWidth
                label="Perfil"
                name="perfil"
                value={values.perfil}
                onChange={handleChange}
                select
              >
               {perfilList.map( (p, i) => (

                <MenuItem key={i} value={ p.perfilSpring } className="option">
                    {p.perfil}
                </MenuItem>

                ))}

              </TextField>
              <ErrorMessage name="perfil">{(msg) =>  <GenerateAlert alertConfig={ {msg: msg, tipo: "warning"} } /> }</ErrorMessage>

            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                select
                
                fullWidth
                label="Om"
                name="om"
                value={values.om}
                onChange={handleChange}
              >
                {listaDeOm.map( ( o, i) => (

                  <MenuItem key={i} value={ o } className="option">
                      { o.nomeAbrev}
                  </MenuItem>

                ))}

              </TextField>
              <ErrorMessage name="om">{(msg) =>  <GenerateAlert alertConfig={ {msg: msg, tipo: "warning"} } /> }</ErrorMessage>

            </Grid>

            <Grid item xs={12} sm={6}>

            <FormControl>
              <InputLabel htmlFor="input-with-icon-adornment">Nome de usuário</InputLabel>
              <Input
                fullWidth
                name="userName"
                value={values.userName}
                onChange={handleChange}
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
              />
            </FormControl>
            <ErrorMessage name="userName">{(msg) =>  <GenerateAlert alertConfig={ {msg: msg, tipo: "warning"} } /> }</ErrorMessage>

            </Grid>

            <Grid item xs={12} sm={6}>

            <FormControl>
              <InputLabel htmlFor="input-with-icon-adornment">Senha</InputLabel>
              <Input
                fullWidth
                name="senha"
                value={values.senha}
                onChange={handleChange}
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                }
              type="password"
              />
            </FormControl>
        <ErrorMessage name="senha">{(msg) =>  <GenerateAlert alertConfig={ {msg: msg, tipo: "warning"} } /> }</ErrorMessage>

            </Grid>

          </Grid>

          <Grid item xs={12} sm={12}>
            <Grid container direction="column" justify="center" alignItems="center">
              <Button
                style={{margin: '20px 0px 15px 0px'}}
                type="submit"
                // fullWidth
                variant="contained"
                color="primary"
                className={classes.buttonSuccess}
              >
                cadastrar
              </Button>
            </Grid>
          </Grid>

        </Form>
        )}
      />
      </Paper>
      
    </Container>
        // <Grid container direction="row" alignItems="flex-start" className="subunidade-container" justify="center">

        //     <Grid container direction="column" style={{maxWidth: 800, marginTop:70}}>
        //       <Paper className={classes.paperContainer}>

        //       <Grid style={{marginBottom: 10}} container direction="row" justify="space-between" alignItems="center">
        //       <Grid item xs={4}>
        //         <Link to={'/GerenciarAdmin'}  style={{textDecoration: 'none'}}>
        //             <Button
        //                 style={{marginTop: '-40px'}}
        //                 variant="outlined"
        //                 color="primary"
        //                 startIcon={<KeyboardReturnIcon />}
        //             >
        //                 Voltar
        //             </Button>
        //         </Link>

        //       </Grid>

        //           <Grid item item xs={4}>
        //               <h1> Cadastrar usuário</h1>
        //           </Grid>

        //           <Grid item item xs={4}>
                      
        //           </Grid>

        //       </Grid>

        //         <Formik
        //           // validate={teste}
        //           validationSchema={cadastroAdminAchema}
        //           onSubmit={onSubmit}
        //           initialValues={{
        //             nome: '',
        //             senha: '',
        //             cpf: '',
        //             om: '',
        //             perfil: '',
        //             userName: ''
        //           }}
        //           render={( { values, handleChange, handleSubmit, errors, touched }) => (
        //             <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                 
              
        //         <Grid container direction="row" justify="flex-start" alignItems="flex-start" style={{flexGrow: 1}}>

        //           <Grid item xs={4}>

        //               <TextField
        //                 required
        //                 id="outlined-required"
        //                 label="Nome completo"
        //                 margin="normal"
        //                 name="nome"
        //                 value={values.nome}
        //                 onChange={handleChange}
        //               />
        //                <ErrorMessage name="nome">{(msg) =>  <GenerateAlert alertConfig={ {msg: msg, tipo: "warning", larguraMax: 'max-content'} } /> }</ErrorMessage>

        //         </Grid>

        //         <Grid item xs={4} >

        //           <TextField
        //               required
        //               id="outlined-required"
        //               label="CPF"
        //               margin="normal"
        //               name="cpf"
        //               value={values.cpf}
        //               onChange={handleChange}
                      
        //           />
        //                <ErrorMessage name="cpf">{(msg) =>  <GenerateAlert alertConfig={ {msg: msg, tipo: "warning", larguraMax: larguraMaxAlert} } /> }</ErrorMessage>

        //         </Grid>


        //           {listaDeOm.length === 0 ? '' :
        //           <Grid item xs={4}>
        //             <TextField
        //                 required
        //                 id="outlined-required"
        //                 label="OM"
        //                 margin="normal"
        //                 variant="outlined"
        //                 style={{width: "100%", maxWidth: 160}}
        //                 select
        //                 name="om"
        //                 value={values.om}
        //                 onChange={handleChange}

        //             >

        //                 {listaDeOm.map( ( unidade, index) => (

        //                 <MenuItem key={index} value={ unidade } className="option">
        //                     {unidade.nomeAbrev}
        //                 </MenuItem>

        //                 ))}

        //             </TextField>
        //             <ErrorMessage name="om" >{(msg) =>  <GenerateAlert alertConfig={ {msg: msg, tipo: "warning", larguraMax: larguraMaxAlert} } /> }</ErrorMessage>

        //             </Grid>
        //           }

          

        //             {listaDePerfis.length ===0 ? '' : 
        //             <Grid item xs={4}>
        //               <TextField
        //                   required
        //                   id="outlined-required"
        //                   label="Perfil"
        //                   margin="normal"
        //                   variant="outlined"
        //                   style={{width: "100%", maxWidth: 160}}
        //                   select
        //                   name="perfil"
        //                   value={values.perfil}
        //                   onChange={handleChange}

        //               >

        //                   {listaDePerfis.map( ( p, index) => (

        //                   <MenuItem key={index} value={ p.perfilSpring } className="option">
        //                       {p.perfil}
        //                   </MenuItem>

        //                   ))}

        //               </TextField>
        //               <ErrorMessage name="perfil">{(msg) =>  <GenerateAlert alertConfig={ {msg: msg, tipo: "warning", larguraMax: larguraMaxAlert} } /> }</ErrorMessage>

        //               </Grid>
        //             }

        //               <Grid item xs={4}>

        //               <TextField
        //                   required
        //                   id="outlined-required"
        //                   label="Nome de usuário"
        //                   margin="normal"
        //                   name="userName"
        //                   value={values.userName}
        //                   onChange={handleChange}
                          
        //               />
        //                <ErrorMessage name="userName">{(msg) =>  <GenerateAlert alertConfig={ {msg: msg, tipo: "warning", larguraMax: larguraMaxAlert} } /> }</ErrorMessage>

        //             </Grid>

        //             <Grid item xs={4}>

        //               <TextField
        //                   required
        //                   id="outlined-required"
        //                   label="Senha"
        //                   margin="normal"
        //                   name="senha"
        //                   value={values.senha}
        //                   onChange={handleChange}
                          
        //               />
        //                <ErrorMessage name="senha">{(msg) =>  <GenerateAlert alertConfig={ {msg: msg, tipo: "warning", larguraMax: larguraMaxAlert} } /> }</ErrorMessage>

        //             </Grid>

        //       </Grid>

        //       <Divider className="divider"/>

            
        //       <Grid container direction="row" justify="center" alignItems="center">
        //         <Button className={classes.buttonSuccess} variant="contained" color="primary" type="submit">Cadastrar</Button>
        //       </Grid>

        //       </Form>
        //       )}
        //       />
        //         </Paper>
        //     </Grid>
        // </Grid>
    );
    
}

export default withWidth()(CadastrarAdmin2)