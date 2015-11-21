import React from 'react';
import Moment from 'moment';
import MomentLocale from 'moment/locale/es';

let LogsTableRow = React.createClass({
  componentWillMount() {
    Moment.locale('es');
  },

  getLogDate() {
    let date = Moment(this.props.log.created_at);

    return date.fromNow();
  },

  render() {
    let date = this.getLogDate();

    return (
      <tr>
        <td>{this.props.log.message}</td>
        <td>{date}</td>
      </tr>
    );
  }
});

export default LogsTableRow;