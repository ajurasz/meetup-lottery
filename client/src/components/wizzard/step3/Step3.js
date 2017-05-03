import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../actions/lotteryActions';

@connect(state => ({
    prizes: state.lottery.prizes,
    rsvps: state.lottery.rsvps
}), actions)
class Step3 extends Component {

    availablePrizesCount = () => this.props.prizes.filter(prize => prize.available).length;
    rsvpsCount = () => this.props.rsvps.length;

    handleClick = () => {
        this.props.showModal();
    };

    render() {
        return(
        <div className="row">
            <div className="text-center">
                <button 
                type="button" 
                className="btn btn-primary btn-circle btn-xl"
                    data-toggle="tooltip" 
                    data-placement="right" 
                    title="Draw :)"
                    onClick={ this.handleClick }
                    disabled={ this.availablePrizesCount() > 0 && this.rsvpsCount() > 0 ? "" : "disabled" }>
                    { this.availablePrizesCount() }
                </button>              
            </div>
        </div> 
        );
    };
}

export default Step3;