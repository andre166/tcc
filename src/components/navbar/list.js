import React from 'react';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import HomeIcon from '@material-ui/icons/Home';
import PostAddIcon from '@material-ui/icons/PostAdd';
import BarChartIcon from '@material-ui/icons/BarChart';
import PieChartIcon from '@material-ui/icons/PieChart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ViewListIcon from '@material-ui/icons/ViewList';
import ListIcon from '@material-ui/icons/List';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import GroupIcon from '@material-ui/icons/Group';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import { useHistory } from 'react-router-dom';
import { getTurma } from '../../components/services/localStorgeService';

const sair = ( ) => {
    localStorage.removeItem("navBarItem");
    localStorage.removeItem("userInfo");
    window.location.assign("/")
}

const blanck = ( setRenderClasses, id ) => {

    let test = localStorage.getItem("navBarItem");
    
    if(test == id){
        return;
    }
    localStorage.setItem("navBarItem", id);
    setRenderClasses(false);
}

export const adminDrawner = [

    {id: 1, nome: 'Página inicial', link: '/AdminHome', icone: <HomeIcon />, func: (setRenderClasses) =>  blanck(setRenderClasses, 1)},
    {id: 2, nome: 'OM', link: '/Om', icone: <HomeWorkIcon />, func: (setRenderClasses) =>  blanck(setRenderClasses, 2)},
    {id: 3, nome: 'Subunidade', link: '/Subunidade', icone: <SupervisedUserCircleIcon />, func: (setRenderClasses) =>  blanck(setRenderClasses, 3)},
    {id: 4, nome: 'Usuários', link: '/GerenciarAdmin', icone: <GroupIcon />, func: (setRenderClasses) =>  blanck(setRenderClasses, 4) },
    {id: 5, nome: 'Sair',  icone: <ExitToAppIcon />, func: () =>  sair()}
    
]

export const cadastradorDrawner = [

    {id: 1, nome: 'Página inicial', link: '/ChInfoHome', icone: <HomeIcon />, func: (setRenderClasses) =>  blanck(setRenderClasses, 1) },
    {id: 2, nome: 'Subunidade', link: '/Subunidade', icone: <SupervisedUserCircleIcon />, func: (setRenderClasses) =>  blanck(setRenderClasses, 2) },
    {id: 3, nome: 'Usuários', link: '/GerenciarUsuario', icone: <GroupIcon />, func: (setRenderClasses) =>  blanck(setRenderClasses, 3) },
    {id: 4, nome: 'Sair',  icone: <ExitToAppIcon />, func: (e) =>  sair(e)}

]

export const gerencialDrawner = [

    {nome: 'Lista de militares da OM', link: '/ListaDeMilitares', icone: <FormatListBulletedIcon /> }, 
    {nome: 'Estatística da OM', link: '/Estatisticas', icone: <BarChartIcon />}, 

]

export const userDrawner = [

    {id: 1, nome: 'Página inicial', link: '/UserHome', icone: <HomeIcon />, func: (setRenderClasses) =>  blanck(setRenderClasses, 1) },

    {id: 3, nome: 'Lista de Militares', link: '/ListaEfetivo', icone: <ListIcon />, func: (setRenderClasses) =>  blanck(setRenderClasses, 3) },

    {id: 5, nome: 'Cadastrar militar', link: '/CadastrarMilitar', icone: <PostAddIcon />, func: (setRenderClasses) =>  blanck(setRenderClasses, 5) },
    {id: 6, nome: 'Estatística', icone: <PieChartIcon />, func: (setRenderClasses) =>  blanck(setRenderClasses, 6) },
    {id: 2, nome: `Efetivo`, link: '/Efetivo', icone: <SupervisedUserCircleIcon />, func: (setRenderClasses) =>  blanck(setRenderClasses, 2) },
    {id: 8, nome: 'Sair',  icone: <ExitToAppIcon />, func: (e) =>  sair(e)}

]