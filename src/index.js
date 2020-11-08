import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import 'babel-polyfill';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import Store from './store';
import Body from './components/body';
import Formulaire from './components/form';
import Details from './components/details';

const Search = () => (
  <Container fluid id="container">
    <Row>
      <Col sm={3} md={2} className="formulaire">
        <Formulaire />
      </Col>
      <Col sm={9} md={10}>
        <Body />
      </Col>
    </Row>
  </Container>
);

const App = () => (
  <Provider store={Store}>
    <Router>
      <Switch>
        <Route exact path="/" component={Search} />
        <Route path="/:id" component={Details} />
        <Redirect to="/" />
      </Switch>
    </Router>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('app'));
