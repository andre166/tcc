import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import IconButton from '@material-ui/core/IconButton';
import SimpleDialogDemo from '../modal/modal';
import { Link } from 'react-router-dom';
import { maskCnpj } from '../../../../utils/maskAndValidators/cnpj';
import { maskCep } from '../../../../utils/maskAndValidators/cep';
import LightTooltip from '../../../../utils/toolTip';
import { useStyles } from './cardStyle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default function SimpleCard( props ) {

  const classes = useStyles();

  const getCountCidadao = () => {

    let qtdMilitarSu = 0;
    return qtdMilitarSu;

  }


  return (
    <Card className={classes.root}>
        <CardContent>

          <Typography className={classes.title} color="textPrimary" gutterBottom>
            <Link to={{pathname: `/VerificarOm/${props.om.id}`}} style={{textDecoration: 'none', marginRight: 10}}>
              <LightTooltip title="Detalhar OM">
                  <IconButton size="small" aria-label="delete" className={classes.margin} ><FindInPageIcon/></IconButton>
              </LightTooltip>
            </Link>
              <strong>{props.om.nomeAbrev}</strong>
          </Typography>

          <Divider/>

          <List dense={true}>
            <ListItem>
              <ListItemText primary={`Subunidades: ${props.om.subunidades.length}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Usuário: ${props.om.usuario.length}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Cnpj: ${props.om.cnpj}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Cep: ${props.om.cep}`} />
            </ListItem>
          </List>

          <Divider style={{marginTop: 15}}/>

        </CardContent>

        <Grid container alignItems="center" justify="center" style={{marginBottom: 10}}>

          <Link to={{pathname: `/EditarOm/${props.om.id}`}} style={{textDecoration: 'none', marginRight: 10}}>
            <Button variant="outlined" color="primary" size="small">Editar</Button>
          </Link>

          <SimpleDialogDemo om={ props.om} btnCard={true}/>
            
        </Grid>

    </Card>
  );
}
