import React, { Component } from 'react';
import { connect } from 'react-redux';

import Step1 from './step1/Step1';
import Step2 from './step2/Step2';
import Step3 from './step3/Step3';
import WinnerModal from './WinnerModal';

import * as actions from '../../actions/lotteryActions';

@connect(state => ({
    event: state.event.selected,
    show: state.lottery.modalIsOpen,
    rsvps: state.lottery.rsvps,
    prizes: state.lottery.prizes    
}), actions)
class Wizzard extends Component {
    render() {
        return(
            <div>
                <Step1 />
                {this.props.event &&
                <div>
                    <Step2 />
                    <Step3 />                    
                </div>}
                <WinnerModal
                    show={ this.props.show } 
                    rsvps={ this.props.rsvps }
                    prizes={ this.props.prizes }
                    hideModal={ this.props.hideModal }
                    handleAccept={ this.props.addWinner }
                    handleReject={ this.props.removeRsvp } />
            </div>
        );
    }
}

export default Wizzard;