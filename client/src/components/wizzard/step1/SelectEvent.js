import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typeahead } from 'react-bootstrap-typeahead';

import * as actions from '../../../actions/eventActions';

@connect(state => ({
    typeahead: state.event.typeahead,
    group: state.group.selected
}), actions)
class SelectEvent extends Component {

    handleChange = (selectedItems) => {
        if (selectedItems.length == 0) {
            this.props.unselectEvent(this.props.typeahead.options);
        } else {
            this.props.selectEvent(this.props.group, selectedItems[0]);
        }
    };

    render() {
        const renderItem = (option, props, index) => (
            <div>
                <div className="row wrap-name">
                    { option.name }
                </div>
                <div className="row">
                    <strong>{ option.date }</strong>
                </div> 
            </div>
        );        
        
        return (
            <div className="form-group">
                <label htmlFor="event" className="col-sm-2 control-label">Event</label>
                <div className="col-sm-9">
                    <Typeahead
                        { ...this.props.typeahead }
                        clearButton={ true }
                        onChange={ this.handleChange }                
                        renderMenuItemChildren={ renderItem }   
                        placeholder="Select event"
                    />              
                </div>
            </div>                 
        );
    }

}

export default SelectEvent;