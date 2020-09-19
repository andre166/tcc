import { combineReducers } from 'redux';

import relatorioTableReducer from './relatorioTableReducer/reducer';
import pieGraphReducer from './pieGraphRelatorioReducer/reducer';
import navbarReducer from './navbarReducer/reducer';
import userReducer from './userReducer/reducer';

export default combineReducers({
    relatorioTable: relatorioTableReducer,
    pieGraph: pieGraphReducer,
    navbarState: navbarReducer,
    userState: userReducer,
})