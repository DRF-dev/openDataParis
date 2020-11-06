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
    return (
      <div className="body">
        <h1>{message}</h1>
        <Row>
          {!(data.datasets)
            ? null
            : data.datasets.map(({ datasetid, metas }) => (
              <Col xs={4}>
                <Card className="cards">
                  <Card.Body>
                    <Card.Title>{metas.title}</Card.Title>
                    <Card.Text>
                      <span>Modifié: </span>
                      {metas.metadata_processed}
                    </Card.Text>
                    <Card.Text>
                      <span>Publisher: </span>
                      {metas.publisher}
                    </Card.Text>
                    <Card.Text>
                      <span>Licence: </span>
                      {metas.license}
                    </Card.Text>
                    <Card.Text>
                      <span>Keywords: </span>
                      {metas.keyword.join(', ')}
                    </Card.Text>
                    <Card.Text>
                      <span>Données: </span>
                      {metas.records_count}
                    </Card.Text>
                    <Link to={`/${datasetid}`} className="text-decoration-none">
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

Body.defaultProps = {
  message: null,
  data: null,
};

Body.propTypes = {
  message: propTypes.string,
  data: propTypes.shape({
    datasets: propTypes.arrayOf(propTypes.shape({
      datasetid: propTypes.string,
      metas: propTypes.shape({
        title: propTypes.string,
        metadata_processed: propTypes.string,
        publisher: propTypes.string,
        license: propTypes.string,
        keyword: propTypes.arrayOf(propTypes.string),
        records_count: propTypes.number,
      }),
    })),
  }),
};

const mapStateToProps = (state) => ({
  status: state.status,
  message: state.message,
  data: state.data,
});

export default connect(mapStateToProps)(Body);
