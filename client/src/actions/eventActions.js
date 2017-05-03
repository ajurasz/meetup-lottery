import * as types from './actionTypes';

export const selectEvent = (group, event) => dispatch => {    
    dispatch({
        type: types.DISABLE_GROUP
    });
    dispatch({
        type: types.SELECT_EVENT,
        event
    });  
    fetch(`/api/event-rsvps/${group.urlname}/${event.id}`)
        .then(res => res.json())
        .then(rsvps => dispatch({
            type: types.LOAD_RSVPS,
            rsvps            
        }))
        .catch(err => { throw(err) });      
};

export const unselectEvent = (events) => dispatch => {    
    dispatch({
        type: types.ENABLE_GROUP
    });
    dispatch({
        type: types.UNSELECT_EVENT,
        events
    });  
    dispatch({
        type: types.CLEAR_LOTTERY
    });          
};