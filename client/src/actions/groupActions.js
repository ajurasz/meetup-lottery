import * as types from './actionTypes';

export const searchGroup = (query) => dispatch => {       
    fetch(`/api/find-group/${query}`)
        .then(res => res.json())
        .then(groups => dispatch({
            type: types.SEARCH_GROUP,
            groups            
        }))
        .catch(err => { throw(err) });
};

export const selectGroup = (group) => dispatch => {
    dispatch({
        type: types.SELECT_GROUP,
        group        
    });
    fetch(`/api/group-events/${group.urlname}`)
        .then(res => res.json())
        .then(events => dispatch({
            type: types.LOAD_EVENTS,
            events            
        }))
        .catch(err => { throw(err) });
};

export const unselectGroup = () => dispatch => {
    dispatch({
        type: types.UNSELECT_GROUP
    });
    dispatch({
        type: types.CLEAR_LOADED_EVENTS
    });    
};