import React, { useState } from 'react';
import '../cadastrarContato.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

export default function FormEndereco({
    setEstado, setCidade, setBairro, setRuaLote
    }){
    
    return(

        <>

            <Grid container direction="row" justify="space-between" alignItems="center">

                <Grid item xs={12} sm={4} lg={3}>

                    <TextField
                        id="outlined-required"
                        label="Estado"
                        margin="dense"
                        variant="outlined"
                        onChange={e => setEstado(e.target.value) }
                    />

                </Grid>

                <Grid item xs={12} sm={4} lg={3}>

                    <TextField
                        id="outlined-required"
                        label="Cidade"
                        margin="dense"
                        variant="outlined"
                        onChange={e => setCidade(e.target.value) }
                    />

                </Grid>

                <Grid item xs={12} sm={4} lg={3}>

                    <TextField
                        id="outlined-required"
                        margin="dense"
                        variant="outlined"
                        label="Bairro"
                        onChange={e => setBairro(e.target.value) }
                    />

                </Grid>

                <Grid item xs={12} sm={4} lg={3}>

                    <TextField
                        id="outlined-required"
                        margin="dense"
                        variant="outlined"
                        label="Rua/lote"
                        style={{width: 400}}
                        onChange={e => setRuaLote(e.target.value) }
                    />

                </Grid>

            </Grid>

            <Grid container direction="row" justify="space-between" alignItems="center">

               


            </Grid>
        </>
    );

}