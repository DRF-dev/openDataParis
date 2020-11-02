/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = null;
  }

  render() {
    const {
      message,
      data,
    } = this.props;
    return (
      <div className="body">
        <h1>{message}</h1>
        <span>{data}</span>
      </div>
    );
  }
}

Body.propTypes = {
  data: propTypes.string,
  message: propTypes.string,
};

const mapStateToProps = (state) => ({
  message: state.message,
  data: state.data,
});

export default connect(mapStateToProps)(Body);
