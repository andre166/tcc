import React from 'react';
import { useStyles } from './estilo.js'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Paper from '@material-ui/core/Paper';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Button from '@material-ui/core/Button';
import { Link, useHistory} from 'react-router-dom';

const EscalaDeServico = () => {

    const classes = useStyles();

    const servicos = [
        'PRAIA', 'GDA', 'CB DA GDA', 'GUIA', 'C.CONV'
    ]

    function ListItemLink(props) {
        return <ListItem button component="a" {...props} />;
    }

    return(
        <div className={classes.containerPrincipal}>


                <div style={{margin: '10px 0px'}}>
                    <Link to={{pathname: `/CadastrarOm`}} style={{textDecoration: 'none', marginRight: 5}}>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.buttonSuccess}
                            startIcon={<AddBoxIcon />}
                        >
                            Cadastrar serviço
                        </Button>
                    </Link>
                </div>

            <Paper className={classes.root}>
                <div style={{textAlign: 'center'}}>
                    <h4>Selecione um serviço</h4>
                    <Divider/>
                </div>

                <List component="nav">

                    {servicos.map( (e, i) => (
                        <>
                            <Link to="/EscalaDeServico/Escala" style={{textDecoration: 'none', color: '#000000DE'}}>
                                <ListItemLink>
                                    <ListItemText primary={e} secondary="Militares:"/>
                                </ListItemLink>
                            </Link>
                            {i !== servicos.length - 1 && <Divider />}
                        </>

                    ))}

                </List>


            </Paper>
        </div>
    )
}

export default EscalaDeServico;