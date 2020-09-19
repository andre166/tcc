import React, { useState } from 'react';
import '../cadastrarContato.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

export default function FormMilitar( 
        { 

            arrayDeGraduacoes, arrayDeComportamentos,
            setNumero, setRa, setNomeDeGuerra,
            setQm, setCpto, setDataPraca, setPostGrad

        } 
    ){
    
    return(

        <>

            <Divider className="divider" />

            <Grid container alignItems="center" justify="center" className="h4Form">
                <h5>Militar</h5>
            </Grid>
            
            <Grid container direction="row" justify="flex-start" alignItems="center">

                <div className="mr-4">

                    <TextField
                        className="txtField"
                        id="outlined-required"
                        label="Nº"
                        margin="normal"
                        variant="outlined"
                        style={{width: 120}}
                        type="number"
                        min="1"
                        onChange={e => setNumero(e.target.value) }
                        
                    />

                </div>

                <div className="mr-4">

                    <TextField
                        className="txtField"
                        id="outlined-required"
                        label="RA"
                        margin="normal"
                        variant="outlined"
                        onChange={e => setRa(e.target.value) }
                        
                    />

                </div>

                <div className="mr-4">

                    <TextField
                        className="txtField"
                        id="outlined-required"
                        label="Nome de guerra"
                        margin="normal"
                        variant="outlined"
                        onChange={e => setNomeDeGuerra(e.target.value) }
                    />

                </div>

                <div className="mr-4">

                    <TextField
                        className="txtField"
                        id="outlined-required"
                        label="QM"
                        margin="normal"
                        variant="outlined"
                        onChange={e => setQm(e.target.value) }
                    />

                </div>

                <div className="mr-4">

                    <TextField
                        select
                        className="txtField"
                        id="outlined-required"
                        margin="normal"
                        variant="outlined"
                        style={{width: 170}}
                        label="Comportamento"
                        onChange={e => setCpto(e.target.value) }
                    >

                    {arrayDeComportamentos.map( (tipo, index) => (

                        <option key={index} value={ tipo } className="option">
                            { tipo }
                        </option>

                    ))}

                    </TextField>

                </div>


                <div className="inputDataNascimento mr-4">

                    <label className="labelDataNascimento">Data de praça:</label>

                    <TextField
                        type="date"
                        id="outlined-required"
                        margin="0"
                        defaultValue="2017-05-24"
                        onChange={e => setDataPraca(e.target.value) }
                    />

                </div>


                <div className="mr-3">

                    <TextField
                        select
                        className="txtField"
                        id="outlined-required"
                        margin="normal"
                        variant="outlined"
                        style={{width: 120}}
                        label="Post/Grad"
                        onChange={e => setPostGrad(e.target.value) }
                    > 
                    {arrayDeGraduacoes.map( graduacao => (

                        <option key={graduacao.grad} value={graduacao.grad} className="option">
                            {graduacao.grad}
                        </option>

                    ))}

                    </TextField>

                </div>

            </Grid>
        </>

    );

}