import React from 'react';
import Reflux from 'reflux';
import BackupsActions from '../../actions/BackupsActions';
import BackupsStore from '../../stores/BackupsStore';
import BackupsTable from './components/BackupsTable';
import FontAwesome from 'react-fontawesome';

let LogsListView = React.createClass({
  mixins: [Reflux.connect(BackupsStore, 'BackupsStore')],

  componentWillMount() {
    BackupsActions.getList();
  },
  
  render() {
    return (
      <div>
        <h3 className="page-title"><FontAwesome name="database" /> Respaldos</h3>
        <div style={styles.buttonRow}>
          <button onClick={this.handleNew} className="btn btn-primary">
            <FontAwesome name="plus" /> Nuevo Respaldo
          </button>
        </div>
        <BackupsTable backups={this.state.BackupsStore} />
      </div>
    );
  },

  handleNew() {
    BackupsActions
      .create
      .triggerPromise()
      .then(function () {
        window.toastr.success('Respaldo creado exitosamente');
      })
      .catch(function () {
        window.toastr.error('Error en el servidor');
      });
  }
});

let styles = {
  buttonRow: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '16px'
  }
};

export default LogsListView;