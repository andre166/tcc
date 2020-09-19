import React, { useState } from 'react';
import './cadastrarContato.css';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import FormEndereco from './components/formEndereco';
import FormPessoal from './components/formPessoal';
import FormMilitar from './components/formMilitar';
import Button from '@material-ui/core/Button';


export default function AddContato() {

    //Form PESSOAL
    let [nomeCompleto, setNomeCompleto] = useState("");
    let [cpf, setCpf] = useState("");
    let [rg, setRg] = useState("");
    let [genero, setGenero] = useState("");
    let [dataNasc, setDataNasc] = useState("");
    let [email, setEmail] = useState("");
    let [nomeMae, setNomeMae] = useState("");
    let [nomePai, setNomePai] = useState("");
    let [estadoCivil, setEstadoCivil] = useState("");
    let [idiomas, setIdiomas] = useState("");
    let [ telefones, setTelefones] = useState([ [null, null, null],[null, null, null]]);

    //Form MILITAR
    let [numero, setNumero] = useState("");
    let [ra, setRa] = useState("");
    let [nomeDeGuerra, setNomeDeGuerra] = useState("");
    let [qm, setQm] = useState("");
    let [cpto, setCpto] = useState("");
    let [dataPraca, setDataPraca] = useState("");
    let [postGrad, setPostGrad] = useState("");

    //Form ENDEREÇO

    let [estado, setEstado] = useState("");
    let [cidade, setCidade] = useState("");
    let [bairro, setBairro] = useState("");
    let [ruaLote, setRuaLote] = useState("");
    
    const arrayDeGraduacoes = [
        {grad: 'SGT'}, {grad: 'CB'},{grad: 'SD EP'}, {grad: 'SD EV'}
    ]

    const arrayDeGeneros = [
        'Masculino', 'Feminino'
    ]

    const arrayDeEstadoCivil = [
        'Solteiro', 'Casado','Divorciado', 'Viúvo'
    ]

    const arrayDeTiposDeTelefones = [
        'Fixo', 'Celular', 'Familiar'
    ]

    const arrayDeComportamentos = [
        'I', 'R', 'B', 'MB', 'E'
    ]

    const enviarForm = (e) => {

        e.preventDefault();

        if(idiomas.length > 0){
            var idiomasInArray = idiomas.split(',')
    
            var listaDeIdiomas = [];
    
            idiomasInArray.map( idi => {
                listaDeIdiomas.push(idi.trim());
            })

        }

        let omId = localStorage.getItem("om");
        let subunidadeId = localStorage.getItem("subunidade");

        let usuario = {
            nomeCompleto: nomeCompleto,
            dataNasc: dataNasc,
            genero: genero == 'Feminino' ? 'F' : 'M',
            cpf: cpf,
            rg: rg,
            email: email,
            rg: rg,
            nomePai: nomePai,
            nomeMae: nomeMae,
            estadoCivil: estadoCivil,
            idiomas: listaDeIdiomas,
            telefones: telefones,
            numero: numero,
            ra: ra,
            nomeDeGuerra: nomeDeGuerra,
            qm: qm,
            cpto: cpto,
            dataPraca: dataPraca,
            postGrad: postGrad,
            estado:estado,
            cidade: cidade,
            bairro: bairro,
            ruaLote: ruaLote,
            om: omId,
            subunidade: subunidadeId
        };

        // cadastrarUsuario( usuario );

    }
   
    return(
        <Grid  container direction="row" justify="space-evenly" alignItems="center" className="container-cadastrarContato">

            <form className="container-form" onSubmit={(e) => enviarForm(e)}>

                <Grid container alignItems="center" justify="center">
                    <h2>Cadastrar militar</h2>
                </Grid>

                <FormPessoal  
                    arrayDeGeneros={arrayDeGeneros} 
                    arrayDeEstadoCivil={arrayDeEstadoCivil} 
                    arrayDeTiposDeTelefones={arrayDeTiposDeTelefones}
                    setNomeCompleto={setNomeCompleto}
                    setCpf={setCpf}
                    setRg={setRg}
                    setGenero={setGenero}
                    setDataNasc={setDataNasc}
                    setEmail={setEmail}
                    setRa={setRa}
                    setNomeMae={setNomeMae}
                    setNomePai={setNomePai}
                    setEstadoCivil={setEstadoCivil}
                    setIdiomas={setIdiomas}
                    setTelefones={setTelefones}
                    telefones={telefones}
                />

                <FormMilitar 
                    arrayDeGraduacoes={arrayDeGraduacoes} 
                    arrayDeComportamentos={arrayDeComportamentos}
                    setNumero={setNumero}
                    setRa={setRa}
                    setNomeDeGuerra={setNomeDeGuerra}
                    setQm={setQm}
                    setCpto={setCpto}
                    setDataPraca={setDataPraca}
                    setPostGrad={setPostGrad}
                />

                <FormEndereco 
                    setEstado={setEstado}
                    setCidade={setCidade}
                    setBairro={setBairro}
                    setRuaLote={setRuaLote}
                /> 

                <Divider className="divider" />

                <Grid container direction="row" justify="center" alignItems="center">

                    <Button variant="contained" color="primary" className="btn-success" type="submit">
                        Cadastrar
                    </Button>

                </Grid>

                
            </form>
        </Grid>
              
    );
}
