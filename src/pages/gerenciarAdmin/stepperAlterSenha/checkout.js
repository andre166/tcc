import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddressForm from './adminPassWord';
import PaymentForm from './refefinição';
import Review from './review';
import Grid from '@material-ui/core/Grid';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  layout: {
    width: '100%',
    overflowX: 'hidden',
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
    width: 550,
    },
  },
  paper: {
    padding: 20,
    overflowX: 'hidden',
  },
  stepper: {
    flexWrap: 'wrap'
  },
  buttons: {
    
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  buttonDangerSm: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    backgroundColor: '#ed3237',
    '&:hover': {
      background: "#7f3436",
   },
  },
  title: {
    padding: 10, 
    background: '#eeeeee', 
    width: '100%', 
    textAlign: 'center',
  },
  titleTipogra: {
    fontSize: '20pt',
    [theme.breakpoints.down('xs')]: {
      fontSize: '14pt',
    }
  }

}));

const steps = ['Confirmação', 'Autenticação', 'Alteração'];

export default function Checkout( {rowInfo, handleClose} ) {

  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const [ authOk, setAuthOk] = useState(false);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleBackfromLogin = () => {

    setActiveStep(activeStep - 1);
    setAuthOk(false);

  }

  function getStepContent(step, rowInfo) {
    switch (step) {
      case 0:
        return <AddressForm rowInfo={rowInfo} setActiveStep={setActiveStep} />;
      case 1:
        return <PaymentForm handleNext={handleNext} rowInfo={rowInfo} authOk={authOk} setAuthOk={setAuthOk}/>;
      case 2:
        return <Review handleNext={handleNext} rowInfo={rowInfo}/>
      default:
        throw new Error('Unknown step');
    }
  }

  const backAndClean = async () => {

    if( authOk ){
        setAuthOk(false)
    }
    handleBack()

  }

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
            <Grid container style={{overflow: 'hidden'}} direction="row" alignItems="center" justify="center">
           <Paper  className={classes.title}  >
              <Typography className={classes.titleTipogra}  component="h2" variant="h4">
                  Redefinir Senha
              </Typography>
           </Paper>
           </Grid>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label, i) => (

              <Step key={label} style={{margin: i == 1 && '5px 0px'}}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>

                <Typography variant="h2" gutterBottom>
                    <Alert severity="success">Senha redefinida com sucesso!</Alert>
                </Typography>

                <Grid container direction="column" justify="center" alignItems="center" >
                    <Button style={{marginTop: 10}} variant="contained" color="primary" onClick={handleClose}>fechar</Button>
                </Grid>

              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep, rowInfo)}
                <div className={classes.buttons}>

                {activeStep === 0 && 
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleClose}
                        className={classes.buttonDangerSm}
                    >
                        Não
                    </Button>
                }

                  {activeStep !== 0 && activeStep !== 1 && (
                    <Button onClick={backAndClean} className={classes.button}
                        variant="outlined"
                        color="default"
                        startIcon={<KeyboardReturnIcon />}
                    >
                        Voltar
                    </Button>
                  )}

                  {activeStep == 1 && (
                    <Button onClick={handleBackfromLogin} className={classes.button}
                        variant="outlined"
                        color="default"
                        startIcon={<KeyboardReturnIcon />}
                    >
                        Voltar
                    </Button>
                  )}

                 {activeStep !== 1 && activeStep !== 2 && <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === 0 && 'Sim'}
                    {activeStep === 1 && 'Confirmar'}
                    {activeStep === 2 && 'Alterar'}
                  </Button>}

                  {activeStep == 1 && authOk && <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === 0 && 'Sim'}
                    {activeStep === 1 && 'Confirmar'}
                    {activeStep === 2 && 'Alterar'}
                  </Button>}

                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}