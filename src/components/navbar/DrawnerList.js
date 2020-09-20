import React from 'react';
import { adminDrawner, cadastradorDrawner, gerencialDrawner, userDrawner } from './list';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import useStyles from './sidenavStyles';

export default function GenerateList( { perfil, renderNavbar } ){

    const classes = useStyles();

    function list( array ) {
    
        return (
            <List>
                { array.map( text => (
                    renderBtns(text)
                ))}
            </List>
        )
    
    }

    const renderBtns = ( text ) => {

        if(text.func){
    
            return(
                <ListItem button key={text.nome} className={classes.link} onClick={() => text.func(renderNavbar)}>
                    <span style={{ marginRight: 10 }}>{text.icone} </span> {text.nome}  
                </ListItem>
            )
    
        }else{
    
            return(
                <Link to={text.link} className={classes.link}> 
                    <ListItem button key={text.nome} className={classes.link}>
                        <span style={{ marginRight: 10 }}>{text.icone} </span> {text.nome}  
                    </ListItem>
                </Link>
            )
    
        }
    
    }

    if( perfil == 'ROLE_ADMIN'){
        return list( adminDrawner );

    }else if( perfil == 'ROLE_CHEFE_INFO'){
        return list( cadastradorDrawner );

    }else if( perfil == 'ROLE_BRIGADA'){
        return list( gerencialDrawner );

    }else{
        return list( userDrawner );

    }

    
} 
