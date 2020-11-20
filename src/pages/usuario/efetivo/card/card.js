import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './cardStyle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CardActions from '@material-ui/core/CardActions';
import { Link } from 'react-router-dom';

export default function SimpleCard( { info, listaTurma } ) {

    const classes = useStyles();
  
    return (
      
      <Card className={classes.root} onClick={info.func}>
        <CardContent style={{height: '75%'}}>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {info.title}
          </Typography>

          <div style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent:'space-between',
          }}>
            
            {info.icon}

            <List dense="true">
                <ListItem style={{textDecoration: 'none'}}>
                        <ListItemText style={{textDecoration: 'none', color: '#393b44'}}
                            primary={info.desc}
                            secondary={info.subDesc}
                        />
                </ListItem>
            </List>

          </div>

        </CardContent>

        {info.button && !info.link &&
          <CardActions className={classes.rootContentActions}>
            {info.button}
          </CardActions>
        }

        {info.button && info.link &&

          <CardActions className={classes.rootContentActions}>
            {listaTurma.length > 0 ?
              <Link to={info.link} style={{textDecoration: 'none', marginTop: -5}}>
                {info.button}
              </Link>
            : 
            
            <div style={{marginTop: -5}}>
              {info.button}
            </div>
            
            }
          </CardActions>

        }

      </Card>
    );
  }
  
