import React, { useEffect } from 'react';
import { adminDrawner, cadastradorDrawner, gerencialDrawner, userDrawner } from './list';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import useStyles from './sidenavStyles';
import { getNavbarItem } from '../../components/services/localStorgeService';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import { connect } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import { 
    renderNavbar, renderLeftDrawner
} from '../../components/actions/navbarActions';

import { bindActionCreators } from 'redux';

function GenerateList( props ){

    const [openSaude, setOpenSaude] = React.useState(false);
    const [openJust, setOpenJust] = React.useState(false);

    const handleClick = () => {
        setOpenSaude(!openSaude);
    };

    const handleClickJust = () => {
        setOpenJust(!openJust);
    };

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

        

        if( text.nome == 'Sair' && props.perfil == "ROLE_SGTE"){

            return(
                <>
                    {/* MENU AUXILIAR DE SAÚDE*/}

                    <ListItem button onClick={handleClick}>
                        <ListItemIcon>
                        <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Saúde" />
                        {openSaude ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>

                    <Collapse in={openSaude} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                            <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="Starred" />
                        </ListItem>
                        </List>
                        <Divider/>
                    </Collapse>

                    {/* MENU AUXILIAR DE JUSTIÇA */}

                    <ListItem button onClick={handleClickJust}>
                        <ListItemIcon>
                        <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Justiça e disciplina" />
                        {openJust ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>

                    <Collapse in={openJust} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                            <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="Starred" />
                        </ListItem>
                        </List>
                        <Divider/>
                    </Collapse>

                    <Link to={text.link} className={classes.link}> 
                        <ListItem button key={text.nome} className={text.id == item && classes.active || classes.link} onClick={() => text.func(props.renderLeftDrawner)}>
                            <span style={{ marginRight: 10 }}>{text.icone} </span> {text.nome}  
                        </ListItem>
                    </Link>

                </>

            )

        }

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