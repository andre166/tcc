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


const sair = ( ) => {
    window.location.assign("/")
}

const blanck = () => {
    return;
}

export const adminDrawner = [

    {nome: 'Página inicial', link: '/Home', icone: <HomeIcon />},
    {nome: 'OM', link: '/Om', icone: <HomeWorkIcon /> },
    {nome: 'Subunidade', link: '/Subunidade', icone: <SupervisedUserCircleIcon /> },
    {nome: 'Usuários', link: '/GerenciarAdmin', icone: <GroupIcon /> },
    {nome: 'Sair',  icone: <ExitToAppIcon />, func: (e) =>  sair(e)}
    
]

export const cadastradorDrawner = [

    {nome: 'Página inicial', link: '/Home', icone: <HomeIcon />},
    {nome: 'Subunidade', link: '/Subunidade', icone: <AssignmentIcon /> },
    {nome: 'Gerenciar Usuarios', link: '/GerenciarUsuario', icone: <ViewListIcon />},
    {nome: 'Sair',  icone: <ExitToAppIcon />, func: (e) =>  sair(e)}

]

export const gerencialDrawner = [

    {nome: 'Lista de militares da OM', link: '/ListaDeMilitares', icone: <FormatListBulletedIcon /> }, 
    {nome: 'Estatística da OM', link: '/Estatisticas', icone: <BarChartIcon />}, 

]

export const userDrawner = [
    {nome: 'Efetivo', link: '/Efetivo', icone: <ListIcon />, func: () =>  blanck() },
    {nome: 'Recrutas', link: '/Recrutas', icone: <ListIcon />, func: () =>  blanck() },
    {nome: 'Página inicial', link: '/Home', icone: <HomeIcon />, func: () =>  blanck() },
    {nome: 'Lista de militares', link: '/ListaDeMilitares', icone: <AssignmentIndIcon />, func: () =>  blanck()}, 
    {nome: 'Cadastrar militar', link: '/CadastrarMilitar', icone: <PostAddIcon />, func: () =>  blanck()}, 
    {nome: 'Estatística', icone: <PieChartIcon />, func: () =>  blanck()}, 
    {nome: 'Testes', link: '/Teste', icone: <InboxIcon />, func: () =>  blanck()},
    {nome: 'Sair',  icone: <ExitToAppIcon />, func: (e) =>  sair(e)}

]