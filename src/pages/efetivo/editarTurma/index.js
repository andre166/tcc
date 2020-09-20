import React, { useState, useEffect } from 'react';
import { Paper, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Switch from '@material-ui/core/Switch';
import { makeStyles, fade } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Divider from '@material-ui/core/Divider';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useParams, useHistory} from 'react-router-dom';
import { DatePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { listarCidadaoPorTurma } from '../../../components/services/cidadaoService';
import ShowRelatorio from '@lestetelecom/showrelatorio';
import { colunaCidadao } from '../../../utils/columns/colunaCidadao';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import { Link} from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import { withStyles } from '@material-ui/core/styles';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { listarTurma } from '../../../components/services/turmaService';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import HelpIcon from '@material-ui/icons/Help';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#222831",
    color: theme.palette.common.white,
    boxShadow: theme.shadows[1],
    fontSize: 14,
    padding: '8px 12px 8px 12px'
  },
}))(Tooltip);

const useStyles = makeStyles((theme) => ({

    formControl: {
        margin: theme.spacing(1),
        minWidth: 150,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
    containerPrincipal: {
        width: '100%',
        height: 'calc(90vh - 80px) !important',

    },
    containerPrincipal2Paper: {
        marginTop: 65,
        width: '100%',
        minHeight: 'calc(100vh - 65px) !important',
    },
    datepickerPaper: {
        width: '100%',
        maxWidth: 420,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        padding: 15
    },
    buttonSuccess: {
        width: '100%',
        maxWidth: 350,
        backgroundColor: '#1d3724',
        '&:hover': {
          background: "#4a5442",
       }
    },
    buttonDanger: {
        width: '100%',
        maxWidth: 350,
        backgroundColor: '#ed3237',
        '&:hover': {
          background: "#7f3436",
       },
      },
    
      buttonInfo: {
        width: '100%',
        maxWidth: 350,
        backgroundColor: '#0064a6',
        '&:hover': {
          background: "#195493",
       },
      },

    buttonSuccessSm: {
        backgroundColor: '#1d3724',
        '&:hover': {
          background: "#4a5442",
       }
    },
    selecionarEfetivoContainer: {
        width: '100%',
        maxWidth: 420,
        marginTop: 20,
        padding: 15,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    helpContainer:{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5px 10px 5px 10px'
    },
    nenhumEfetivoContainer: {
        marginTop: 30,
        width: '100%',
        maxWidth: 350,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
  }));

  
  export default function EditarTurma( props ){
    
    const classes = useStyles();

    let [loading, setLoading] = useState(false);


    useEffect(() => {
    }, []);

 
    // <Link to={{pathname: `/EditarOm/${rowData.id}`}} style={{textDecoration: 'none'}}>
    //     <LightTooltip title="Editar" size="small">
    //     <IconButton color="primary" aria-label="upload picture" component="span"> 
    //         <EditIcon size="small" className={classes.buttonInfoIcon}/> 
    //     </IconButton>
    //     </LightTooltip>
    // </Link>
                
    if(loading){ // caso a página esteja carregando mostra uma msg de loading
        return(
          <div className="lc">
            <h1>
              Carregando.
            </h1>
          </div>
        )
      }

    return(

        <Grid container direction="column" justify="center" alignItems="center">
            <Paper  className={classes.containerPrincipal2Paper}>

            </Paper>
        </Grid>

    );
    
}

  
  

