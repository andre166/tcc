import React, { useState, useEffect } from 'react';
import { useParams, useHistory} from 'react-router-dom';
import { useStyles } from './listaEfetivoStyle';
import LoadingPage from  '../../../components/loading';
import withWidth from '@material-ui/core/withWidth';
import { getTurma } from  '../../../components/services/localStorgeService';
//redux
import { connect } from 'react-redux';
import { 
    renderNavbar, renderLeftDrawner
} from '../../../components/actions/navbarActions';

import { bindActionCreators } from 'redux';

function ListaEfetivo( props ){

    if( !props.navbarState.renderNavBar ){
        props.renderNavbar(true);
    }
    
    const classes = useStyles();
    const history = useHistory();

    let [loading, setLoading] = useState(true);

    useEffect(() => {

        let turma = getTurma();

        if( !turma ){
            history.push('/');
        }

        

        setLoading(false);

    }, []);

  if(loading){ return <LoadingPage/>}

  return(
      <div className={classes.root}>
          <h1>Lista efetivo</h1>
      </div>
    );
    
}

const mapDispatchToProps = dispatch => bindActionCreators({ renderNavbar, renderLeftDrawner }, dispatch)
  
const mapStateToProps =  state => state;
export default connect( mapStateToProps, mapDispatchToProps )(withWidth()(ListaEfetivo))