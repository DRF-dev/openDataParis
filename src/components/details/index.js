import React, { Component } from 'react';
import propTypes from 'prop-types';
import {
  Container,
  Navbar,
  Nav,
  Image,
} from 'react-bootstrap';
import Axios from 'axios';
import { Notyf } from 'notyf';
import { InformationsLine } from '../manageData';

class Details extends Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    this.state = {
      id: match.params.id,
      data: null,
    };
  }

  componentDidMount() {
    this.getDescription();
  }

  async getDescription() {
    const { id } = this.state;
    try {
      const { data } = await Axios.get(`https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records/${id}`);
      this.setState({
        data: data.record.fields,
      });
    } catch (err) {
      new Notyf().error('Id non-conforme');
    }
  }

  render() {
    const { data } = this.state;
    if (data) {
      return (
        <Container fluid id="container">
          <Navbar className="navbar" fluid>
            <Navbar.Brand>{data.title}</Navbar.Brand>
            <Nav>
              <Nav.Link href="/">Retour vers recherche</Nav.Link>
            </Nav>
          </Navbar>
          <div style={{ padding: '2%' }}>
            <Image src={data.cover_url} alt={data.cover_alt} className="image" />
            <p>{data.lead_text}</p>
            <h2>Description</h2>
            <p dangerouslySetInnerHTML={{ __html: data.description }} />
            <h2>Informations</h2>
            <ul>
              <InformationsLine dataName="Catégorie" data={data.category} />
              <InformationsLine dataName="Nom de l'établissement" data={data.address_name} />
              <InformationsLine dataName="Type d'entrée" data={data.price_type} />
              <InformationsLine dataName="Adresse" data={`${data.address_street === null ? '' : data.address_street} ${data.address_zipcode === null ? '' : data.address_zipcode} ${data.address_city === null ? '' : data.address_city}`} />
              <InformationsLine dataName="Programe" data={data.programs} />
              <InformationsLine dataName="Adapté aux personnes à mobilité réduite" data={data.pmr === 1 ? 'Oui' : 'Non'} />
              <InformationsLine dataName="Adapté aux personnes sourdes" data={data.deaf === 1 ? 'Oui' : 'Non'} />
              <InformationsLine dataName="Adapté aux personnes aveugles" data={data.blind === 1 ? 'Oui' : 'Non'} />
              <InformationsLine dataName="Mots clés" data={data.tags.join(', ')} />
            </ul>
            <h2>Dates</h2>
            <p dangerouslySetInnerHTML={{ __html: data.date_description }} />
            <h2>Détail des prix</h2>
            <p dangerouslySetInnerHTML={{ __html: data.price_detail }} />
            <h2>Contacts</h2>
            <ul>
              <InformationsLine dataName="Facebook" data={data.contact_facebook} />
              <InformationsLine dataName="Twitter" data={data.contact_twitter} />
              <InformationsLine dataName="Mail" data={data.contact_mail} />
              <InformationsLine dataName="Phone" data={data.contact_phone} />
              <InformationsLine dataName="Site web" data={data.contact_url} />
            </ul>
          </div>
        </Container>
      );
    }
    return <Container id="container">Loading...</Container>;
  }
}

Details.defaultProps = {
  match: null,
};

Details.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string,
    }),
  }),
};

export default Details;
