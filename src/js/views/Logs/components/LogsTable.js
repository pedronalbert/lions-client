import React from 'react';
import {Table, Pagination} from 'react-bootstrap';
import _ from 'lodash';
import LogsTableRow from './LogsTableRow';

let LogsTable = React.createClass({

  getInitialState() {
    return {activePage: 1};
  },

  getLogs() {
    let pageIndexMax = this.state.activePage * 20;
    let pageIndexMin = pageIndexMax - 20;

    let logs = _.filter(this.props.logs, (logs, index) => {
      if(index >= pageIndexMin && index <= pageIndexMax) {
        return true;
      }
    });

    return logs;
  },

  getPaginationNumber() {
    let count = this.props.logs.length;

    if(count == 0) {
      return 1;
    } else {
      let number = count/20;

      if(number < 1) {
        return 1;
      } else {
        return parseInt(number);
      }
    }
  },

  handleSelect(event, selectedEvent){
    this.setState({
      activePage: selectedEvent.eventKey
    });
  },

  render() {
    let logs = this.getLogs();
    let paginationItems = this.getPaginationNumber();

    return (
      <div>
        <Table condensed bordered>
          <thead>
            <tr>
              <th>Información</th>
              <th>Hora</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => {
              return <LogsTableRow key={log.id} log={log} />
            })}
          </tbody>
        </Table>
        <div style={styles.paginationBox}>
          <Pagination
            items={paginationItems}
            maxButtons={10}
            next={true}
            prev={true}
            activePage={this.state.activePage}
            onSelect={this.handleSelect}
          />
        </div>
      </div>
    );
  }
});

let styles = {
  paginationBox: {
    'display': 'flex',
    'justifyContent': 'center'
  }
};

export default LogsTable;