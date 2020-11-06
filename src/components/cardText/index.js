import React from 'react';
import propTypes from 'prop-types';
import { Card } from 'react-bootstrap';

const CardText = ({ data, dataName }) => (
  <Card.Text>
    <span>{`${dataName}: `}</span>
    {data}
  </Card.Text>
);

CardText.defaultProps = {
  data: null,
  dataName: null,
};

CardText.propTypes = {
  data: propTypes.string,
  dataName: propTypes.string,
};
