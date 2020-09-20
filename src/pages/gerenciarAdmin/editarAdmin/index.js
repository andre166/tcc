import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { listarOm } from '../../../components/services/omServices';
import { deleteUser } from '../../../components/services/usuarioService';
import { listarSubunidades } from '../../../components/services/subunidadeService';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useParams, useHistory} from 'react-router-dom';
import { perfilList } from '../../../utils/perfilList';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Paper } from '@material-ui/core';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import editarAdminSchema from '../../../utils/schemas/editarAdminSchema';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import { Link } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';
import LockIcon from '@material-ui/icons/Lock';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

function CadastrarAdmin2( props ){

    let [loading, setLoading] = useState(true);

    let [om, setOm] = useState([]);

    const [open, setOpen] = React.useState(false);

    const handleClose = async () => {
      setOpen(false);
    }
    const handleClickOpen = () => {
      setOpen(true);
    };

    let idParams = useParams();

    useEffect(() => {

      const inicializarForm = async () => {
        
        let response = await listarOm();
        setOm(response);
        setLoading(false)
        
      }

      inicializarForm();
    }, []);

    const useStyles = makeStyles((theme) => ({
       paper: {
        padding: '10px 20px',
        marginTop: 70,
        [theme.breakpoints.down('xs')]: {
          marginTop: 55,
        },
       },
        avatar: {
          margin: theme.spacing(1),
          backgroundColor: theme.palette.secondary.main,
        },
        form: {
          width: '100%', // Fix IE 11 issue.
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
        },
        buttonDanger: {
          backgroundColor: '#ed3237',
          '&:hover': {
            background: "#7f3436",
         },
        }
    }));

    const classes = useStyles();
    const { width } = props;

    const theme = useTheme();

    const xsDownMedia = useMediaQuery(theme.breakpoints.down('xs'));

    const excluirUsuario = (e) => {

      const { id, idOm } = idParams;
      
      deleteUser(id);

    }

    if(loading){ // caso a página esteja carregando mostra uma msg de loading
        return(
          <div className="loading-container">
            <CircularProgress />
          </div>
        )
      }

    async function onSubmit( values, action ){

      console.log("aaaa", values)
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

        <Formik
        validationSchema={editarAdminSchema}
        onSubmit={onSubmit}
        initialValues={{
          nome: '',
          cpf: '',
          om: '',
          perfil: '',
          userName: ''
        }}
        render={( { values, handleChange, handleSubmit, errors, touched }) => (

        <Form onSubmit={handleSubmit} className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                // variant="outlined"
                required
                fullWidth
                label="Nome Completo"
                name="nome"
                value={values.nome}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                // variant="outlined"
                required
                fullWidth
                label="Nome de usuário"
                name="userName"
                value={values.userName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                // variant="outlined"
                required
                fullWidth
                label="Cpf"
                name="cpf"
                value={values.cpf}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
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

            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                select
                required
                fullWidth
                label="Om"
                name="om"
                value={values.om}
                onChange={handleChange}
              >
                {om.map( ( o, i) => (

                  <MenuItem key={i} value={ o } className="option">
                      { o.nomeAbrev}
                  </MenuItem>

                ))}

              </TextField>

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
