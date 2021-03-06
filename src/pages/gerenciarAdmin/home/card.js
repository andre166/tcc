import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { useStyles } from './cardStyle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default function SimpleCard( { info } ) {

    const classes = useStyles();
  
    return (
      
        <Card className={classes.root} onClick={info.func}>
          <Link to={info.link} style={{textDecoration: 'none'}}>
        <CardContent className={classes.rootContent}>
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
        </Link>
      </Card>
    );
  }
  
