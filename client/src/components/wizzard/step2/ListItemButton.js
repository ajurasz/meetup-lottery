import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../../../actions/lotteryActions';

@connect(null, actions)
class ListItemButton extends Component {

    handleClick = (index) => {
        this.props.removePrize(index);
    };
    
    render() {
        return(
            <span className="input-group-btn one-percent-width">
                <button 
                    key={ this.props.index } 
                    type="button" 
                    className="btn btn-danger"
                    disabled={ this.props.prize.available ? "" : "disabled" } 
                    onClick={ this.handleClick.bind(this, this.props.index) }>Remove</button>                        
            </span> 
        );
    }   
}

ListItemButton.propTypes = {
    index: PropTypes.number.isRequired,
    prize: PropTypes.object.isRequired
};

export default ListItemButton;