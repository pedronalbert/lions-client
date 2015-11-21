import React from 'react';
import Moment from 'moment';
import MomentLocale from 'moment/locale/es';

let BackupsTableRow = React.createClass({
  componentWillMount() {
    Moment.locale('es');
  },

  getLogDate() {
    let date = Moment(this.props.backup.created_at);

    return date.fromNow();
  },

  render() {
    let date = this.getLogDate();

    return (
      <tr>
        <td>{this.props.backup.id}</td>
        <td>{this.props.backup.name}</td>
        <td>{date}</td>
      </tr>
    );
  }
});

export default BackupsTableRow;