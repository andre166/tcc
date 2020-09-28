import React, { useState } from 'react';
import '../cadastrarContato.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

export default function FormEndereco(
        {
            setEstado, setCidade, setBairro,
            setRuaLote
        }
    ){
    
    return(

        <>
            <Divider className="divider" />

            <Grid container alignItems="center" justify="center" className="h4Form">
                <h5>Endereço</h5>
            </Grid>

            <Grid container direction="row" justify="space-between" alignItems="center">

                <div>

                    <TextField
                        className="txtField"
                        id="outlined-required"
                        label="Estado"
                        margin="normal"
                        variant="outlined"
                        onChange={e => setEstado(e.target.value) }
                    />

                </div>

                <div>

                    <TextField
                        className="txtField"
                        id="outlined-required"
                        label="Cidade"
                        margin="normal"
                        variant="outlined"
                        onChange={e => setCidade(e.target.value) }
                    />

                </div>

                <div>

                    <TextField
                        className="txtField"
                        id="outlined-required"
                        margin="normal"
                        variant="outlined"
                        label="Bairro"
                        onChange={e => setBairro(e.target.value) }
                    />

                </div>

                <div>

                    <TextField

                        className="txtField"
                        id="outlined-required"
                        margin="normal"
                        variant="outlined"
                        label="Rua/lote"
                        style={{width: 400}}
                        onChange={e => setRuaLote(e.target.value) }
                    />

                </div>

                {/* <div>

                    <TextField
                        className="txtField"
                        id="outlined-required"
                        margin="normal"
                        variant="outlined"
                        label="Local de nascimento"
                        style={{width: 400}}
                        onChange={e => setLocalNascimento(e.target.value) }
                    />

                </div> */}


            </Grid>

            <Grid container direction="row" justify="space-between" alignItems="center">

               


            </Grid>
        </>
    );

}