import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import { listarOm } from '../../../components/services/omServices';
import { listUser, deleteUser, getUserOm, editUser } from '../../../components/services/usuarioService';
import { getUserId } from '../../../components/services/localStorgeService';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useParams } from 'react-router-dom';
import { perfilList } from '../../../utils/perfilList';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Paper } from '@material-ui/core';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import editarAdminSchema from '../../../utils/schemas/editarAdminSchema';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import { Link, useHistory } from 'react-router-dom';
import withWidth from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useStyles } from './editStyle';
import GenerateAlert from '../../../components/errorAlert';

function CadastrarAdmin2( props ){

    const history = useHistory();
    let [loading, setLoading] = useState(true);

    let [om, setOm] = useState([]);
    let [userOm, setUserOm] = useState('');
    let [usuario, setUsuario] = useState([]);

    const [open, setOpen] = React.useState(false);

    const handleClose = async () => {
      setOpen(false);
    }
    const handleClickOpen = () => {
      setOpen(true);
    };

    let idParams = useParams();

    const { id, idOm } = idParams;

    useEffect(() => {

      const inicializarForm = async () => {

        let responseOmList = [];
        let responseUserOM = [];
        
        let u = await listUser( id );

          if( idOm ){

            responseOmList = await listarOm();

            let user = '';

            responseOmList.find( (e, i) => {
              if(e.id == idOm){
                user = e;
              }
            });

            setOm(responseOmList);
            setUserOm(user);

          }else{

            responseOmList = await listarOm();
            setOm(responseOmList);

          }

        setUsuario(u);
        setLoading(false)
        
      }

      inicializarForm();
    }, []);

    const classes = useStyles();
    const { width } = props;

    const theme = useTheme();

    const xsDownMedia = useMediaQuery(theme.breakpoints.down('xs'));

    const excluirUsuario = (e) => {

      const { id, idOm } = idParams;
      
      deleteUser(id);

    }

    const verificarErro = ( msg ) => {

      let tipo = 'warning';

      if( msg == 'Não é um CPF válido.' ){
        tipo = 'error'
      }

      return(
        <GenerateAlert alertConfig={ {msg: msg, tipo: tipo} } />
      )

    }

    if(loading){ // caso a página esteja carregando mostra uma msg de loading
        return(
          <div className="loading-container">
            <CircularProgress />
          </div>
        )
      }

    async function onSubmit( values ){

      Object.assign(values, {id: usuario.id});

      await editUser(values);

      if(usuario.id == getUserId()){

      history.push('/');

      }else{
        
        let info = {
          severityType: 'info',
          type: 'user',
        }
  
        localStorage.setItem("snackBarAlert", JSON.stringify(info));

        history.push('/GerenciarAdmin');
      }


    }

    return(

      <Container component="main" maxWidth="sm" style={{padding: 5}}>
      <CssBaseline />
      <Paper className={classes.paper}>

      <Grid container direction="row" justify="space-between" alignItems="center">

            <Link to={'/GerenciarAdmin'}  style={{textDecoration: 'none'}}>
                <Button
                    size="small"
                    style={{marginTop: '-38px',marginLeft: '-16px', position: 'absolute'}}
                    variant="outlined"
                    color="primary"
                    startIcon={<KeyboardReturnIcon />}
                >
                    {!xsDownMedia && 'Voltar'}
                </Button>
            </Link>

            <Grid item xs>
                <Grid container alignItems="center" justify="center">
                  <h2>Editar Usuário</h2>
                </Grid>
            </Grid>

          </Grid>

{usuario  &&
        <Formik
        validationSchema={editarAdminSchema}
        onSubmit={onSubmit}
        initialValues={{
          nome: usuario.nome,
          cpf: usuario.cpf,
          om: userOm,
          perfil: usuario.perfil,
          userName: usuario.userName
        }}
        render={( { values, handleChange, handleSubmit, errors, touched }) => (

          <Form onSubmit={handleSubmit} className={classes.form}>
         
          <Grid container spacing={2}>

            <Grid item xs={12}>
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
                label="Nome de usuário"
                name="userName"
                value={values.userName}
                onChange={handleChange}
              />
              <ErrorMessage name="userName">{(msg) =>  <GenerateAlert alertConfig={ {msg: msg, tipo: "warning"} } /> }</ErrorMessage>

            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Cpf"
                name="cpf"
                value={values.cpf}
                onChange={handleChange}
              />
              <ErrorMessage name="cpf">{(msg) => verificarErro(msg) }</ErrorMessage>
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

{console.log("aaaaa", values.om)}
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                select
                fullWidth
                label="Om"
                name="om"
                value={values.om }
                onChange={handleChange}
              >
                {om.map( ( o, i) => (

                  <MenuItem key={i} value={o} className="option">
                      { o.nomeAbrev}
                  </MenuItem>

                ))}

              </TextField>

              <ErrorMessage name="om">{(msg) =>  <GenerateAlert alertConfig={ {msg: msg, tipo: "warning"} } /> }</ErrorMessage>

            </Grid>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Grid container direction="row" justify="center" alignItems="center">
              <Button
                style={{margin: '20px 0px 15px 0px'}}
                type="submit"
                variant="contained"
                color="primary"
                className={classes.buttonSuccess}
              >
                Editar
              </Button>

              <div style={{width: 15}}></div>

              <Button
                style={{margin: '20px 0px 15px 0px'}}
                variant="contained"
                color="primary"
                className={classes.buttonDanger}
                onClick={handleClickOpen}
              >
                excluir
              </Button>

            </Grid>
          </Grid>

        </Form>
        )}
      />
                }
      </Paper>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{overflow: 'hidden'}}
      >
          <DialogTitle id="alert-dialog-title">{`Deseja excluir ${'aa'}' ?`}</DialogTitle>
          
          <Divider style={{marginBottom: 10}}/>
        
          <DialogActions style={{justifyContent: 'center', marginBottom: 5}}>
            <Button className={classes.buttonSuccess} color="primary" variant="contained">
              Sim
            </Button>
            <Button className={classes.buttonDanger} onClick={handleClose} color="primary" variant="contained" autoFocus>
              não
            </Button>
          </DialogActions>
        </Dialog>
    </Container>

    );
    
}

CadastrarAdmin2.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default withWidth()(CadastrarAdmin2);
