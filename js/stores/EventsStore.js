import Reflux from 'reflux';
import EventsActions from '../actions/EventsActions';
import $ from 'jquery';
import _ from 'lodash';
import ResourcesActions from '../actions/ResourcesActions';

let EventsStore = Reflux.createStore({
  url: 'http://server.lions.com/event',
  events: [],

  listenables: [EventsActions],

  init() {
    this.onGetList();
  },

  find(id) {
    let event = _.find(this.events, (event) => {
      return event.id == id;
    });

    return event;
  },

  remove(id) {
     _.remove(this.events, (event) => {
      return event.id == id
    });

    this.trigger(this.events);
  },

  add(event) {
    this.events.push(event);

    this.trigger(this.events);
  },

  update(id, data) {
    let index =_.findIndex(this.events, (event) => {
      return event.id == id;
    });

    this.events[index] = data;

    this.trigger(this.events);
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

  onGetList() {
    if (_.isEmpty(this.events)) {
      $.ajax({
        url: this.url,
        method: 'GET',
      }).done((events) => {
        this.events = events;
        this.trigger(this.events);
        EventsActions.getList.completed(events);
      }).fail((err) => {
        EventsActions.getList.failed(err);
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
      data: data,
      xhrFields : {
        withCredentials : true
     }
    }).done((event) => {
      this.add(event);
      EventsActions.create.completed(event);
    }).fail((response) => {
      EventsActions.create.failed(response.message);
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
        .catch((err) => {
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
      data: data,
      xhrFields : {
        withCredentials : true
     }
    }).done((event) => {
      this.update(id, event);
      EventsActions.update.completed(event);
    }).fail((response) => {
      console.log('EventsStore.onUpdate failed');
      EventsActions.update.failed(response.message);
    });
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

  onAddMember(eventId, memberId) {
    $.ajax({
      url: this.url + '/' + eventId + '/add_member',
      method: 'POST',
      data: {
        member_id: memberId
      },
      xhrFields: {
        withCredentials: true
      }
    }).done((member) => {
      this.addLocalMember(eventId, member);
    })
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
    })
  },

  onAddResource(eventId, resourceId, amount) {
    $.ajax({
      url: this.url + '/' + eventId + '/add_resource',
      method: 'POST',
      data: {
        resource_id: resourceId,
        event_id: eventId,
        amount: amount
      },
      xhrFields: {
        withCredentials: true
      }
    }).done((resource) => {
      this.addLocalResource(eventId, resource);
    })
  },

  onRemoveResource(eventId, resourceId) {
    $.ajax({
      url: this.url + '/' + eventId + '/remove_resource',
      method: 'POST',
      data: {
        resource_id: resourceId
      },
      xhrFields: {
        withCredentials: true
      }
    }).done((resource) => {
      this.removeLocalResource(eventId, resourceId);
    })
  }

});

export default EventsStore;