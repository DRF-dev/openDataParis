/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {
  Button,
  Card,
  Row,
  Col,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
    console.log(data.datasets);
    return (
      <div className="body">
        <h1>{message}</h1>
        <Row>
          {!(data.datasets)
            ? null
            : data.datasets.map((dataset) => (
              <Col xs={4}>
                <Card className="cards">
                  <Card.Body>
                    <Card.Title>{dataset.metas.title}</Card.Title>
                    <Card.Text>
                      <span>Modifié: </span>
                      {dataset.metas.metadata_processed}
                    </Card.Text>
                    <Card.Text>
                      <span>Publisher: </span>
                      {dataset.metas.publisher}
                    </Card.Text>
                    <Card.Text>
                      <span>Licence: </span>
                      {dataset.metas.license}
                    </Card.Text>
                    <Card.Text>
                      <span>Keywords: </span>
                      {dataset.metas.keyword.join(', ')}
                    </Card.Text>
                    <Card.Text>
                      <span>Données: </span>
                      {dataset.metas.records_count}
                    </Card.Text>
                    <Link to={`/${dataset.datasetid}`} className="text-decoration-none">
                      <Button variant="outline-light">Détails</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    );
  }
}

Body.propTypes = {
  message: propTypes.string,
  data: propTypes.object,
};

const mapStateToProps = (state) => ({
  status: state.status,
  message: state.message,
  data: state.data,
});

export default connect(mapStateToProps)(Body);
