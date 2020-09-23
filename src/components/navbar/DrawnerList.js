import React, { useEffect } from 'react';
import { adminDrawner, cadastradorDrawner, gerencialDrawner, userDrawner } from './list';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import useStyles from './sidenavStyles';
import { getNavbarItem } from '../../components/services/localStorgeService';

import { connect } from 'react-redux';

import { 
    renderNavbar, renderLeftDrawner
} from '../../components/actions/navbarActions';

import { bindActionCreators } from 'redux';

function GenerateList( props ){

    // console.log("aaa", props)
    // function GenerateList( { perfil, setRenderClasses } ){


    const item = getNavbarItem();

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
                <Link to={text.link} className={classes.link}> 

                <ListItem button key={text.nome} className={text.id == item && classes.active || classes.link} onClick={() => text.func(props.renderLeftDrawner)}>
                    <span style={{ marginRight: 10 }}>{text.icone} </span> {text.nome}  
                </ListItem>
                </Link>

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

    if( props.perfil == 'ROLE_ADMIN'){
        return list( adminDrawner );

    }else if( props.perfil == 'ROLE_CHEFE_INFO'){
        return list( cadastradorDrawner );

    }else if( props.perfil == 'ROLE_BRIGADA'){
        return list( gerencialDrawner );

    }else{
        return list( userDrawner );

    }

    
} 

const mapDispatchToProps = dispatch => bindActionCreators({ renderNavbar, renderLeftDrawner }, dispatch)
  
const mapStateToProps =  state => state;
export default connect( mapStateToProps, mapDispatchToProps )(GenerateList)