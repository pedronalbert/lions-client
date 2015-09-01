import Reflux from 'reflux';
import ResourcesActions from '../actions/ResourcesActions';
import $ from 'jquery';
import _ from 'lodash';

let ResourcesStore = Reflux.createStore({
  url: 'http://localhost/resource',
  resources: [],

  listenables: [ResourcesActions],

  find(id) {
    let resource = _.find(this.resources, (resource) => {
      return resource.id == id;
    });
    return resource;
  },

  remove(id) {
     _.remove(this.resources, (resource) => {
      return resource.id == id
    });

    this.trigger(this.resources);
  },

  onGetList() {
    $.ajax({
      url: this.url,
      method: 'GET',
      dataType: 'jsonp'
    }).done((data) => {
      this.resources = data;
      this.trigger(this.resources);
      ResourcesActions.getList.completed(data);
    }).fail((err) => {
      ResourcesActions.getList.failed(err);
    })
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
      ResourcesActions.create.completed(response.message);
    }).fail((response) => {
      ResourcesActions.create.failed(response.message);
    })
  },

  onFind(id) {
    let resource = this.find(id);

    if (_.isEmpty(resource)) {
      ResourcesActions
        .getList
        .triggerPromise()
        .then((resources) => {
          resource = this.find(id);

          if(_.isEmpty(resource)) {
            ResourcesActions.find.failed('Recurso no encontrado');
          } else {
            ResourcesActions.find.completed(resource);
          }
        })
        .catch((err) => {
          ResourcesActions.find.failed(err);
        })
    } else {
      ResourcesActions.find.completed(resource);
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
    }).done((response) => {
      ResourcesActions.update.completed(response.message);
    }).fail((response) => {
      ResourcesActions.update.failed(response.message);
    });
  },

  onDelete(id) {
    this.remove(id);

    return true;
    
    $.ajax({
      url: this.url + '/' + id,
      method: 'DELETE',
      xhrFields: {
        withCredentials: true
      }
    }).done((response) => {
      this.remove(id);
    })
  }
});

export default ResourcesStore;