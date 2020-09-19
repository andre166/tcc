import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';
import { listarOm } from '../../../../components/services/omServices';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
}))(MenuItem);

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#222831",
    color: theme.palette.common.white,
    boxShadow: theme.shadows[1],
    fontSize: 14,
    padding: '8px 12px 8px 12px'
  },
}))(Tooltip);

export default function CustomizedMenus({listaDeOm, setListaDeOm, setRenderCard, setListaDeOmState, setPaginaAtual}) {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [ orderByState , setOrderByState] = React.useState({
    nomeOm: false,
    cnpj: false,
    cep: false,
    ordenado: false //Verifica se já foi ordenado alguma vez para evitar requisição ao clicar no clearBtn
  });


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const orderBy = async( e ) => {

    let order = !orderByState['e'];
    let listaOrdenada = [];

    if(order){

      listaOrdenada = listaDeOm.sort(function(a, b){
        let param1 = a[e];
        let param2 = b[e];

          return ( param1 > param2) ? 1 : ((param2 > param1) ? -1 : 0);
      });

    }else if(!order){

      listaOrdenada = listaDeOm.sort(function(a, b){
        let param1 = a[e];
        let param2 = b[e];

        return ( param1 < param2) ? 1 : ((param2 < param1) ? -1 : 0);
      });

    }

    setOrderByState({
      ['e']: order,
      ordenado: true
    } )
    await setRenderCard(false);
    setPaginaAtual(1);
    await setListaDeOm(listaOrdenada);
    setRenderCard(true);

  }

  const clearOrderBy = async () => {

    if( orderByState.ordenado ){ //verifica se já foi ordenado
      let lista = await listarOm();
      setListaDeOm(lista);
      setListaDeOmState(lista);
      setPaginaAtual(1);
      setOrderByState({
        ordenado: false
      } )

    }

  }

  return (
    <div>
      <div>
      <ButtonGroup size='small' color="primary" aria-label="outlined primary button group">
          <Button
            size='small'
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="outlined"
            color="primary"
            onClick={handleClick}
          >
            Ornenar
          </Button>

          <LightTooltip title="Limpar ordenação">
            <Button size='small' aria-label="delete" onClick={() => clearOrderBy()}>
              <ClearIcon fontSize="small" />
            </Button>
          </LightTooltip>
          
      </ButtonGroup>

      </div>

      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >

        <StyledMenuItem onClick={() => orderBy('nomeAbrev')}>
          <ListItemText primary="Om"/>
            <ImportExportIcon fontSize="small" />
        </StyledMenuItem>

        <Divider/>

        <StyledMenuItem onClick={() => orderBy('cnpj')}>
          <ListItemText primary="Cnpj" />
            <ImportExportIcon fontSize="small" />
        </StyledMenuItem>

        <Divider/>

        <StyledMenuItem onClick={() => orderBy('cep')}>
          <ListItemText primary="Cep" />
            <ImportExportIcon fontSize="small" />
        </StyledMenuItem>

      </StyledMenu>
    </div>
  );
}