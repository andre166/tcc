import React, { useState, useEffect } from 'react';
import { useParams, useHistory} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { useStyles } from './listaEfetivoStyle';
import LoadingPage from  '../../../../components/loading';
import withWidth from '@material-ui/core/withWidth';

function ListaEfetivo( props ){
    
    const classes = useStyles();

    let [loading, setLoading] = useState(true);

    useEffect(() => {
        
    }, []);

  if(loading){ return <LoadingPage/>}

  return(
        <div>Lista efetivo</div>
    );
    
}

export default withWidth()(ListaEfetivo);