import Reflux from 'reflux';
import $ from 'jquery';
import BackupsActions from 'actions/BackupsActions';

let BackupsStore = Reflux.createStore({
	url: '/backups',
  backups: [],
  listenables: [BackupsActions],

  getInitialState() {
    return this.backups;
  },

  onGetList() {
  	$.ajax({
      url: this.url,
      method: 'GET'
    }).done((backups) => {
      this.backups = backups;
      this.trigger(this.backups);
      BackupsActions.getList.completed(backups);
    }).fail((error) => {
      BackupsActions.getList.failed('Error en el servidor');
    })
  },

  onCreate(data) {
  	$.ajax({
      url: this.url,
      method: 'POST',
      data: data
    }).done((backups) => {
    	BackupsActions.getList();
      BackupsActions.create.completed();
    }).fail((error) => {
      BackupsActions.create.failed('Error en el servidor');
    })
  }
});

export default BackupsStore;