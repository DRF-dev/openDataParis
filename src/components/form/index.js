import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import Axios from 'axios';
import propTypes from 'prop-types';
import { Notyf } from 'notyf';

class Formulaire extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nav: '',
      rows: undefined,
      // Search by query
      q: '',
      // Search multi-criteria
      /*
        sort: champ ou -champ
        Facet: [
          category,
          tags,
          address_name,
          address_zipcode,
          address_city,
          pmr,
          blind,
          deaf,
          access_type,
          price_type
        ]
      */
      // Response
      message: undefined,
      data: undefined,
    };
  }

  async getDatas() {
    const {
      nav,
      q,
      rows,
    } = this.state;
    if (nav === 'query') {
      try {
        if (q === '') throw new Error('Empty query');
        const { data } = await Axios.get(`https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&facet=category&facet=tags&facet=address_name&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=access_type&facet=price_type&q=${q}&rows=${rows || 30}`);
        this.setState({ message: `${data.nhits} Resultat${data.nhits > 1 ? 's' : ''}`, data });
        new Notyf().success('Requete effectué avec succès');
      } catch (err) {
        this.setState({ message: err.message, data: [] });
        new Notyf().success('Echec de la requete');
      }
    }/*
    if (nav === 'multi') {
      // TODO: Search multi-criteria
      const { data } = await Axios.get('https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&facet=category&facet=tags&facet=address_name&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=access_type&facet=price_type');
    } */
  }

  async searchQuery(e) {
    e.preventDefault();
    await this.getDatas();
    const { dispatch } = this.props;
    const {
      message,
      data,
    } = this.state;
    const action = {
      type: 'data',
      data: {
        message,
        data,
      },
    };
    this.setState({ q: '', rows: undefined });
    dispatch(action);
  }

  render() {
    const { q, nav, rows } = this.state;
    if (nav === 'query') {
      return (
        <Form className="openDataForm-choice" onSubmit={(e) => this.searchQuery(e)}>
          <Form.Control placeholder="query" onChange={(e) => this.setState({ q: e.target.value })} value={q} />
          <Form.Control placeholder="Max cards (default: 30)" onChange={(e) => this.setState({ rows: Number(e.target.value) })} value={rows} type="number" />
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
        <Button variant="outline-dark" onClick={() => this.setState({ nav: 'query' })}>Recherche par query</Button>
        <span>ou</span>
        <Button variant="outline-dark" onClick={() => this.setState({ nav: 'multi' })}>Recherche multi-critère</Button>
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
