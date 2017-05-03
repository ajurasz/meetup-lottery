import { combineReducers } from 'redux';

import group from './groupReducer';
import event from './eventReducer';
import lottery from './lotteryReducer';

const rootReducer = combineReducers({
    group,
    event,
    lottery
});

export default rootReducer;