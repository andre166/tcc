import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import { useStyles } from './cardStyle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';

export default function SimpleCard( { info } ) {

    const classes = useStyles();
  
    return (
      
        <Card className={classes.root}>
          <Link to={info.link} style={{textDecoration: 'none'}}>
        <CardContent>
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
  
