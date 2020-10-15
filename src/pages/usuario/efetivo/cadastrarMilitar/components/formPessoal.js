import React, { useState } from 'react';
import '../cadastrarContato.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import HelpIcon from '@material-ui/icons/Help';
import Tooltip from '@material-ui/core/Tooltip';
import { useStyles } from './formStyle';
import LightTooltip from '../../../../../utils/toolTip';

export default function FormPessoal( { 
        arrayDeGeneros, arrayDeEstadoCivil, arrayDeTiposDeTelefones,
        setNomeCompleto, setCpf, setRg, setGenero, setDataNasc,
        setEmail, setNomeMae, setNomePai, setEstadoCivil,
        setIdiomas, setTelefones, telefones
    }){

    const classes = useStyles();
        

    async function setarTelefone( e, key ){

        let tel = telefones;
        let keyDoArray = key[0];
        let keyDoArray2 = key[1];
        
        tel[keyDoArray][keyDoArray2] = await e

        await setTelefones(tel)

    }

    const txt_tooltipIdiomas = 'Para adicionar mais de um idioma escreva o 1º idioma depois vírgula e após a vírgula o próximo idioma. Ex: inglês, espanhol, português';
    
    return(

        <Grid className={classes.containerGeral} container direction="row" alignItems="center" justify="center" >

            <Divider className="divider" style={{marginTop: 0}}/>
            
            <Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={2}>

                <Grid item xs={12} sm={4} lg={3}>

                    <TextField
                        fullWidth
                        id="outlined-required"
                        label="Nome completo"
                        margin="dense"
                        variant="outlined"
                        onChange={e => setNomeCompleto(e.target.value) }
                    />

                </Grid>

                <Grid item xs={12} sm={4} lg={2}>

                    <TextField
                        fullWidth
                        id="outlined-required"
                        label="CPF"
                        margin="dense"
                        variant="outlined"
                        onChange={e => setCpf(e.target.value) }
                    />

                </Grid>

                <Grid item xs={12} sm={4} lg={2}>

                    <TextField
                        fullWidth
                        id="outlined-required"
                        label="RG"
                        margin="dense"
                        variant="outlined"
                        onChange={e => setRg(e.target.value) }
                    />

                </Grid>

                <Grid item xs={12} sm={4} lg={2}>

                    <TextField
                        fullWidth
                        id="outlined-required"
                        label="Genero"
                        margin="dense"
                        variant="outlined"
                        style={{width: '100%', maxWidth: 150}}
                        select
                        onChange={e => setGenero(e.target.value) }
                    >

                        {arrayDeGeneros.map( (genero, index) => (

                        <option key={index} value={ genero} className="option">
                            {genero}
                        </option>

                        ))}

                    </TextField>

                </Grid>

                <Grid item xs={12} sm={4} lg={3}>

                    <TextField
                        fullWidth
                        id="outlined-required"
                        label="Nome do pai"
                        margin="dense"
                        variant="outlined"
                        onChange={e => setNomePai(e.target.value) }
                    />

                </Grid>

                <Grid item xs={12} sm={4} lg={3}>

                    <TextField
                        fullWidth
                        id="outlined-required"
                        label="Nome da mãe"
                        margin="dense"
                        variant="outlined"
                        onChange={e => setNomeMae(e.target.value) }
                    />

                </Grid>

                <Grid item xs={12} sm={4} lg={3}>

                    <TextField
                        fullWidth
                        // className="txtField"
                        id="outlined-required"
                        label="Email"
                        margin="dense"
                        variant="outlined"
                        onChange={e => setEmail(e.target.value) }
                    />

                </Grid>

                <Grid item xs={12} sm={4} lg={3}>

                    <TextField
                        fullWidth
                        type="date"
                        id="outlined-required"
                        margin="dense"
                        defaultValue="2017-05-24"
                        onChange={e => setDataNasc(e.target.value) }
                    />

                </Grid>

                <Grid item xs={12} sm={4} lg={3}>
                    <TextField
                        fullWidth
                        id="outlined-required"
                        label="Estado Civil"
                        margin="dense"
                        variant="outlined"
                        select
                        onChange={e => setEstadoCivil(e.target.value) }
                    >

                        {arrayDeEstadoCivil.map( (tipo, index) => (

                        <option key={index} value={ tipo} className="option">
                            {tipo}
                        </option>

                        ))}

                    </TextField>

                </Grid>


            <Grid item xs={12} sm={6} lg={3} style={{minWidth: 340 }}>

                <TextField
                    id="outlined-required"
                    label="Tipo"
                    margin="dense"
                    variant="outlined"
                    select
                    style={{width: '100%', maxWidth: 120}}
                    onChange={e => setarTelefone(e.target.value, [0,1]) }
                >



                    {arrayDeTiposDeTelefones.map( (tipo, index) => (

                    <option key={index} value={ tipo} className="option">
                        {tipo}
                    </option>

                    ))}

                </TextField>

                <TextField
                    style={{width: 'calc(100% - 120px)'}}
                    id="outlined-required"
                    label="Telefone 1"
                    margin="dense"
                    variant="outlined"
                    onChange={e => setarTelefone(e.target.value, [0,2]) }
                />

            </Grid>

            <Grid item xs={12} sm={6} lg style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>

                <TextField
                    style={{width: '100%', maxWidth: 120}}
                    id="outlined-required"
                    label="Tipo"
                    margin="dense"
                    variant="outlined"
                    select
                    onChange={e => setarTelefone(e.target.value, [1,1]) }
                >

                    {arrayDeTiposDeTelefones.map( (tipo, index) => (

                    <option key={index} value={ tipo} className="option">
                        {tipo}
                    </option>

                    ))}

                </TextField>

                <TextField
                    style={{width: '100%', maxWidth: 280}}
                    id="outlined-required"
                    label="Telefone 2"
                    margin="dense"
                    variant="outlined"
                    onChange={e => setarTelefone(e.target.value, [1,2]) }

                /> 
            </Grid>

        </Grid>
        </Grid>
    );
}