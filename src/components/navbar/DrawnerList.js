import React, { useEffect, useRef } from 'react';
import { adminDrawner, cadastradorDrawner, gerencialDrawner, userDrawner, auxSgtSaudeDrawner } from './list';
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
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import { connect } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import GavelIcon from '@material-ui/icons/Gavel';
import { 
    renderNavbar, renderLeftDrawner
} from '../../components/actions/navbarActions';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { bindActionCreators } from 'redux';
import PieChartIcon from '@material-ui/icons/PieChart';

const blanck = ( setRenderClasses, id ) => {

    let test = localStorage.getItem("navBarItem");
    
    if(test == id){
        return;
    }
    localStorage.setItem("navBarItem", id);
    setRenderClasses(false);
}

function GenerateList( props ){

    const item = getNavbarItem();
    const [openSaude, setOpenSaude] = React.useState(false);
    const [openJust, setOpenJust] = React.useState(false);
    const inputEl = useRef(null);

    const handleClick = () => {
        setOpenSaude(!openSaude);
    };

    const handleClickJust = () => {
        setOpenJust(!openJust);
    };


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

        

        if( text.nome == 'Cadastrar militar' && props.perfil == "ROLE_SGTE"){

            return(
                <>

                    <Link to={text.link} className={classes.link}> 
                        <ListItem button key={text.nome} className={text.id == item && classes.active || classes.link} onClick={() => text.func(props.renderLeftDrawner)}>
                            <span style={{ marginRight: 10 }}>{text.icone} </span> {text.nome}  
                        </ListItem>
                    </Link>

                    <ListItem button onClick={handleClick} className={classes.link}>
                        <span style={{ marginRight: 10 }}><LocalHospitalIcon/> </span>
                        <ListItemText primary="Saúde" />
                        {openSaude ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>

                    <Collapse in={ item >= 80 && item <= 89 ? true : openSaude} timeout="auto" unmountOnExit ref={inputEl}>
                        <List component="div" disablePadding>
                        <ListItem button  className={88 == item && classes.active || classes.link} onClick={() => blanck(props.renderLeftDrawner, 88)}>
                            <ListItemIcon>
                                <PieChartIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard saúde" />
                        </ListItem>
                        <ListItem button className={89 == item && classes.active || classes.link} onClick={() => blanck(props.renderLeftDrawner, 89)}>
                            <ListItemIcon>
                                <AssignmentIcon />
                            </ListItemIcon>
                            <ListItemText primary="Parte de acidente" />
                        </ListItem>
                        </List>
                        <Divider/>
                    </Collapse>

                    <ListItem button onClick={handleClickJust} className={classes.link}>
                        <span style={{ marginRight: 10 }}><GavelIcon/> </span>
                        <ListItemText primary="Justiça e disciplina" />
                        {openJust ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>

                    <Collapse in={item >= 90 && item <= 99 ? true : openJust} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button  className={98 == item && classes.active || classes.link} onClick={() => blanck(props.renderLeftDrawner, 98)}>
                                <ListItemIcon>
                                    <PieChartIcon />
                                </ListItemIcon>
                                <ListItemText primary="Dashboard disciplinar" />
                            </ListItem>
                            <ListItem button  className={99 == item && classes.active || classes.link} onClick={() => blanck(props.renderLeftDrawner, 99)}>
                                <ListItemIcon>
                                    <AssignmentIcon />
                                </ListItemIcon>
                                <ListItemText primary="Gerar FATD" />
                            </ListItem>
                        </List>
                        <Divider/>
                    </Collapse>

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

    }else if( props.perfil == 'ROLE_SGTE' ){
        return list( userDrawner );

    }else if( props.perfil == 'ROLE_BRIGADA' ){
        return list( auxSgtSaudeDrawner );

    }

    
} 

const mapDispatchToProps = dispatch => bindActionCreators({ renderNavbar, renderLeftDrawner }, dispatch)
  
const mapStateToProps =  state => state;
export default connect( mapStateToProps, mapDispatchToProps )(GenerateList)