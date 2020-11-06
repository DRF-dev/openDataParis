import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import Axios from 'axios';
import propTypes from 'prop-types';

class Formulaire extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      q: '',
      rows: NaN,
      nav: '',
      status: null,
      message: null,
      data: null,
    };
  }

  async getDatas() {
    const { q, rows } = this.state;
    try {
      if (q === '') throw new Error('Empty query');
      const { data } = await Axios.get(`https://opendata.paris.fr/api/datasets/1.0/search/?q=${escape(q)}&rows=${rows || 10}`);
      this.setState({ message: `${data.nhits} Result(s)`, data });
    } catch (err) {
      this.setState({ message: err.message, data: [] });
    }
  }

  async searchQuery(e) {
    e.preventDefault();
    await this.getDatas();
    const { dispatch } = this.props;
    const {
      status,
      message,
      data,
    } = this.state;
    const action = {
      type: 'data',
      data: {
        status,
        message,
        data,
      },
    };
    this.setState({ q: '', rows: NaN });
    dispatch(action);
  }

  render() {
    const { q, nav, rows } = this.state;
    if (nav === 'query') {
      return (
        <Form className="openDataForm-choice" onSubmit={(e) => this.searchQuery(e)}>
          <Form.Control placeholder="query" onChange={(e) => this.setState({ q: e.target.value })} value={q} />
          <Form.Control placeholder="Max cards (default: 10)" onChange={(e) => this.setState({ rows: Number(e.target.value) })} value={rows} type="number" />
          <Button variant="outline-dark" type="submit" className="submit">Submit</Button>
          <Button variant="outline-dark" onClick={() => this.setState({ nav: '' })}>Back</Button>
        </Form>
      );
    }
    if (nav === 'multi') {
      return (
        <Form className="openDataForm-choice" onSubmit={(e) => this.searchQuery(e)}>
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
          <Button variant="outline-dark" type="submit" className="submit">Submit</Button>
          <Button variant="outline-dark" onClick={() => this.setState({ nav: '' })}>Back</Button>
        </Form>
      );
    }
    return (
      <div className="openDataForm-choice">
        <Button variant="outline-dark" onClick={() => this.setState({ nav: 'query' })}>Search by query</Button>
        <span>or</span>
        <Button variant="outline-dark" onClick={() => this.setState({ nav: 'multi' })}>Multi-criteria search</Button>
      </div>
    );
  }
}

Formulaire.defaultProps = {
  dispatch: null,
};

Formulaire.propTypes = {
  dispatch: propTypes.func,
};

export default connect(null)(Formulaire);
