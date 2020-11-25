import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TableCard from './tableCard';
import { getUserPerfil } from '../../../../components/services/localStorgeService';

import { 
    listarSubunidades,
} from '../../../../components/services/subunidadeService';

import { styles } from './formularioStyles';

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

        if( this.props.listaDeOm && this.props.idParametro && this.props.userOm && userPerfil == 'ROLE_ADMIN'){

            this.setState({ 
                omParaVincular: this.props.userOm,
                credencial: userPerfil
            });
            this.listarSu( this.props.userOm );

        }else if( this.props.listaDeOm && !this.props.idParametro && userPerfil == 'ROLE_ADMIN' ){

            if( this.props.listaDeOm ){

                this.setState({ 
                    omParaVincular: this.props.listaDeOm,
                    credencial: userPerfil
                });
            }else if( this.props.omParaVincular ){

                this.setState({ 
                    omParaVincular: this.props.omParaVincular,
                    credencial: userPerfil
                });
            }
            
        }
      
        if( userPerfil !== 'ROLE_ADMIN' ){

            this.setState({ 
                omParaVincular: this.props.userOm,
                credencial: userPerfil,
                mostrarForm: true
            });

        }

    }

    render() {

        const { classes } = this.props;
        const uPerfil = getUserPerfil();
      
        return (
        
            <div className={ uPerfil !== 'ROLE_ADMIN' ? classes.containerUser : classes.container}>
                
                <div className={classes.containerSelecionarSu}>

                    {this.props.listaDeOm && 
                        <>
                            <label className={classes.teste}>Organização Militar: </label>

                            <TextField
                                id="standard-select-currency" select label="OM" className={classes.textField} value={this.state.omParaVincular}
                                onChange={this.changeOm('omParaVincular')} helperText="Selecione uma OM" margin="normal"
                            
                            >

                                {this.props.listaDeOm && this.state.credencial == "ROLE_ADMIN" &&
                                
                                    this.props.listaDeOm.map( om => (
                                        <MenuItem key={om.id} value={om}>
                                        {om.nomeAbrev}
                                        </MenuItem>
                                    ))
                                }


                            </TextField>
                    
                            <Button variant="contained" color="primary" className={classes.buttonSuccess}
                                onClick={() => this.listarSu( this.state.omParaVincular )}
                                >
                                selecionar
                            </Button>
                        </>
                    }
                
                </div>

                {this.state.omParaVincular !== '' && this.state.mostrarForm  &&<TableCard userOm={this.props.userOm} omList={this.props.listaDeOm} omParaVincular={this.state.omParaVincular}/>}        
        
            </div>

    );

  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);