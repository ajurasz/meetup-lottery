import React from 'react';
import PropTypes from 'prop-types';

import ListItemImage from './ListItemImage';
import ListItemButton from './ListItemButton';

const ListItem = ({ index, prize, winners }) => {    
    const winner = winners.filter(item => item.prize.name == prize.name);
    return (
        <div key={ index } className="form-group">
            <div key={ index }>
                {winner.length == 0 ?
                <div className={ winner.length > 0 ? "input-group full-width inline" : "input-group full-width" }>
                    <input 
                        key={ index } 
                        value={ prize.name }
                        type="text" className="form-control" 
                        id={ "name-" + index } 
                        disabled="disabled"/>    
                    <ListItemButton index={ index } prize={ prize }/> 
                </div>
                :
                <ListItemImage winner={ winner } />}                        
            </div>                
        </div>        
    );
};

ListItem.propTypes = {
    index: PropTypes.number.isRequired,
    prize: PropTypes.object.isRequired,
    winners: PropTypes.array.isRequired
};

export default ListItem;