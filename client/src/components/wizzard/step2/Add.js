import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../actions/lotteryActions';

@connect(null, actions)
class Add extends Component {

    state = { disabled: true };

    handleClick = () => {
        this.props.addPrize(this.refs.name.value);
        this.refs.name.value = "";
        this.setState({ disabled: true });
    };

    onChange = (e) => {
        if (this.refs.name && this.refs.name.value.length > 0) {
            this.setState({ disabled: false });
        } else {
            this.setState({ disabled: true });
        }
    };

    render() {
        return(
            <div className="form-group">
                <div className="input-group full-width">
                    <label className="sr-only" htmlFor="prize-name">Prize name</label>
                    <input 
                        id="prize-name"
                        type="text" 
                        className="form-control"  
                        placeholder="Add prize ..." 
                        ref="name"
                        onChange={ this.onChange }/>                    
                    <span className="input-group-btn one-percent-width">
                        <button 
                            type="button" 
                            className="btn btn-success" 
                            disabled={ this.state.disabled ? "disabled" : "" }
                            onClick={ this.handleClick }>Add</button>                        
                    </span>
                </div>   
            </div>              
        );
    }
}

export default Add;