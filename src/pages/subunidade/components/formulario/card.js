import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
    textAlign: 'center'
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

export default function SimpleCard( props ) {

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  console.log("props", props)

  return (
    <Card className={classes.root}>
        <CardContent>

                <Typography className={classes.title} color="textPrimary" gutterBottom>
                    <Grid container direction="row" alignItems="center" justify="space-between">
                        <strong>{props.subunidade.nomeSubunidade}</strong> 
                        <IconButton aria-label="delete" className={classes.margin} ><FindInPageIcon/></IconButton>
                    </Grid>
                </Typography>

            <Divider style={{marginTop: 15}}/>
        </CardContent>

        <Grid container alignItems="center" justify="space-around" style={{marginBottom: 10}}>

            <Link to={{pathname: `/EditarSubunidade/${props.subunidade.id}`}} style={{textDecoration: 'none'}}>
                <Button variant="outlined" color="primary" size="small">Editar</Button>
            </Link>

            <SimpleDialogDemo subunidade={ props.subunidade}/>
            
        </Grid>
    </Card>
  );
}
