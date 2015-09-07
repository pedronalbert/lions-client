import Reflux from 'reflux';
import EventsActions from '../actions/EventsActions';
import $ from 'jquery';
import _ from 'lodash';
import ResourcesActions from '../actions/ResourcesActions';
import UsersActions from '../actions/UsersActions';

let EventsStore = Reflux.createStore({
  url: '/event',
  events: [],

  listenables: [EventsActions],

  find(id) {
    let event = _.find(this.events, (event) => {
      return event.id == id;
    });

    return event;
  },

  removeLocalEvent(id) {
     _.remove(this.events, (event) => {
      return event.id == id
    });

    this.trigger(this.events);
  },

  addLocalEvent(event) {
    this.events.push(event);

    this.trigger(this.events);
  },

  updateLocalEvent(id, newData) {
    let index =_.findIndex(this.events, (event) => {
      return event.id == id;
    });

    if (index >= 0) {  
      this.events[index] = newData;
      this.trigger(this.events);
    }

  },

  addLocalMember(eventId, member) {
    let index = _.findIndex(this.events, (event) => {
      return event.id == eventId;
    });

    this.events[index].members.push(member);

    this.trigger(this.events);
  },

  removeLocalMember(eventId, memberId) {
    let eventIndex = _.findIndex(this.events, (event) => {
      return event.id == eventId;
    });

    _.remove(this.events[eventIndex].members, (member) => {
      return member.id == memberId;
    }); 

    this.trigger(this.events);
  },

  addLocalResource(eventId, resource) {
    let eventIndex = _.findIndex(this.events, (event) => {
      return event.id == eventId;
    });

    let resourceIndex = _.findIndex(this.events[eventIndex].resources, (localResource) => {
      return localResource.id == resource.id;
    });

    if (resourceIndex < 0) {
      this.events[eventIndex].resources.push(resource);
    } else {
      this.events[eventIndex].resources[resourceIndex] = resource;
    }

    ResourcesActions
      .getList
      .triggerPromise(true)
      .then((resources) => {
        this.trigger(this.events);
      })
  },

  removeLocalResource(eventId, resourceId) {
    let eventIndex = _.findIndex(this.events, (event) => {
      return event.id == eventId;
    });

    _.remove(this.events[eventIndex].resources, (resource) => {
      return resource.resource_id == resourceId;
    });

    ResourcesActions
      .getList
      .triggerPromise(true)
      .then((resources) => {
        this.trigger(this.events);
      })
  },

  finishLocalEvent(eventId) {
    let eventIndex = _.findIndex(this.events, (event) => {
      return event.id == eventId;
    });

    if(eventIndex >= 0) {
      this.events[eventIndex].active = 0;
    }
  },

  onGetList(force = false) {
    if (_.isEmpty(this.events) || force) {
      $.ajax({
        url: this.url,
        method: 'GET'
      }).done((events) => {
        this.events = events;
        this.trigger(this.events);
        EventsActions.getList.completed(events);
      }).fail((error) => {
        if(error.status == 401) {
          UsersActions.logout();
          EventsActions.getList.failed('Su session ha finalizado');
        } else if(error.status == 400) {
          EventsActions.getList.failed(error.responseJSON.message);
        } else {
          EventsActions.getList.failed('Error en el servidor');
        }
      })
    } else {
      this.trigger(this.events);
      EventsActions.getList.completed(this.events);
    }
  },

  onCreate(data) {
    $.ajax({
      url: this.url,
      method: 'POST',
      data: data
    }).done((event) => {
      this.addLocalEvent(event);
      EventsActions.create.completed(event);
    }).fail((error) => {
      if(error.status == 401) {
        UsersActions.logout();
        EventsActions.create.failed('Su session ha finalizado');
      } else if(error.status == 400) {
        EventsActions.create.failed(error.responseJSON.message);
      } else {
        EventsActions.create.failed('Error en el servidor');
      }
    })
  },

  onFind(id) {
    let event = this.find(id);

    if (_.isEmpty(event)) {
      EventsActions
        .getList
        .triggerPromise()
        .then((events) => {
          event = this.find(id);

          if(_.isEmpty(event)) {
            EventsActions.find.failed('Evento no encontrado');
          } else {
            EventsActions.find.completed(event);
          }
        })
        .catch((error) => {
          EventsActions.find.failed(err);
        })
    } else {
      EventsActions.find.completed(event);
    }
    
  },

  onUpdate(id, data) {
    $.ajax({
      url: this.url + '/' + id,
      method: 'PUT',
      data: data
    }).done((event) => {
      this.updateLocalEvent(id, event);
      EventsActions.update.completed(event);
    }).fail((error) => {
      if(error.status == 401) {
        UsersActions.logout();
        EventsActions.update.failed('Su session ha finalizado');
      } else if(error.status == 400) {
        EventsActions.update.failed(error.responseJSON.message);
      } else {
        EventsActions.update.failed('Error en el servidor');
      }
    });
  },

  onDelete(id) {
    $.ajax({
      url: this.url + '/' + id,
      method: 'DELETE'
    }).done((response) => {
      this.removeLocalEvent(id);
    }).fail((error) => {
      if(error.status == 401) {
        UsersActions.logout();
        EventsActions.update.failed('Su session ha finalizado');
      } else if(error.status == 400) {
        EventsActions.update.failed(error.responseJSON.message);
      } else {
        EventsActions.update.failed('Error en el servidor');
      }
    });
  },

  onAddMember(eventId, memberId) {
    $.ajax({
      url: this.url + '/' + eventId + '/add_member',
      method: 'POST',
      data: {
        member_id: memberId
      }
    }).done((member) => {
      this.addLocalMember(eventId, member);
      EventsActions.addMember.completed();
    }).fail((error) => {
      if(error.status == 401) {
        UsersActions.logout();
        EventsActions.addMember.failed('Su session ha finalizado');
      } else if(error.status == 400) {
        EventsActions.addMember.failed(error.responseJSON.message);
      } else {
        EventsActions.addMember.failed('Error en el servidor');
      }
    });
  },

  onRemoveMember(eventId, memberId) {
    $.ajax({
      url: this.url + '/' + eventId + '/remove_member',
      method: 'POST',
      data: {
        member_id: memberId
      },
      xhrFields: {
        withCredentials: true
      }
    }).done((response) => {
      this.removeLocalMember(eventId, memberId);
      EventsActions.removeMember.completed();
    }).fail((error) => {
      if(error.status == 401) {
        UsersActions.logout();
        EventsActions.removeMember.failed('Su session ha finalizado');
      } else if(error.status == 400) {
        EventsActions.removeMember.failed(error.responseJSON.message);
      } else {
        EventsActions.removeMember.failed('Error en el servidor');
      }
    });
  },

  onAddResource(eventId, resourceId, amount) {
    $.ajax({
      url: this.url + '/' + eventId + '/add_resource',
      method: 'POST',
      data: {
        resource_id: resourceId,
        event_id: eventId,
        amount: amount
      }
    }).done((resource) => {
      this.addLocalResource(eventId, resource);
      EventsActions.addResource.completed();
    }).fail((error) => {
      if(error.status == 401) {
        UsersActions.logout();
        EventsActions.addResource.failed('Su session ha finalizado');
      } else if(error.status == 400) {
        EventsActions.addResource.failed(error.responseJSON.message);
      } else {
        EventsActions.addResource.failed('Error en el servidor');
      }
    });
  },

  onRemoveResource(eventId, resourceId) {
    $.ajax({
      url: this.url + '/' + eventId + '/remove_resource',
      method: 'POST',
      data: {
        resource_id: resourceId
      }
    }).done((resource) => {
      this.removeLocalResource(eventId, resourceId);
    }).fail((error) => {
      if(error.status == 401) {
        UsersActions.logout();
        EventsActions.removeResource.failed('Su session ha finalizado');
      } else if(error.status == 400) {
        EventsActions.removeResource.failed(error.responseJSON.message);
      } else {
        EventsActions.removeResource.failed('Error en el servidor');
      }
    });
  },

  onFinishEvent(eventId) {
    $.ajax({
      url: this.url + '/' + eventId + '/finish_event',
      method: 'POST',
      data: {
        event_id: eventId
      }
    }).done((resource) => {
      this.finishLocalEvent(eventId);
      EventsActions.finishEvent.completed(true);
    }).fail((error) => {
      if(error.status == 401) {
        UsersActions.logout();
        EventsActions.finishEvent.failed('Su session ha finalizado');
      } else if(error.status == 400) {
        EventsActions.finishEvent.failed(error.responseJSON.message);
      } else {
        EventsActions.finishEvent.failed('Error en el servidor');
      }
    });
  }

});

export default EventsStore;