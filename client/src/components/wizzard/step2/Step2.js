import React, { Component } from 'react';
import { connect } from 'react-redux';

import Add from './Add';
import List from './List';

@connect(state => ({
    prizes: state.lottery.prizes,
    winners: state.lottery.winners
}), null)
class Step2 extends Component {

    render() {
        return(
            <div className="row">
                <div className="col-lg-8 col-lg-offset-2">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <form className="form-group" role="form">
                                <Add />
                                { this.props.prizes.length > 0 && <hr /> }
                                <List prizes={ this.props.prizes} winners={ this.props.winners }/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>             
        );
    }    
}

export default Step2;