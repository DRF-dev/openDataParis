// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Provider } from 'react-redux';

import 'babel-polyfill';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import Store from './store';
import Body from './components/body';
import Formulaire from './components/form';

const App = () => (
  <Provider store={Store}>
    <Container fluid id="container">
      <Row>
        <Col xs={3} sm={3} className="formulaire">
          <Formulaire />
        </Col>
        <Col xs={9} sm={9}>
          <Body />
        </Col>
      </Row>
    </Container>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('app'));
