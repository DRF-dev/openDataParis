import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import Axios from 'axios';

class Formulaire extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      q: '',
      status: null,
      message: null,
      data: null,
    };
  }

  async getDatas() {
    const { q } = this.state;
    try {
      const { data } = await Axios.get(`https://opendata.paris.fr/api/datasets/1.0/search/?q=${q}`);
      this.setState({ status: 'success', message: `${data.nhits} Result(s)`, data });
    } catch (err) {
      this.setState({ message: 'Error, try again' });
    }
  }

  async searchQuery(e) {
    e.preventDefault();
    await this.getDatas();
    // eslint-disable-next-line react/prop-types
    const { dispatch } = this.props;
    const {
      status,
      message,
      data,
      q,
    } = this.state;
    const action = {
      type: 'data',
      data: {
        status,
        message: q === '' ? 'Search a service' : message,
        data,
      },
    };
    this.setState({ q: '' });
    dispatch(action);
  }

  render() {
    const { q } = this.state;
    return (
      <Form className="openDataForm" onSubmit={(e) => this.searchQuery(e)}>
        <Form.Control placeholder="query" onChange={(e) => this.setState({ q: e.target.value })} value={q} />
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
  }
}

export default connect(null)(Formulaire);
