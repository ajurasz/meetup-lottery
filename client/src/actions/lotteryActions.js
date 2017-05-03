import * as types from './actionTypes';

export const addPrize = (name) => dispatch => {
    dispatch({
        type: types.ADD_PRIZE,
        prize: {
            name,
            available: true
        }
    });
};

export const removePrize = (index) => dispatch => {
    dispatch({
        type: types.REMOVE_PRIZE,
        index
    });
};

export const showModal = () => ({
    type: types.SHOW_MODAL
});

export const hideModal = () => ({
    type: types.HIDE_MODAL
});

export const removeRsvp = (rsvp) => dispatch => {
    dispatch(hideModal());
    dispatch({
        type: types.REMOVE_RSVPS,
        id: rsvp.id
    });
};

export const addWinner = (rsvp, prize) => dispatch => {
    dispatch(hideModal());
    dispatch({
        type: types.ADD_WINNER,
        rsvp,
        prize
    });
};