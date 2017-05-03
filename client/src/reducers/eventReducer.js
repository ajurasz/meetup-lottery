import * as types from '../actions/actionTypes';
import initialStete from './initialState';

export default function eventReducer(state = initialStete.event, action) {
    switch (action.type) {    
        case types.LOAD_EVENTS:
            return {
                ...state,
                typeahead: {
                    ...state.typeahead,
                    options: [
                        ...action.events
                    ]
                }                
            };
        case types.SELECT_EVENT:
            return {
                ...state,
                selected: Object.assign({}, action.event)
            };
        case types.UNSELECT_EVENT:
            return {
                ...initialStete.event,
                typeahead: {
                    ...initialStete.event.typeahead,
                    options: [
                        ...action.events
                    ]
                }
            };    
        case types.CLEAR_LOADED_EVENTS:
            return {
                ...initialStete.event,
                typeahead: {
                    ...initialStete.event.typeahead
                }
            };                     
        default:
            return state;
    }    
}