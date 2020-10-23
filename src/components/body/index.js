import Axios from 'axios';
import React, { Component } from 'react';

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'Loading...',
      data: undefined,
      keys: [],
    };
  }

  componentDidMount() {
    this.getDatas();
  }

  async getDatas() {
    try {
      const { data } = await Axios.get('https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&q=&facet=category&facet=tags&facet=address_name&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=access_type&facet=price_type');
      const keys = Object.keys(data);
      this.setState({ status: 'success', data, keys });
    } catch (err) {
      this.setState({ data: 'no-data' });
    }
  }

  render() {
    const { status, data, keys } = this.state;
    return (
      <div>
        <h1>{status}</h1>
        <ul>
          {keys.map(() => (
            <li>{data[keys[0]]}</li>
          ))}
        </ul>
      </div>
    );
  }
}
