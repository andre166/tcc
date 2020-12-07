import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Switch from '@material-ui/core/Switch';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import ClearIcon from '@material-ui/icons/Clear';
import EventIcon from '@material-ui/icons/Event';
import EventNoteIcon from '@material-ui/icons/EventNote';

const useStyles = makeStyles((theme) => ({
  root: {
    transform: 'translateZ(0px)',
    flexGrow: 1,
  },
  exampleWrapperOpen: {
    borderRadius: 5,
    position: 'absolute',
    marginTop: 70,
    height: 230,
    width: 240,
    left: '60%',
    background: '#fff',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    boxShadow: '2px 2px 5px #dddddd',
    transition: '0.6s ease',
  },
  exampleWrapper: {
    borderRadius: 5,
    position: 'absolute',
    marginTop: 70,
    height: 1,
    width: 240,
    left: '60%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end'
  },
  radioGroup: {
    margin: theme.spacing(1, 0),
    padding: 10
  },
  speedDial: {
    position: 'relative',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
    },
    '&.MuiSpeedDial-root': {
      marginRight: 0,
      marginTop: -75
    }
  },
  speedDialOpen: {
    position: 'relative',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
    },
    '&.MuiSpeedDial-root': {
      marginRight: 0,
      marginTop: -75
    }
  },
  staticTooltipLabel: {
    width: 'max-content',
    background: '#00bcd4',
    color: '#fff',
  }
}));

export default function SpeedDials( { gerarPrevisaoDeServico, gerarPrevisaoDeServicoMensal, zerarPrevisao, diasParaContarServico, setDiasParaContarServico } ) {

  const classes = useStyles();
  const [direction, setDirection] = React.useState('down');
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);

  const actions = [
    { icon: 
      <input style={{width: 40, height: 40, borderRadius: '50%', border: 'none'}} value={diasParaContarServico} onChange={(e) => setDiasParaContarServico(e.target.value)} min="0" max="99" type="number"></input>, 
      name: 'Número de folga',
      closeOnClick: false 
    },
    { icon: <EventIcon onClick={gerarPrevisaoDeServico}/>, name: 'Previsão do dia', closeOnClick: true },
    { icon: <EventNoteIcon onClick={gerarPrevisaoDeServicoMensal} />, name: 'Previsão mensal', closeOnClick: true },
    { icon: <ClearIcon onClick={zerarPrevisao}/>, name: 'Retirar previsão', closeOnClick: true },
  ];

  const handleDirectionChange = (event) => {
    setDirection(event.target.value);
  };

  const handleHiddenChange = (event) => {
    setHidden(event.target.checked);
  };

  const handleClose = ( obj ) => {

    if( obj.closeOnClick ){
        setOpen(false);
    }

  };

  const handleCloseOnClick = ( ) => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <div className={open ? classes.exampleWrapperOpen : classes.exampleWrapper}>
        <SpeedDial
          ariaLabel="SpeedDial example"
          className={classes.speedDial}
          hidden={hidden}
          icon={<SpeedDialIcon />}
          onClose={handleCloseOnClick}
          onOpen={handleOpen}
          open={open}
          direction={direction}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
              onClick={() => handleClose(action)}
              classes={classes}
            />
          ))}
        </SpeedDial>
      </div>
    </div>
  );
}