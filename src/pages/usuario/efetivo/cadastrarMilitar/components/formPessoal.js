import React, { useState } from 'react';
import '../cadastrarContato.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import HelpIcon from '@material-ui/icons/Help';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

export default function FormPessoal( 
    { 
        arrayDeGeneros, arrayDeEstadoCivil, arrayDeTiposDeTelefones,
        setNomeCompleto, setCpf, setRg, setGenero, setDataNasc,
        setEmail, setRa, setNomeMae, setNomePai, setEstadoCivil,
        setIdiomas, setTelefones, telefones
    } 
    
    ){

    async function setarTelefone( e, key ){

        let tel = telefones;
        let keyDoArray = key[0];
        let keyDoArray2 = key[1];
        
        tel[keyDoArray][keyDoArray2] = await e

        await setTelefones(tel)

    }

    const LightTooltip = withStyles((theme) => ({
        tooltip: {
            padding: 15,
            border: '1px solid #1d3724',
            backgroundColor: theme.palette.common.white,
            color: 'rgba(0, 0, 0)',
            boxShadow: theme.shadows[1],
            fontSize: 16,
        },
      }))(Tooltip);

    const txt_tooltipIdiomas = 'Para adicionar mais de um idioma escreva o 1º idioma depois vírgula e após a vírgula o próximo idioma. Ex: inglês, espanhol, português';
    
    return(

        <>

            <Divider className="divider" style={{marginTop: 0}}/>

            <Grid container alignItems="center" justify="center" className="h4Form">
                <h5>Civil</h5>
            </Grid>
            
            <Grid container direction="row" justify="space-between" alignItems="flex-start">

                <div>

                    <TextField
                        className="txtField inputGrande"
                        id="outlined-required"
                        label="Nome completo"
                        margin="normal"
                        variant="outlined"
                        style={{width: 400}}
                        onChange={e => setNomeCompleto(e.target.value) }
                    />

                </div>

                <div>

                    <TextField
                        className="txtField"
                        id="outlined-required"
                        label="CPF"
                        margin="normal"
                        variant="outlined"
                        onChange={e => setCpf(e.target.value) }
                    />

                </div>

                <div>

                    <TextField
                        className="txtField"
                        id="outlined-required"
                        label="RG"
                        margin="normal"
                        variant="outlined"
                        onChange={e => setRg(e.target.value) }
                    />

                </div>

                <div>

                    <TextField
                        className="txtField"
                        id="outlined-required"
                        label="Genero"
                        margin="normal"
                        variant="outlined"
                        style={{width: 120}}
                        select
                        onChange={e => setGenero(e.target.value) }
                    >

                        {arrayDeGeneros.map( (genero, index) => (

                        <option key={index} value={ genero} className="option">
                            {genero}
                        </option>

                        ))}

                    </TextField>

                </div>

                <div>

                    <TextField
                        className="txtField"
                        id="outlined-required"
                        label="Nome completo do pai"
                        margin="normal"
                        variant="outlined"
                        style={{width: 400}}
                        onChange={e => setNomePai(e.target.value) }
                    />

                </div>

                <div>

                    <TextField
                        className="txtField"
                        id="outlined-required"
                        label="Nome completo da mãe"
                        margin="normal"
                        variant="outlined"
                        style={{width: 400}}
                        onChange={e => setNomeMae(e.target.value) }

                        
                    />

                </div>

                <div>

                    <TextField
                        className="txtField"
                        id="outlined-required"
                        label="Email"
                        margin="normal"
                        variant="outlined"
                        onChange={e => setEmail(e.target.value) }
                    />

                </div>

                <div className="inputDataNascimento">

                    <label className="labelDataNascimento">Data de nascimento:</label>

                    <TextField
                        type="date"
                        id="outlined-required"
                        margin="0"
                        defaultValue="2017-05-24"
                        onChange={e => setDataNasc(e.target.value) }
                    />

                </div>

                <div>

                    <TextField
                        className="txtField"
                        id="outlined-required"
                        label="Idiomas"
                        margin="normal"
                        variant="outlined"
                        onChange={e => setIdiomas(e.target.value) }
                        
                    />

                <LightTooltip  title={txt_tooltipIdiomas} aria-label="add">
                    <HelpIcon className="helpIcon_idiomas"></HelpIcon>
                </LightTooltip >


                </div>

                <div>
                    <TextField
                        className="txtField"
                        id="outlined-required"
                        label="Estado Civil"
                        margin="normal"
                        variant="outlined"
                        style={{width: 135}}
                        select
                        onChange={e => setEstadoCivil(e.target.value) }

                    >

                        {arrayDeEstadoCivil.map( (tipo, index) => (

                        <option key={index} value={ tipo} className="option">
                            {tipo}
                        </option>

                        ))}

                    </TextField>

                </div>

            </Grid>

            <Grid container direction="row" justify="start" alignItems="flex-start">


                <div className="mr-4">

                    <TextField
                        className="txtField"
                        id="outlined-required"
                        label="Tipo"
                        margin="normal"
                        variant="outlined"
                        style={{width: 115}}
                        select
                        onChange={e => setarTelefone(e.target.value, [0,1]) }
                    >



                        {arrayDeTiposDeTelefones.map( (tipo, index) => (

                        <option key={index} value={ tipo} className="option">
                            {tipo}
                        </option>

                        ))}

                    </TextField>

                    <TextField
                        className="txtField"
                        id="outlined-required"
                        label="Telefone 1"
                        margin="normal"
                        variant="outlined"
                        onChange={e => setarTelefone(e.target.value, [0,2]) }
                    />

                </div>

                <div>

                    <TextField
                        className="txtField"
                        id="outlined-required"
                        label="Tipo"
                        margin="normal"
                        variant="outlined"
                        style={{width: 115}}
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
                        className="txtField"
                        id="outlined-required"
                        label="Telefone 2"
                        margin="normal"
                        variant="outlined"
                        onChange={e => setarTelefone(e.target.value, [1,2]) }

                    /> 

                </div>

            </Grid>

        </>
    );
}