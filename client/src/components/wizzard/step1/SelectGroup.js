import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncContainer, Typeahead } from 'react-bootstrap-typeahead';

import * as actions from '../../../actions/groupActions';
import defaultGroupImage from '../../../../dist/assets/img/group-image.png';

const AsyncTypeahead = asyncContainer(Typeahead);

@connect(state => ({
    typeahead: state.group.typeahead,
    enabled: state.group.enabled
}), actions)
class SelectGroup extends Component {

    handleSearch = (query) => {
        this.props.searchGroup(query);
    };

    handleChange = (selectedItems) => {
        if (selectedItems.length == 0) {            
            this.props.unselectGroup();        
        } else {
            this.props.selectGroup(selectedItems[0]);
        }
    };

    render() {

        const renderItem = (option, props, index) => (
            <div className="row">
                <div className="col-xs-2 group-image">
                    <img 
                    src={ option.photo.thumb_link || defaultGroupImage } 
                    className="responsive-image"/>          
                </div>
                <div className="col-xs-10">
                    <div className="wrap-name">
                    { option.name }
                    </div>
                    <div>
                    <strong>{ option.city }</strong>
                    </div>          
                </div>
            </div>
        );        
        
        return (
            <div className="form-group">
                <label htmlFor="group" className="col-sm-2 control-label">Group</label>
                <div className="col-sm-9">
                    <AsyncTypeahead
                        { ...this.props.typeahead }
                        clearButton={ this.props.enabled }
                        disabled={ !this.props.enabled }
                        onSearch={ this.handleSearch }
                        onChange={ this.handleChange }                
                        renderMenuItemChildren={ renderItem }   
                        placeholder="Find group"                                     
                    />                  
                </div>
            </div>               
        );
    }

}

export default SelectGroup;