import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import IconButton from '@material-ui/core/IconButton';
import SimpleDialogDemo from '../modal/modal';
import { Link } from 'react-router-dom';
import { maskCnpj } from '../../../../../../../utils/maskAndValidators/cnpj';
import { maskCep } from '../../../../../../../utils/maskAndValidators/cep';
import Tooltip from '@material-ui/core/Tooltip';
const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#222831",
    color: theme.palette.common.white,
    boxShadow: theme.shadows[1],
    fontSize: 14,
    padding: '8px 12px 8px 12px'
  },
}))(Tooltip);

const useStyles = makeStyles({
  root: {
    minWidth: 180,
    margin: 8,
    position:  'relative'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
    textAlign: 'left'
  },
  pos: {
    marginBottom: 12,
  },
  buttonSuccess: {
    backgroundColor: '#1d3724',
    height: 35,
    marginLeft: 10,
    '&:hover': {
      background: "#4a5442",
   },
  },

    buttonDanger: {
        backgroundColor: '#ed3237',
        // height: 35,
        '&:hover': {
            background: "#7f3436",
        }
    },
    buttonInfo: {
        backgroundColor: '#0064a6',
        // height: 35,
        '&:hover': {
          background: "#195493",
       },
      },

});

export default function SimpleCard( {subunidade, omParaVincular} ) {

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
        <CardContent>

                    {/* <Grid container direction="row" alignItems="flex-start" justify="flex-start"> */}
                      <Typography className={classes.title} color="textPrimary" gutterBottom>
                        <Link to={{pathname: `/VerificarSubunidade/${subunidade.id}/${omParaVincular.id}`}} style={{textDecoration: 'none', marginRight: 10}}>
                          <LightTooltip title="Detalhar Subunidade">
                              <IconButton size="small" aria-label="delete" className={classes.margin} ><FindInPageIcon/></IconButton>
                          </LightTooltip>
                        </Link>
                          <strong>{subunidade.nomeSubunidade}</strong>
                      </Typography>
                      <Divider/>

                        {/* <p><span>Efetivo: {subunidade.cidadao.length}</span> </p>
                        <p><span>Baixado: {subunidade.cidadao.length}</span> </p>
                        <p><span>Férias: {subunidade.cidadao.length}</span> </p>
                        <p><span>Serviço: {subunidade.cidadao.length}</span> </p>
                        <p><span>Missão: {subunidade.cidadao.length}</span> </p>
                        <p><span>Outros destinos: {subunidade.cidadao.length}</span> </p> */}
                            
                    {/* </Grid> */}

            <Divider style={{marginTop: 15}}/>
        </CardContent>

        <Grid container alignItems="center" justify="center" style={{marginBottom: 10}}>

            <Link to={{pathname: `/EditarSubunidade/${subunidade.id}/${omParaVincular.id}`}} style={{textDecoration: 'none', marginRight: 10}}>
                <Button variant="outlined" color="primary" size="small">Editar</Button>
            </Link>

            <SimpleDialogDemo om={ subunidade} btnCard={true}/>
            
        </Grid>
    </Card>
  );
}
