import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import HelpIcon from '@material-ui/icons/Help';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from './card';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import TableCard from './testeTableCard';

import { 
    cadastrarSubunidade, 
    listarSubunidades,
    editarSubunidade
} from '../../../../components/services/subunidadeService';

import { styles } from './formularioStyles';

const LightTooltip = withStyles((theme) => ({
    tooltip: {
        padding: 15,
        border: '1px solid #1d3724',
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0)',
        boxShadow: theme.shadows[1],
        fontSize: 16,
    },
  }))(Tooltip);

  const txt_tooltipIdiomas = 'Selecione uma OM para excluir ou editar as subunidades vinculadas a mesma ou cadastrar uma Subunidade.'


class TextFields extends React.Component {

    listarSu = async ( om, user ) => {

        let lista = [];

        if( om ){
            
            this.setState(() => ({
                listaDeSubunidades: om.subunidades,
                userOm: user || '',
                mostrarForm: true
            }));

        }else{
            lista = await listarSubunidades( );
            console.log("lista", lista)
            this.setState(() => ({
                listaDeSubunidades: lista,
                userOm: user || '',
            }));
        }



    }

    handleChange2 = name => event => {
        this.setState({ [name]: true });
      };

    
        state = {
            omParaVincular: '',
            subunidadeCadastrar: '',
            subunidadeExcluir: '',
            subunidadeEditar: '',
            listaDeSubunidades: '',
            nomeParaEditar: '',
            mostrarModal: false,
            mostrarForm: false,
            userOm: false,
            credencial: ''
        };


  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  changeOm = name => event => {

    this.setState(
        { 
            [name]: event.target.value,
            mostrarForm: false
    
        }
    );

  }

  componentDidMount(){

    let response = JSON.parse(localStorage.getItem("userInfo"));

    let userPerfil = response.perfil;

    if( this.props.listaDeOm && this.props.idParametro && this.props.userOm){ //Admin com idParams

        this.setState({ 
            omParaVincular: this.props.userOm,
            credencial: userPerfil
        });
        this.listarSu( this.props.userOm );

    }else

      if( this.props.listaDeOm && this.props.idParametro ){
        this.setState({ 
            omParaVincular: this.props.listaDeOm,
            credencial: userPerfil
        });
        
        this.listarSu( this.props.listaDeOm );
      }else{
        this.setState({ 
            omParaVincular: this.props.listaDeOm,
            credencial: userPerfil
        });
      }


  }

  render() {
      const { classes } = this.props;
      
    return (
        <>
        
        <form className={classes.container} noValidate autoComplete="off">
              
            <Paper className={classes.containerSelecionarSu}>

                <>
                    <label className={classes.teste}>Organização Militar: 
                    <LightTooltip title={txt_tooltipIdiomas} className={classes.helpIcon_idiomas}>
                        <HelpIcon></HelpIcon>
                    </LightTooltip>

                    </label>

                    <TextField
                        id="standard-select-currency" select label="OM" className={classes.textField} value={this.state.omParaVincular}
                        onChange={this.changeOm('omParaVincular')} helperText="Selecione uma OM" margin="normal"
                        SelectProps={{ MenuProps: {
                            className: classes.menu,
                            },
                        }}
                    >

                        {/* {this.props.listaDeOm && this.props.listaDeOm.length > 1 ?
                        
                            this.props.listaDeOm.map( om => (
                                <MenuItem key={om.id} value={om}>
                                {om.nomeAbrev}
                                </MenuItem>
                            ))
                        : */}
                        {console.log("this.state.credencial", this.state.credencial)}
                        {this.props.listaDeOm && this.state.credencial && this.state.credencial == "ROLE_ADMIN" &&
                        
                            this.props.listaDeOm.map( om => (
                                <MenuItem key={om.id} value={om}>
                                {om.nomeAbrev}
                                </MenuItem>
                            ))
                        }

                        {/* {this.getPerfil() !== "ROLE_ADMIN" && <MenuItem key={this.props.listaDeOm.id} value={this.props.listaDeOm}>
                            {this.props.listaDeOm.nomeAbrev}
                        </MenuItem>} */}

                        

                    </TextField>
            
                <Button variant="contained" color="primary" className={classes.buttonSuccess}
                    onClick={() => this.listarSu( this.state.omParaVincular )}
                    >
                    selecionar
                </Button>
                </>
            
            </Paper>

            {this.state.omParaVincular !== '' && this.props.listaDeOm && this.state.mostrarForm  &&<TableCard userOm={this.props.userOm} omList={this.props.listaDeOm} omParaVincular={this.state.omParaVincular}/>}        
       
        </form>
        </>

    );



  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);