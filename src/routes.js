import React from 'react';
import { Switch, Route, BrowserRouter} from 'react-router-dom';

import Home from './pages/home';
import ChInfoHome from './pages/gerenciarUsuario/home';
import AdminHome from './pages/gerenciarAdmin/home';

import Efetivo from './pages/efetivo';
import CadastrarMilitar from './pages/efetivo/cadastrarMilitar';
import Login from './pages/login';
import Om from './pages/om';
import Subunidade from './pages/subunidade/index';

import GerenciarUsuario from './pages/gerenciarUsuario';
import CadastrarUsuario from './pages/gerenciarUsuario/cadastrarUsuario';
import EditarUsuario from './pages/gerenciarUsuario/editarUsuario';

import GerenciarAdmin from './pages/gerenciarAdmin';
import CadastrarAdmin from './pages/gerenciarAdmin/cadastrarAdmin';
import EditarAdmin from './pages/gerenciarAdmin/editarAdmin';

import CadastrarOm from './pages/om/components/cadastrarOm';
import EditarOm from './pages/om/components/editarOm';
import VerificarOm from './pages/om/components/verificarOm';

import CadastrarSubunidade from './pages/subunidade/components/cadastrarSubunidade';
import EditarSubunidade from './pages/subunidade/components/editarSubunidade';
import VerificarSubunidade from './pages/subunidade/components/formulario/tableCard/components/verificarSubunidade';

import CadastrarTurma from './pages/efetivo/cadastrarTurma';
import EditarTurma from './pages/efetivo/editarTurma';

import Teste from './pages/teste';

import Erro from './pages/erro';

const Routes = ( ) => {

    return (
        <Switch  style={{height: "100%"}}>

            <Route exact path='/Home' component={Home}/>
            <Route exact path='/ChInfoHome' component={ChInfoHome}/>
            <Route exact path='/AdminHome' component={AdminHome}/>

            <Route exact path='/Efetivo' component={Efetivo}/>
            <Route exact path='/' render={props => <Login {...props}/>}/>

            <Route exact path='/CadastrarMilitar' component={CadastrarMilitar}/>

            <Route exact path='/GerenciarUsuario' component={GerenciarUsuario}/>
            <Route exact path='/CadastrarUsuario' component={CadastrarUsuario}/>
            <Route exact path='/EditarUsuario/:id' component={EditarUsuario}/>

            <Route exact path='/gerenciarAdmin' component={GerenciarAdmin}/>
            <Route exact path='/CadastrarUserAdmin' component={CadastrarAdmin}/>
            <Route exact path='/EditarAdmin/:id/:idOm' component={EditarAdmin}/>
            <Route path='/EditarAdmin/:id' component={EditarAdmin}/>

            <Route path='/VerificarOm/:id' component={VerificarOm}/>
            <Route path='/CadastrarOm' component={CadastrarOm}/>
            <Route path='/EditarOm/:id' component={EditarOm}/>

            <Route path='/CadastrarSubunidade/:id' component={CadastrarSubunidade}/>
            <Route exact path='/Subunidade' component={Subunidade}/>
            <Route exact path='/Subunidade/:id' component={Subunidade}/>
            <Route path='/EditarSubunidade/:id/:idOm' component={EditarSubunidade}/>
            <Route exact path='/VerificarSubunidade/:id/:idOm' component={VerificarSubunidade}/>

            <Route exact path='/CadastrarTurma' component={CadastrarTurma}/>
            <Route exact path='/EditarTurma/:id/:idSu' component={EditarTurma}/>


            <Route exact path='/Om' component={Om}/>
            <Route exact path='/Teste' component={Teste} />
    
            <Route path="*" component={Erro}/> 

        </Switch>
          
    );
}

export default Routes;