import React from 'react';
import PropTypes from 'prop-types';

const ListItemImage = ({ winner }) => (
    <div>
        <img 
            className="img-circle-small" 
            src={ winner[0].rsvp.photo.thumb_link }
            data-toggle="tooltip" 
            data-placement="top" 
            title={ winner[0].rsvp.name }/>   
        <strong className="margin-left-5">{ winner[0].rsvp.name }</strong> wins <strong className="margin-left-5">{ winner[0].prize.name }</strong>
    </div> 
);

ListItemImage.propTypes = {
    winner: PropTypes.array.isRequired
};

export default ListItemImage;