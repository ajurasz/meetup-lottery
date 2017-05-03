import * as types from '../actions/actionTypes';
import initialStete from './initialState';

export default function lotteryReducer(state = initialStete.lottery, action) {
    switch (action.type) {
        case types.LOAD_RSVPS:
            return {
                ...state,
                rsvps: action.rsvps
            };
        case types.CLEAR_LOTTERY:
            return {
                ...initialStete.lottery
            };
        case types.ADD_PRIZE:
            return {
                ...state,
                prizes: [
                    ...state.prizes,
                    Object.assign({}, action.prize)
                ]
            };
        case types.REMOVE_PRIZE:
            return {
                ...state,
                prizes: [
                    ...state.prizes.filter((item, index) => index != action.index)
                ]
            };          
        case types.SHOW_MODAL:
            return {
                ...state,
                modalIsOpen: true
            };
        case types.HIDE_MODAL:
            return {
                ...state,
                modalIsOpen: false
            };     
        case types.REMOVE_RSVPS:
            return {
                ...state,
                rsvps: [
                    ...state.rsvps.filter(item => item.id != action.id)
                ]
            };
        case types.ADD_WINNER:
            let tmpPrize = state.prizes.filter(item => item.name == action.prize.name)[0]
            let updatedPrize = Object.assign({}, tmpPrize);
            updatedPrize.available = false;
            
            return {
                ...state,
                rsvps: [
                    ...state.rsvps.filter(item => item.id != action.rsvp.id)
                ],
                prizes: [
                    ...state.prizes.filter(item => item.name != action.prize.name),
                    updatedPrize
                ],
                winners: [
                    ...state.winners,
                    Object.assign({}, {
                        rsvp: action.rsvp,
                        prize: action.prize
                    })
                ]
            };                                   
        default:
            return state;
    }
}