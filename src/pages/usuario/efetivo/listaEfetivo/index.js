import React, { useState, useEffect } from 'react';
import { useParams, useHistory} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { useStyles } from '../../home/listaEfetivoStyle';
import LoadingPage from  '../../../../components/loading';
import withWidth from '@material-ui/core/withWidth';
//redux
import { connect } from 'react-redux';
import { 
    renderNavbar, renderLeftDrawner
} from '../../../../components/actions/navbarActions';

import { bindActionCreators } from 'redux';

function ListaEfetivo( props ){

    if( !props.navbarState.renderNavBar ){
        props.renderNavbar(true);
    }
    
    const classes = useStyles();

    let [loading, setLoading] = useState(true);

    useEffect(() => {
        
    }, []);

  if(loading){ return <LoadingPage/>}

  return(
        <div>Lista efetivo</div>
    );
    
}

const mapDispatchToProps = dispatch => bindActionCreators({ renderNavbar, renderLeftDrawner }, dispatch)
  
const mapStateToProps =  state => state;
export default connect( mapStateToProps, mapDispatchToProps )(withWidth()(ListaEfetivo))