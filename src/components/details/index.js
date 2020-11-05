/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import {
  Container,
  Navbar,
  Nav,
  Row,
} from 'react-bootstrap';
import Axios from 'axios';

class Details extends Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    this.state = {
      id: match.params.id,
      description: '<div>a<div>',
    };
  }

  componentDidMount() {
    this.getDetails();
  }

  async getDetails() {
    const { id } = this.state;
    try {
      const { data } = await Axios.get(`https://opendata.paris.fr/api/datasets/1.0/${id}`);
      this.setState({ description: data.metas.description });
    } catch (err) {
      this.setState({ description: '<div>a<div>' });
    }
  }

  render() {
    const { id, description } = this.state;
    return (
      <Container fluid id="container">
        <Navbar className="navbar" fluid>
          <Navbar.Brand>{`Détails of ${id}`}</Navbar.Brand>
          <Nav>
            <Nav.Link href="/">Retour vers recherche</Nav.Link>
          </Nav>
        </Navbar>
        <Row style={{ padding: '2%' }}>
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </Row>
      </Container>
    );
  }
}

Details.propTypes = {
  match: propTypes.object,
};

export default Details;
