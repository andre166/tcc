// import React, { useEffect, forwardRef} from 'react';
// import tableIcons from './tableIcons';
// import MaterialTable from 'material-table';
// import Button from '@material-ui/core/Button';
// import { Link} from 'react-router-dom';

// // ======= services ======= //
// import { listarUsuariosComRestricao, listarPerfisComRestricao, listarUsuariosAuthperfil, deletarUsuariosAuthperfil, editarUsuariosAuthperfil, listarPerfis} from '../../components/services/authService';
// import { listarOm } from '../../components/services/omServices';
// import { listarSubunidades } from '../../components/services/subunidadeService';

// export default function Editable() {

//     const { useState } = React;
//     const [data, setData] = useState([]);
//     const [columns, setColumns] = useState([]);

//     useEffect(() => {

//         const inicializarForm = async () => {

//           let omId = localStorage.getItem("om")
  
//           let perfilList = await listarUsuariosComRestricao( omId );
//           let omList = await listarOm( omId );
//           let perfis = await listarPerfisComRestricao();
//           let subunidadesList = await listarSubunidades( omId );

//           console.log("subunidadesList", subunidadesList)

//           let colunasPerfil = {};
//           let colunasOm = {};
//           let colunaSubunidade = {};

//           subunidadesList.map( s => {

//             Object.assign(colunaSubunidade, {[s.id_subunidade]: s.nome}) 

//           })
//           // {id_subunidade: 1, nome: "DSM", FK_id_om: 2}
//           omList.map( o => {

//             Object.assign(colunasOm, {[o.id_om]: o.nome}) 

//           })

//           perfis.map( p => {

//             Object.assign(colunasPerfil, {[p.id_authPerfils]: p.perfil}) 

//           });
          
//           let colunas = [

//             { title: 'Nome completo', field: 'userName'},
//             { title: 'Nome de usuario', field: 'usuario'},
//             { title: 'Cpf', field: 'cpf'},
//             { 
//               title: 'Subunidade', 
//               field: 'id_subunidade', 
//               lookup: colunaSubunidade
//             },

//             { 
//               title: 'Om', 
//               field: 'id_om', 
//               hidden: true
//             },
//             {
//               title: 'Perfil',
//               field: 'id_authPerfils',
//               lookup: colunasPerfil
//             },

//             { title: 'Senha', field: 'senha', emptyValue: '******', filtering: false },
//           ]

//           setData(perfilList);

//           await setColumns(colunas);
  
//         }
  
//         inicializarForm();
        
//       }, []);


    

//     const deletar = async ( id ) => {
//       await deletarUsuariosAuthperfil(id);
//       let omId = localStorage.getItem("om")
//       let perfilList = await listarUsuariosComRestricao( omId );
//       setData(perfilList);
//     }

//     const atualizar = async ( user ) => {
//       await editarUsuariosAuthperfil(user);
//       let omId = localStorage.getItem("om")
//       let perfilList = await listarUsuariosComRestricao( omId );
//       setData(perfilList);
//     }

  
//     return (
//       <>
//       {columns.lenght === 0 ? '' : 
//       <MaterialTable
//         icons={tableIcons}
//         title={
//             <Link to="/CadastrarUsuario" style={{textDecoration: 'none'}}>
//                 <Button  variant="outlined" color="primary">Cadastrar</Button>
//             </Link>
//         }
//         columns={columns}
//         data={data}
//         editable={{
//           onRowUpdate: (newData, oldData) =>
//             new Promise((resolve, reject) => {
//               setTimeout(() => {
//                 atualizar( newData )
//                 resolve();
//               }, 1000)
//             }),
//           onRowDelete: oldData =>
//           new Promise((resolve, reject) => {
//             setTimeout(() => {
//               deletar(oldData.id_auth);
//               resolve();
//             }, 1000)
//           }),
//         }}
//         options={{
//           filtering: true,
//           paging: true,
//           draggable: false,
//           headerStyle: {
//               textAlign: 'center',
//               position: 'sticky', top: 0
//           },
//       }}
//       />
//       }
//     </>
//     )
//   }