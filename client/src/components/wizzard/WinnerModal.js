import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap-modal';

const WinnerModal = ({ show, rsvps, prizes, hideModal, handleAccept, handleReject }) => {

    const randomRsvp = () => {
        console.log(rsvps.length);
        const randomIndex = Math.floor(Math.random() * rsvps.length);
        let rsvp = rsvps[randomIndex];        
        return rsvp;
    };

    const randomPrize = () => {
        const randomIndex = Math.floor(Math.random() * prizes.length);
        let prize = prizes[randomIndex];
        if (prize && prize.available == false) {
            return randomPrize();
        }   
        return prize;
    };      

    if (show) {
        let prize = randomPrize();
        let rsvp = randomRsvp();

        return(
        <Modal
            show={ show }
            onHide={ hideModal }
            aria-labelledby="ModalHeader">
            <Modal.Header closeButton>
            <Modal.Title id='ModalHeader'>And the winner is ...</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="text-center">
                <p><img className="img-circle" src={ rsvp.photo.photo_link }/></p>
                <p>{ rsvp.name }</p>
                <p><strong>{ prize.name }</strong></p>
                </div>
            </Modal.Body>
            <Modal.Footer>
            <button className='btn btn-danger' onClick={ handleReject.bind(this, rsvp) }>Reject</button>
            <button className='btn btn-primary' onClick={ handleAccept.bind(this, rsvp, prize) }>Accept</button>
            </Modal.Footer>
        </Modal>               
        );
    } else {
        return null;
    }
};

WinnerModal.propTypes = {
    show: PropTypes.bool.isRequired,
    rsvps: PropTypes.array.isRequired,
    prizes: PropTypes.array.isRequired,
    hideModal: PropTypes.func.isRequired,
    handleAccept: PropTypes.func.isRequired,
    handleReject: PropTypes.func.isRequired
};

export default WinnerModal;