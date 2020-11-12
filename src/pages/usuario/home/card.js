import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { useStyles } from './cardStyle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import PieGraph from './pieGraph';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import moment from 'moment';
import { getUserSu, getTurma } from '../../../components/services/localStorgeService';

function getData(){

    let data = moment(new Date()).utc().format('DD/MM/YYYY');

    let dataSplitada = data.split('/');

    let dia = dataSplitada[0];
    let mes = dataSplitada[1] - 1;
    let ano = dataSplitada[2];

    const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    let mesFormatado = '';

    months.map( (m, i) => {

        if( mes == i ){
            mesFormatado = m;
        }
    })

    let dataPorExtenso = dia + ' de ' + mesFormatado + ' de ' + ano + '.';

    return dataPorExtenso;

}

export default function SimpleCard( { info, userSu } ) {

    const classes = useStyles();

    let turma = getTurma();

    return (
      
      <Card className={classes.root}>

        <CardHeader 
          style={{background: '#eeeeee'}}
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              <span style={{background: info.bg || '#eeeeee', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{info.headerIcon}</span>
            </Avatar>
          }
          // action={
          //   <IconButton aria-label="settings">
          //     <MoreVertIcon />
          //   </IconButton>
          // }
          title={userSu.nomeCompleto + ' - ' + userSu.nomeSubunidade}
          subheader={getData()}
        />

        <div className={classes.pieGraphDiv}>
          <PieGraph/>
        </div>

          <CardActionArea style={{marginTop: -20, background: '#fff', borderTop: '1px solid #D1D1D1'}}>

            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {info.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {info.subtitle}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Ano do Efetivo: {turma.turma}
              </Typography>
            </CardContent>

        </CardActionArea>

        <CardActions style={{background: '#eeeeee'}}>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
    </Card>
    );
  }
  
