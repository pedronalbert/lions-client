import Reflux from 'reflux';
import EventsActions from '../actions/EventsActions';
import $ from 'jquery';
import _ from 'lodash';

let EventsStore = Reflux.createStore({
  url: 'http://localhost/event',
  events: [],

  listenables: [EventsActions],

  remove(id) {
     _.remove(this.events, (event) => {
      return event.id == id
    });

    this.trigger(this.events);
  },

  onCreate(data) {
    $.ajax({
      url: this.url,
      method: 'POST',
      data: data,
      xhrFields : {
        withCredentials : true
     }
    }).done((response) => {
      EventsActions.create.completed(response);
    }).fail((response) => {
      EventsActions.create.failed(response);
    })
  },

  onGetList() {
    $.ajax({
      url: this.url,
      method: 'GET',
      xhrFields : {
        withCredentials : true
     }
    }).done((events) => {
      this.events = events;
      this.trigger(this.events);
      EventsActions.getList.completed(events);
    }).fail((events) => {
      EventsActions.getList.failed(events);
    })
  },

  onDelete(id) {
    $.ajax({
      url: this.url + '/' + id,
      method: 'DELETE',
      xhrFields: {
        withCredentials: true
      }
    }).done((response) => {
      this.remove(id);
    })
  },

  onFind(id) {
    $.ajax({
      url: this.url + '/' + id,
      method: 'Get',
      xhrFields: {
        withCredentials: true
      }
    }).done((response) => {
      EventsActions.find.completed(response);
    }).fail((response) => {
      EventsActions.find.failed(response);
    })
  },

  onAddMember(id) {
    $.ajax({
      url: this.url + '/' + id + '/add_member',
      method: 'Get',
      data: {
        id: id
      },
      xhrFields: {
        withCredentials: true
      }
    }).done((response) => {
      EventsActions.addMember.completed(response);
    }).fail((response) => {
      EventsActions.addMember.failed(response);
    })
  },

  onRemoveMember(id) {
    $.ajax({
      url: this.url + '/' + id + '/remove_member',
      method: 'Get',
      data: {
        id: id
      },
      xhrFields: {
        withCredentials: true
      }
    }).done((response) => {
      EventsActions.removeMember.completed(response);
    }).fail((response) => {
      EventsActions.removeMember.failed(response);
    })
  },

});

export default EventsStore;