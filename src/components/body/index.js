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
import CardText from '../cardText';

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
    if (data.datasets) {
      return (
        <div className="body">
          <h1>{message}</h1>
          <Row>
            {data.datasets.map(({ datasetid, metas }) => (
              <Col xs={4}>
                <Card className="cards">
                  <Card.Body>
                    <Card.Title>{metas.title}</Card.Title>
                    <CardText data={metas.metadata_processed} dataName="Modifié le" />
                    <CardText data={metas.publisher} dataName="Publisher" />
                    <CardText data={metas.license} dataName="Licence" />
                    <CardText data={metas.keyword.join(', ')} dataName="Keywords" />
                    <CardText data={metas.records_count} dataName="Données" />
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
    return (
      <div className="body">
        <h1>Bienvenue dans l&apos;annuaire des évènements de Paris !</h1>
        <p>Choisissez une recherche par élément ou par critères.</p>
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
