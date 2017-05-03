import * as types from '../actions/actionTypes';
import initialStete from './initialState';

export default function groupReducer(state = initialStete.group, action) {
    switch (action.type) {    
        case types.SEARCH_GROUP:
            return {
                ...state,
                typeahead: {
                    ...state.typeahead,
                    options: action.groups
                }
            };
        case types.SELECT_GROUP:
            return {
                ...state,
                selected: action.group
            };
        case types.UNSELECT_GROUP:
            return {
                ...initialStete.group
            };            
        case types.DISABLE_GROUP:
            return {
                ...state,
                enabled: false
            };
        case types.ENABLE_GROUP:
            return {
                ...state,
                enabled: true
            };            
        default:
            return state;
    }
}