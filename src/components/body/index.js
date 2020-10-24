import Axios from 'axios';
import React, { Component } from 'react';

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      q: '',
      status: null,
      message: 'Search a service',
      data: {
        nhits: 0,
        datasets: [
          {
            datasetid: '',
            metas: {
              publisher: '',
            },
          },
        ],
      },
    };
  }

  async getDatas(e) {
    const { q } = this.state;
    e.preventDefault();
    try {
      const { data } = await Axios.get(`https://opendata.paris.fr/api/datasets/1.0/search/?q=${q}`);
      this.setState({ status: 'success', message: 'Results :', data });
    } catch (err) {
      this.setState({ message: 'Error' });
    }
  }

  render() {
    const {
      status,
      message,
      data,
      q,
    } = this.state;
    return (
      <div>
        <form onSubmit={(e) => this.getDatas(e)}>
          <input type="text" placeholder="Enter here the thematique of your search" onChange={(e) => this.setState({ q: e.target.value })} value={q} />
          <button type="submit">Submit</button>
        </form>
        <h1>{message}</h1>
        <ul>
          {status
            ? <li>{`${data.nhits} publisher(s) :`}</li>
            : null}
          {status
            ? (
              <ul>
                {data.datasets.map((informations) => (
                  <li>{informations.metas.publisher}</li>
                ))}
              </ul>
            )
            : null}
        </ul>
      </div>
    );
  }
}
