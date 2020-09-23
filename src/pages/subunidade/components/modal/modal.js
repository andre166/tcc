// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Dialog from '@material-ui/core/Dialog';
// import Divider from '@material-ui/core/Divider';
// import Grid from '@material-ui/core/Grid';
// import { deletarSubunidade } from '../../../../components/services/subunidadeService';
// import { styles } from './modalStyles';

// class SimpleDialog extends React.Component {

//   excluir = (id) => {
//     deletarSubunidade(id);
//     this.handleClose()
//   }
 
//   handleClose = () => {
//     this.props.onClose(this.props.selectedValue);
//   };

//   handleListItemClick = value => {
//     this.props.onClose(value);
//   };

//   render() {
//     const { classes, onClose, selectedValue, ...other } = this.props;

//     return (
//     <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other} >

//         <div className={classes.modal}>

//           <DialogTitle id="simple-dialog-title">
//             Deseja excluir <strong>{this.props.subunidade.nomeSubunidade}</strong> ?
//           </DialogTitle>

//           <Divider style={{marginTop: 5, marginBottom: 10}}/>

//           <Grid container direction="row" alignItems="flex-start" justify="space-around" style={{padding: 10}}>
//             <Button variant="contained" id="BtnExcluir" color="primary" className={classes.button} onClick={() => this.excluir(this.props.subunidade.id)}>sim</Button>
//             <Button variant="contained" color="secondary" onClick={this.handleClose} className={classes.button}>Não</Button>
            
//           </Grid>

//         </div>
//       </Dialog>
//     );
//   }
// }

// SimpleDialog.propTypes = {
//   classes: PropTypes.object.isRequired,
//   onClose: PropTypes.func,
//   selectedValue: PropTypes.string,
// };

// const SimpleDialogWrapped = withStyles(styles)(SimpleDialog);

// class SimpleDialogDemo extends React.Component {

//   state = {
//     open: false,
//   };

  
//   handleClickOpen = () => {
//     this.setState({
//       open: true,
//     });
//   };
  
//   handleClose = value => {
//     this.setState({ selectedValue: value, open: false });
//   };
  
//   render() {

//     console.log("aaa", this.props);
//     return (
//       <div>
//         <Button variant="outlined" color="secondary" size="small" onClick={this.handleClickOpen}>
//           Excluir
//         </Button>
//         <SimpleDialogWrapped
//           subunidade={this.props.subunidade}
//           selectedValue={this.state.selectedValue}
//           open={this.state.open}
//           onClose={this.handleClose}
//         />
//       </div>
//     );
//   }
// }

// export default SimpleDialogDemo;