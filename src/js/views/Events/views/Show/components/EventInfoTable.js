/*---Dependencies---*/
import React from 'react';
import Moment from 'moment';
import MomentLocale from 'moment/locale/es';

/*---Components---*/
import {Table} from 'react-bootstrap';

let EventInfoTable = React.createClass({

  componentWillMount() {
    Moment.locale('es');
  },

  render() {
    let eventDate = this.parseEventDate(this.props.event.date);

    return (
      <Table style={styles.table} bordered condensed>
        <tbody>
          <tr>
            <th style={styles.fitCol} >Titulo</th>
            <td>{this.props.event.title}</td>
          </tr>

          <tr>
            <th style={styles.fitCol}>Descripcion</th>
            <td>{this.props.event.description}</td>
          </tr>

          <tr>
            <th style={styles.fitCol} >Fecha</th>
            <td>{eventDate}</td>
          </tr>

          <tr>
            <th style={styles.fitCol} >Sector</th>
            <td>{this.props.event.sector}</td>
          </tr>

          <tr>
            <th style={styles.fitCol} >Lugar</th>
            <td>{this.props.event.location}</td>
          </tr>
        </tbody>
      </Table>
    );
  },

  parseEventDate(date) {
    let parsedDate = Moment(date).format('D MMMM YYYY hh:mm a');

    return parsedDate;
  }
});

let styles = {
  table: {
    maxWidth: '400px',
    margin: 'auto'
  },

  fitCol: {
    width: '1px'
  }
};

export default EventInfoTable;