/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import propTypes from 'prop-types';

class Details extends Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    this.state = {
      id: match.params.id,
    };
  }

  render() {
    const { id } = this.state;
    return <div>{id}</div>;
  }
}

Details.propTypes = {
  match: propTypes.element,
};

export default Details;
