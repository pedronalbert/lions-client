import Reflux from 'reflux';
import LogsActions from 'actions/LogsActions';
import $ from 'jquery';
import _ from 'lodash';

let LogsStore = Reflux.createStore({
  url: '/logs',
  logs: [],

  listenables: [LogsActions],

  onGetList() {
    $.ajax({
      url: this.url,
      method: 'GET'
    }).done((logs) => {
      this.logs = logs;
      this.trigger(this.logs);
      LogsActions.getList.completed(logs);
    }).fail((err) => {
      LogsActions.getList.failed(err);
    })
  }
});

export default LogsStore;
