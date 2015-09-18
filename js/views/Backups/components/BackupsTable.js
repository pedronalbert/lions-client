import React from 'react';
import {Table, Pagination} from 'react-bootstrap';
import _ from 'lodash';
import BackupsTableRow from './BackupsTableRow';

let BackupsTable = React.createClass({

  getInitialState() {
    return {activePage: 1};
  },

  getBackups() {
    let pageIndexMax = this.state.activePage * 20;
    let pageIndexMin = pageIndexMax - 20;

    let backups = _.filter(this.props.backups, (backups, index) => {
      if(index >= pageIndexMin && index <= pageIndexMax) {
        return true;
      }
    });

    return backups;
  },

  getPaginationNumber() {
    let count = this.props.backups.length;

    if(count == 0) {
      return 1;
    } else {
      let number = count/20;

      if(number < 1) {
        return 1;
      } else {
        return parseInt(number)+1;
      }
    }
  },

  handleSelect(event, selectedEvent){
    this.setState({
      activePage: selectedEvent.eventKey
    });
  },

  render() {
    let backups = this.getBackups();
    let paginationItems = this.getPaginationNumber();

    return (
      <div>
        <Table style={styles.base} condensed bordered>
          <thead>
            <tr>
              <th>Id</th>
              <th>Archivo</th>
              <th>Hora</th>
            </tr>
          </thead>
          <tbody>
            {backups.map((backup) => {
              return <BackupsTableRow key={backup.id} backup={backup} />
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
  },

  base: {
    width: '500px',
    margin: 'auto'
  }
};

export default BackupsTable;