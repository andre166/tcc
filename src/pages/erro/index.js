import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStyles } from './errorStyle';
import verifyUserAuth from '../../utils/verificarUsuarioAuth';
import { setAuthRoutesErro } from '../../components/actions/userAction';
import { useHistory } from 'react-router-dom';
// REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function Erro( ){
    let history = useHistory();

    const classes = useStyles();

    if ( !verifyUserAuth() ) { history.push('/') };

    return(
        <>
            <div className={classes.containerError}>
                <div className={classes.containerGeral}>
                    <h1 >PÁGINA NÃO ENCONTRADA</h1>
                    <p className={classes.pErro} >Procuramos por essa página em todos os lugares.</p>
                    <p className={classes.pErro}>Entre em contato com o administrador do sistema.</p>
                    <Link to="/Home" ><button type="button" className={classes.btnErro}>Volte ao início</button></Link>
                </div>
            </div>
        </>
    );
}

const mapDispatchToProps = dispatch => bindActionCreators({ setAuthRoutesErro }, dispatch)
  
const mapStateToProps =  state => state;
export default connect( mapStateToProps, mapDispatchToProps )(Erro)
