import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import { listarOm } from '../../../components/services/omServices';
import { deleteUser, editUser, listUsuarioUnicoComSubunidade, getUserOm, editUserComSu } from '../../../components/services/usuarioService';
import { getUserId } from '../../../components/services/localStorgeService';
import { listarSubunidadesPorOm } from '../../../components/services/subunidadeService';
import { useParams} from 'react-router-dom';
import { perfilListUser } from '../../../utils/perfilList';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Paper } from '@material-ui/core';
import { Formik, Form, ErrorMessage } from 'formik';
import editarUsuarioSchema from '../../../utils/schemas/editarUsuario';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import { Link } from 'react-router-dom';
import withWidth from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import GenerateAlert from '../../../components/errorAlert';
import { useStyles } from './editUsuStyle';
import LoadingPage from  '../../../components/loading'
import { useHistory} from 'react-router-dom';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { cpfMasck } from '../../../components/masks/cpfMasck';
import { retirarMaskCpf } from '../../../utils/maskAndValidators/cpf';
import verifyUserAuth from '../../../utils/verificarUsuarioAuth';

function CadastrarAdmin2( props ){

    const history = useHistory();

    let [loading, setLoading] = useState(true);
    let [user, setUser] = useState([]);
    let [userSu, setUserSu] = useState([]);
    let [om, setOm] = useState([]);
    const [subunidades, setSubunidades] = useState([]);

    const [open, setOpen] = React.useState(false);

    const handleClose = async () => {
      setOpen(false);
    }
    const handleClickOpen = () => {
      setOpen(true);
    };

    let idParams = useParams();
    const { id } = idParams;

    useEffect(() => {

      const loadPage = async () => {
        
        let usuario = await listUsuarioUnicoComSubunidade( id );
        usuario = usuario[0];

        let uId = getUserId();
        let _om = await getUserOm(uId);

        let suDoUsuario = _om.subunidades.find( e=> e.id == usuario.idSU);

        setOm(_om);
        setSubunidades(_om.subunidades);
        setUserSu(suDoUsuario);
        setUser(usuario);
        setLoading(false);
        
      }

      function isAutenticated(){

        let autenticated = verifyUserAuth();

        if( !autenticated ){
          history.push('/')
        }else{
          loadPage();
        }
      }
      isAutenticated();

    }, []);

    const classes = useStyles();

    const theme = useTheme();

    const xsDownMedia = useMediaQuery(theme.breakpoints.down('xs'));

    const excluirUsuario = (e) => {

      const { id } = idParams;
      
      deleteUser(id);

    }

    async function onSubmit( values ){

      values.cpf = retirarMaskCpf( values.cpf );

      let info = {
        severityType: 'info',
        type: 'user', 
      }

      localStorage.setItem("snackBarAlert", JSON.stringify(info));

      Object.assign(values, {om: om});
      Object.assign(values, { id: user.userId });
      
      if( values.subunidade ){
        let idSu = values.subunidade.id;
        await editUserComSu(values, idSu);
      }else{
        await editUser(values);
      }

      
      history.push('/GerenciarUsuario');

    }

    if(loading){ return <LoadingPage/>}

    return(

      <Container component="main" maxWidth="xs" style={{padding: 5}}>
      <CssBaseline />
      <Paper className={classes.paper}>

        <Grid container direction="row" justify="space-between" alignItems="center">

              <Link to={'/GerenciarUsuario'}  style={{textDecoration: 'none'}}>
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

          <Formik
          validationSchema={editarUsuarioSchema}
          onSubmit={onSubmit}
          initialValues={{
            nome: user.nome,
            cpf: user.cpf,
            perfil: user.perfil,
            userName: user.userName,
            subunidade: userSu
          }}
          render={( { values, handleChange, handleSubmit, errors, touched }) => (

          <Form onSubmit={handleSubmit} className={classes.form} autoComplete="off">
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
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nome de usuário"
                  name="userName"
                  value={values.userName}
                  onChange={handleChange}
                />
                <ErrorMessage name="userName">{(msg) =>  <GenerateAlert alertConfig={ {msg: msg, tipo: "warning"} } /> }</ErrorMessage>

              </Grid>
              <Grid item xs={12}>
                <FormControl className={classes.inputTxt} style={{width: '100%'}}>

                  <InputLabel htmlFor="my-input">Cpf</InputLabel>

                  <Input
                    name="cpf"
                    value={values.cpf}
                    inputComponent={cpfMasck}
                    onChange={handleChange}
                  />

                </FormControl>

                <ErrorMessage name="cpf">{(msg) =>  <GenerateAlert alertConfig={ {msg: msg, tipo: "warning"} } /> }</ErrorMessage>

              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Perfil"
                  name="perfil"
                  value={values.perfil}
                  onChange={handleChange}
                  select
                >
                {perfilListUser.map( (p, i) => (

                  <MenuItem key={i} value={ p.perfilSpring } className="option">
                      {p.perfil}
                  </MenuItem>

                  ))}

                </TextField>
                <ErrorMessage name="perfil">{(msg) =>  <GenerateAlert alertConfig={ {msg: msg, tipo: "warning"} } /> }</ErrorMessage>

              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Subunidade"
                  name="subunidade"
                  value={values.subunidade}
                  onChange={handleChange}
                  select
                >

                  <MenuItem>
                    <option aria-label="None" value="" />
                  </MenuItem>

                  {subunidades.map( (s, i) => (

                    <MenuItem key={i} value={ s } className="option">
                        {s.nomeSubunidade}
                    </MenuItem>

                  ))}

                </TextField>
                <ErrorMessage name="subunidade">{(msg) =>  <GenerateAlert alertConfig={ {msg: msg, tipo: "warning"} } /> }</ErrorMessage>

              </Grid>

            </Grid>

            <Grid item xs={12} sm={12}>
              <Grid container direction="row" justify="center" alignItems="center">
                <Button
                  style={{margin: '20px 0px 15px 0px'}}
                  type="submit"
                  // fullWidth
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
        
          <DialogActions style={{justifyContent: 'center', marginBottom: 5, marginTop: 15}}>
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
