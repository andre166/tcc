import React from 'react';
import '../cadastrarContato.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

export default function FormMilitar( { 
        arrayDeGraduacoes, arrayDeComportamentos,
        setNumero, setRa, setNomeDeGuerra,
        setQm, setCpto, setDataPraca, setPostGrad
    }){
    
    return(

        <Grid container direction="row" alignItems="center" justify="center">
            
            <Grid container direction="row" justify="flex-start" alignItems="center" spacing={5}>

                <Grid item xs={12} sm={4} lg={2}>

                    <TextField
                        style={{width: '100%', maxWidth: 100}}
                        id="outlined-required"
                        label="Nº"
                        margin="dense"
                        variant="outlined"
                        type="number"
                        min="1"
                        onChange={e => setNumero(e.target.value) }
                    />

                </Grid>

                <Grid item xs={12} sm={4} lg={2}>

                    <TextField
                        style={{width: '100%', maxWidth: 200}}
                        id="outlined-required"
                        label="RA"
                        margin="dense"
                        variant="outlined"
                        onChange={e => setRa(e.target.value) }
                        
                    />

                </Grid>

                <Grid item xs={12} sm={4} lg={2}>

                    <TextField
                        style={{width: '100%', maxWidth: 200}}
                        id="outlined-required"
                        label="Nome de guerra"
                        margin="dense"
                        variant="outlined"
                        onChange={e => setNomeDeGuerra(e.target.value) }
                    />

                </Grid>

                <Grid item xs={12} sm={4} lg={2} >

                    <TextField
                        style={{width: '100%', maxWidth: 150}}
                        id="outlined-required"
                        label="QM"
                        margin="dense"
                        variant="outlined"
                        onChange={e => setQm(e.target.value) }
                    />

                </Grid>

                <Grid item xs={12} sm={4} lg={2}>

                    <TextField
                        style={{width: '100%', maxWidth: 180}}
                        select
                        id="outlined-required"
                        margin="dense"
                        variant="outlined"
                        label="Comportamento"
                        onChange={e => setCpto(e.target.value) }
                    >

                    {arrayDeComportamentos.map( (tipo, index) => (

                        <option key={index} value={ tipo } className="option">
                            { tipo }
                        </option>

                    ))}

                    </TextField>

                </Grid>


                <Grid item xs={12} sm={4} lg={2}>

                    <label className="labelDataNascimento">Data de praça:</label>

                    <TextField
                        style={{width: '100%', maxWidth: 150}}
                        type="date"
                        id="outlined-required"
                        margin="dense"
                        defaultValue="2017-05-24"
                        onChange={e => setDataPraca(e.target.value) }
                    />

                </Grid>


                <Grid item xs={12} sm={4} lg={2}>

                    <TextField
                        style={{width: '100%', maxWidth: 150}}
                        select
                        id="outlined-required"
                        margin="dense"
                        variant="outlined"
                        label="Post/Grad"
                        onChange={e => setPostGrad(e.target.value) }
                    > 

                        {arrayDeGraduacoes.map( graduacao => (

                            <option key={graduacao.grad} value={graduacao.grad} className="option">
                                {graduacao.grad}
                            </option>

                        ))}

                    </TextField>

                </Grid>

            </Grid>
        </Grid>

    );

}