import React from 'react';
import { Form, Button } from 'react-bootstrap';

/* export default class Formulaire extends Component {
  render() {
    return (
      <Row>
        <Col>
          <Form>
            <h1>Hello world</h1>
          </Form>
        </Col>
      </Row>
    );
  }
  https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-
} */

const Formulaire = () => (
  <Form className="openDataForm">
    <Form.Control placeholder="query" />
    <Form.Control placeholder="lang" />
    <Form.Control placeholder="rows" />
    <Form.Control placeholder="start" />
    <Form.Control placeholder="sort" />
    <Form.Control placeholder="facet" />
    <Form.Control placeholder="refine" />
    <Form.Control placeholder="exclude" />
    <Form.Control placeholder="geofilter-distance" />
    <Form.Control placeholder="geofilter-polygon" />
    <Form.Control placeholder="timezone" />
    <Button type="submit">Submit</Button>
  </Form>
);

export default Formulaire;
