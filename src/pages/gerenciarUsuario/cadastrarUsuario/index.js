import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

// import { listarOm } from '../../components/services/omServices';
// import { listarPerfis, listarPerfisComRestricao, cadastrarUsuarioAutenticado } from '../../components/services/authService';
// import { listarSubunidades } from '../../components/services/subunidadeService';

export default function CadastrarAdmin2(){

    let [listaDeOm, setListaDeOm] = useState("");
    let [listaDePerfis, setListaDePerfis] = useState("");
    let [listaDeSubunidades, setListaDeSubunidades] = useState("");
    let [loading, setLoading] = useState(true);
    let [nome, setNome] = useState("");
    let [cpf, setCpf] = useState("");
    let [om, setOm] = useState([]);
    let [perfil, setPerfil] = useState("");
    let [nomeUsuario, setNomeUsuario] = useState("");
    let [senha, setSenha] = useState("");
    let [subunidade, setSubunidade] = useState("");


    // useEffect(() => {

    //   const inicializarForm = async () => {

    //     let omId = localStorage.getItem("om");
    //     let omList = '';

    //     if( omId ){
    //       omList = await listarOm( omId );
    //     }else{
    //       omList = await listarOm( );
    //       setListaDeOm(omList);
    //     }

    //     let listaSu = await listarSubunidades( om );
    //     let perfilList = await listarPerfisComRestricao();
    //     console.log("listaSu", listaSu)
    //     setListaDeSubunidades(listaSu)
    //     setListaDePerfis(perfilList)
    //     setLoading(false);

    //   }

    //   inicializarForm()
    // }, []);

    const useStyles = makeStyles((theme) => ({
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 100,
      },
    }));

    const enviarForm = (e) => {

      e.preventDefault();
      let usuario = {};
      let omId = localStorage.getItem("om");

      if( omId ){

        usuario = {
          nome: nome,
          cpf: cpf,
          om: {nome: "", id_om: omId},
          perfil: perfil,
          nomeUsuario: nomeUsuario,
          senha: senha,
          subunidade: subunidade
        }

      }else{
        usuario = {
          nome: nome,
          cpf: cpf,
          om: om,
          perfil: perfil,
          nomeUsuario: nomeUsuario,
          senha: senha,
          subunidade: subunidade
        }
      }

      console.log("user", usuario)

      // cadastrarUsuarioAutenticado( usuario )

    }


    // if(loading){ // caso a página esteja carregando mostra uma msg de loading
    //     return(
    //       <div className="loading-container">
    //         <p>
    //           Carregando...
    //         </p>
    //       </div>
    //     )
    //   }

    return(
        <Grid container direction="row" alignItems="flex-start" className="subunidade-container" justify="center">

            <Grid className="subunidade-form" direction="column">

                <Grid container alignItems="center" justify="center">
                    <h2> Cadastrar usuário</h2>
                </Grid>

                <form noValidate autoComplete="off" onSubmit={(e) => enviarForm(e)}>
              
                <Grid container direction="row" justify="flex-start" alignItems="flex-start">

                  <div className="mr-4">

                      <TextField
                        className="txtField inputGrande"
                        id="outlined-required"
                        label="Nome completo"
                        margin="normal"
                        variant="outlined"
                        style={{width: 300}}
                        onChange={e => setNome(e.target.value) }
                      />

                </div>

                <div className="mr-4">

                  <TextField
                      className="txtField inputGrande"
                      id="outlined-required"
                      label="CPF"
                      margin="normal"
                      variant="outlined"
                      onChange={e => setCpf(e.target.value) }
                      
                  />

                </div>
                  {listaDeOm.length === 0 ? '' :

                    <TextField
                        className="txtField mr-4"
                        id="outlined-required"
                        label="OM"
                        margin="normal"
                        variant="outlined"
                        style={{width: 120}}
                        select
                        onChange={e => setOm(e.target.value) }

                    >

                        {listaDeOm.map( ( unidade, index) => (

                        <option key={index} value={ unidade} className="option">
                            {unidade.nome}
                        </option>

                        ))}

                    </TextField>
                  }

          

                    {listaDePerfis.length ===0 ? '' : 
                      <TextField
                          className="txtField mr-4"
                          id="outlined-required"
                          label="Perfil"
                          margin="normal"
                          variant="outlined"
                          style={{width: 120}}
                          select
                          onChange={e => setPerfil(e.target.value) }

                      >

                          {listaDePerfis.map( ( objPerfil, index) => (

                          <option key={index} value={ objPerfil } className="option">
                              {objPerfil.perfil}
                          </option>

                          ))}

                      </TextField>
                    }

                    {listaDeSubunidades.length ===0 ? '' : 
                      <TextField
                          className="txtField mr-4"
                          id="outlined-required"
                          label="Subunidade"
                          margin="normal"
                          variant="outlined"
                          style={{width: 130}}
                          select
                          onChange={e => setSubunidade(e.target.value) }

                      >
                          {listaDeSubunidades.map( ( subunidade, index) => (

                          <option key={index} value={ subunidade } className="option">
                              {subunidade.nome}
                          </option>

                          ))}

                      </TextField>
                    }

                    <div  className="mr-4">

                      <TextField
                          className="txtField inputGrande"
                          id="outlined-required"
                          label="Nome de usuário"
                          margin="normal"
                          variant="outlined"
                          style={{width: 300}}
                        onChange={e => setNomeUsuario(e.target.value) }
                          
                      />

                </div>

                <div  className="mr-4">

                      <TextField
                          className="txtField inputGrande"
                          id="outlined-required"
                          label="Senha"
                          margin="normal"
                          variant="outlined"
                          style={{width: 300}}
                          onChange={e => setSenha(e.target.value) }
                          
                      />

                </div>

              </Grid>

              <Divider className="divider"/>

              <Grid container direction="row" justify="center" alignItems="center">
                <Button variant="contained" color="primary" type="submit">Cadastrar</Button>
              </Grid>


              </form>
                
            </Grid>
        </Grid>
    );
    
}

