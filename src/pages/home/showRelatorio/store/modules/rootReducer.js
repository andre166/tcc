import { combineReducers } from 'redux';

import relatorioTableReducer from './relatorioTableReducer/reducer';
import pieGraphReducer from './pieGraphRelatorioReducer/reducer';

export default combineReducers({
    relatorioTable: relatorioTableReducer,
    pieGraph: pieGraphReducer,
})