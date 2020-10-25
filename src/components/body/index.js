import Axios from 'axios';
import React, { Component } from 'react';

export default class Body extends Component {
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
              license: '',
              records_count: '',
              keyword: [],
              description: '',
            },
            title: '',
          },
        ],
      },
    };
  }

  async getDatas(e) {
    e.preventDefault();
    const { q } = this.state;
    try {
      const { data } = await Axios.get(`https://opendata.paris.fr/api/datasets/1.0/search/?q=${q}`);
      this.setState({ status: 'success', message: 'Results :', data });
    } catch (err) {
      this.setState({ message: 'Error, try again' });
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
        {status
          ? (
            <ul>
              <li>{`${data.nhits} publisher(s) :`}</li>
              {data.datasets.map((informations) => (
                <ul>
                  <li>{informations.datasetid}</li>
                  <ul>
                    <p dangerouslySetInnerHTML={{ __html: informations.metas.description }} />
                    <li>{informations.metas.publisher}</li>
                    <li>{informations.metas.license}</li>
                    <ul>
                      {informations.metas.keyword.map((keyword) => <li>{keyword}</li>)}
                    </ul>
                    <li>{informations.metas.records_count}</li>
                  </ul>
                </ul>
              ))}
            </ul>
          )
          : null}
      </div>
    );
  }
}
