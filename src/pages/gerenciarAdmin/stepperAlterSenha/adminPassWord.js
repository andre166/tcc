import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

export default function PaymentForm( { rowInfo }) {
  return (
    <React.Fragment>

        <Typography component="h2" variant="body1">
            <strong>Deseja alterar a senha do usuário:</strong>
        </Typography>

        <List dense={true} disablePadding>
            <ListItem>
                <ListItemText primary="Nome:" secondary={rowInfo.nome} />
            </ListItem>
        <Divider/>
            <ListItem>
                <ListItemText primary="Nome de usuário:" secondary={rowInfo.userName} />
            </ListItem>
            <Divider/>

            <ListItem>
                <ListItemText primary="Cpf:" secondary={rowInfo.cpf} />
            </ListItem>
            <Divider/>

            <ListItem>
                <ListItemText primary="Perfil:" secondary={rowInfo.perfil} />
            </ListItem>
            <Divider/>

            {rowInfo.nomeOm && <ListItem>
                <ListItemText primary="Om:" secondary={rowInfo.nomeOm} />
            </ListItem>}

        </List>

    </React.Fragment>
  );
}