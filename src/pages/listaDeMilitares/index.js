// import React, { useEffect, useState } from 'react';
// import ShowRelatorio from './showRelatorio';
// // import customColumns from './customColumns';
// import { listarUsuario } from '../../components/services/usuarioService';

// export default function ListaDeContatos() {

//   let [listaDeUsuarios, setListaDeUsuarios] = useState("");
//   const [columns, setColumns] = useState([]);

//   useEffect(() => {

//     const a = async () => {

//       let list = await listarUsuario()
//       console.log("Lista =====>>", list)

//       let colunas = [

//         { 
//           title: 'numero', 
//           field: 'numero',
//           cellStyle: {
//             width: '100%',
//             minWidth: 90,
            

//           },
//           headerStyle: {
//             width: '100%',
//             minWidth: 90,
            
//           }
//         },

//         { 
//           title: 'postGrad', 
//           field: 'postGrad',
//           lookup: {SGT: 'SGT', CB: 'CB', SD: 'SD', SDEV: 'SD EV'},
//           cellStyle: {
//             width: '100%',
//             minWidth: 100,
//           },
//           headerStyle: {
//             width: '100%',
//             minWidth: 100,
//           }
//         },

//         { title: 'nomeDeGuerra', field: 'nomeDeGuerra'},
//         { 
//           title: 'Nome Completo', 
//           field: 'nome',
//           cellStyle: {
//             width: '100%',
//             minWidth: 350,
//           },
//           headerStyle: {
//             width: '100%',
//             minWidth: 350,
//           }
        
//         },

//         { 
//           title: 'nomeMae', 
//           field: 'nomeMae',
//           cellStyle: {
//             width: '100%',
//             minWidth: 350,
//           },
//           headerStyle: {
//             width: '100%',
//             minWidth: 350,
//           }
//         },


//         { 
//           title: 'nomePai', 
//           field: 'nomePai',
//           cellStyle: {
//             width: '100%',
//             minWidth: 350,
//           },
//           headerStyle: {
//             width: '100%',
//             minWidth: 350,
//           }
//         },


//         { 
//           title: 'qm', 
//           field: 'qm',
//           cellStyle: {
//             width: '100%',
//             minWidth: 160,
//           },
//           headerStyle: {
//             width: '100%',
//             minWidth: 160,
//           }
//         },

//         { 
//           title: 'email', 
//           field: 'email',
//           cellStyle: {
//             width: '100%',
//             minWidth: 230,
//           },
//           headerStyle: {
//             width: '100%',
//             minWidth: 230,
//           }
//         },
//         { 
//           title: 'cpf', 
//           field: 'cpf',
//           cellStyle: {
//             width: '100%',
//             minWidth: 215,
//           },
//           headerStyle: {
//             width: '100%',
//             minWidth: 215,
//           }
//         },
//         { 
//           title: 'ra', 
//           field: 'ra',
//           cellStyle: {
//             width: '100%',
//             minWidth: 215,
//           },
//           headerStyle: {
//             width: '100%',
//             minWidth: 215,
//           }
//         },
//         { 
//           title: 'rg', 
//           field: 'rg',
//           cellStyle: {
//             width: '100%',
//             minWidth: 215,
//           },
//           headerStyle: {
//             width: '100%',
//             minWidth: 215,
//           }
//         },

//         { 
//           title: 'dataDePraca', 
//           field: 'dataDePraca',
//           cellStyle: {
//             width: '100%',
//             minWidth: 190,
//           },
//           headerStyle: {
//             width: '100%',
//             minWidth: 190,
//           }
//         },
//         { 
//           title: 'dataNasc', 
//           field: 'dataNasc',
//           cellStyle: {
//             width: '100%',
//             minWidth: 190,
//           },
//           headerStyle: {
//             width: '100%',
//             minWidth: 190,
//           }
//         },

//         { 
//           title: 'estado', 
//           field: 'estado',
//           cellStyle: {
//             width: '100%',
//             minWidth: 190,
//           },
//           headerStyle: {
//             width: '100%',
//             minWidth: 190,
//           },
//           lookup: {
//             'Acre': 'Acre',
//             'Alagoas': 'Alagoas',
//             'Amapá': 'Amapá',
//             'Amazonas': 'Amazonas', 
//             'Bahia': 'Bahia',
//             'Ceará': 'Ceará',
//             'DistritoF ederal': 'DistritoFederal', 
//             'Espírito Santo': 'EspíritoSanto', 
//             'Goiás': 'Goiás', 
//             'Maranhão': 'Maranhão', 
//             'Mato Grosso': 'Mato Grosso', 
//             'Mato Grosso do Sul': 'Mato Grosso do Sul', 
//             'Minas Gerais': 'Minas Gerais', 
//             'Pará': 'Pará', 
//             'Paraíba': 'Paraíba', 
//             'Paraná': 'Paraná', 
//             'Pernambuco': 'Pernambuco', 
//             'Piauí': 'Piauí',
//             'Rio de Janeiro': 'Rio de Janeiro', 
//             'Rio Grande do Norte':'Rio Grande do Norte',
//             'Rio Grande do Sul': 'Rio Grande do Sul',
//             'Rondônia': 'Rondônia',
//             'Roraima': 'Roraima',
//             'Santa Catarina': 'Santa Catarina', 
//             'São Paulo': 'São Paulo',
//             'Sergipe': 'Sergipe',
//             'Tocantins': 'Tocantins',

//           }
//         },

//         { 
//           title: 'bairro', 
//           field: 'bairro',
//           cellStyle: {
//             width: '100%',
//             minWidth: 300,
//           },
//           headerStyle: {
//             width: '100%',
//             minWidth: 300,
//           },
//         },
//         { title: 'cidade', field: 'cidade'},
//         { 
//           title: 'ruaLote', 
//           field: 'ruaLote',
//           cellStyle: {
//             width: '100%',
//             minWidth: 300,
//           },
//           headerStyle: {
//             width: '100%',
//             minWidth: 300,
//           },
//         },
//         { title: 'comportamento', field: 'comportamento'},
//         { title: 'estadoCivil', field: 'estadoCivil'},
    
//       ]

//       setListaDeUsuarios(list);
//       setColumns(colunas);

//     }

//     a()

//   }, []);


//   return (
//     <div >
//       <ShowRelatorio relatorio={ listaDeUsuarios} customColumns={columns}/>
//     </div>
//   );
// }

// // customColumns={customColumns}