import React, { useState, useEffect } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import useStyles from './sidenavStyles';
import { adminDrawner, cadastradorDrawner, gerencialDrawner, userDrawner } from './drawnerList';

export default function LeftDrawner( { open, renderNavbar } ){

    const classes = useStyles();
    const [ credencial, setCredencial ] = useState('');
    const [selectedIndex, setSelectedIndex] = React.useState(1);


    useEffect(() => {

        let response = JSON.parse(localStorage.getItem("userInfo"));
        
        if(response){
            let userPerfil = response.perfil;
            setCredencial(userPerfil)
        }

    }, []);

    const selecionar = (e) => {

        setSelectedIndex()

    }

    const renderBtns = ( text ) => {

        if(text.func){
            return(
                // <Link className={classes.link} }> 
                    <ListItem button key={text.nome} className={classes.link} onClick={() => text.func(renderNavbar.bind(this))}>
                        <span style={{ marginRight: 10 }}>{text.icone} </span> {text.nome}  
                    </ListItem>
                // </Link>
            )
        }else{
            return(
                <Link to={text.link} className={classes.link} onClick={() => setSelectedIndex(text.nome)}> 
                    <ListItem button key={text.nome} className={ selectedIndex == text.nome ? classes.selec : classes.link}>
                        <span style={{ marginRight: 10 }}>{text.icone} </span> {text.nome}  
                    </ListItem>
                </Link>
            )

        }

    }
    return (

        <Drawer className={classes.drawer} variant="permanent" anchor="left" open={open} classes={{ paper: classes.drawerPaper }}>
            <div style={{marginTop: 65}}></div>
            {credencial && credencial === 'ROLE_ADMIN' &&       
                <>
                    <div className={classes.adminTextSidenav}>
                        <span>Admin</span>
                    </div>

                    <Divider />

                    <List>
                        { adminDrawner.map( text => (

                            renderBtns(text)

                        ))}
                    </List>

                    {/* <Divider /> */}
                </>
            }

            {credencial && credencial !== 'ROLE_ADMIN' && 
                <>

                    <List>
                        { cadastradorDrawner.map((text, index) => (
                            <Link to={text.link} className={classes.link}> 
                                <ListItem button key={text.nome} className={classes.link}>
                                    <span style={{marginRight: 5}}>{text.icone} </span> {text.nome}  
                                </ListItem>
                            </Link>
                        ))}
                    </List>

                    <Divider />
                </>
            }

            {credencial && credencial !== 'ROLE_ADMIN' && 
                <>
                    <div className={classes.adminTextSidenav}>
                        <span>Usuário1</span>
                    </div>


                    <List>
                        { gerencialDrawner.map( text => (
                            <Link to={text.link} className={classes.link}> 
                                <ListItem button key={text.nome} className={classes.link}>
                                    <span style={{marginRight: 5}}>{text.icone} </span> {text.nome}  
                                </ListItem>
                            </Link>
                        ))}
                    </List>


                    <Divider />
                </>
            }

            {credencial && credencial !== 'ROLE_ADMIN' && 

                <>
                    <div className={classes.adminTextSidenav}>
                        <span>Usuário2</span>
                    </div>


                    <List>
                        { userDrawner.map( text => (
                            <Link to={text.link} className={classes.link} onClick={() => text.func(renderNavbar.bind(this))}> 
                                <ListItem button key={text.nome} className={classes.link}>
                                    <span style={{ marginRight: 5 }}>{text.icone} </span> {text.nome}  
                                </ListItem>
                            </Link> 
                        ))}

                    </List>
                </>
            }
        </Drawer>
    )
}