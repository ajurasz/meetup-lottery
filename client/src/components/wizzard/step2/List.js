import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../../../actions/lotteryActions';

import ListItem from './ListItem';

const List = ({ prizes, winners }) => (
    <div>{prizes.map((prize, index) => <ListItem key={ index } index={ index } prize={ prize } winners={ winners }/>)}</div>
);

List.propTypes = {
    prizes: PropTypes.array.isRequired,
    winners: PropTypes.array.isRequired
};

export default List;