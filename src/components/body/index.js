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
      <div className="body">
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
                  <li>{`Responsable: ${informations.datasetid}`}</li>
                  <ul>
                    {/* <li>
                      <span>Description :</span>
                      <div dangerouslySetInnerHTML={{ __html: informations.metas.description }} />
                    </li> */}
                    <li>{`Publisher: ${informations.metas.publisher}`}</li>
                    <li>{`Licences ${informations.metas.license}`}</li>
                    <li>Mots clé(s)</li>
                    <ul>
                      {informations.metas.keyword.map((keyword) => <li>{keyword}</li>)}
                    </ul>
                    <li>{`Record count :${informations.metas.records_count}`}</li>
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
