import Reflux from 'reflux';
import ResourcesActions from '../actions/ResourcesActions';
import $ from 'jquery';
import _ from 'lodash';

let ResourcesStore = Reflux.createStore({
  url: 'http://localhost/resource',
  resources: [],

  listenables: [ResourcesActions],

  init() {
    this.onGetList();
  },

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

  add(resource) {
    this.resources.push(resource);

    this.trigger(this.resources);
  },

  update(id, data) {
    let index =_.findIndex(this.resources, (resource) => {
      return resource.id == id;
    });

    this.resources[index] = data;

    this.trigger(this.resources);
  },

  onGetList() {
    if (_.isEmpty(this.resources)) {
      $.ajax({
        url: this.url,
        method: 'GET',
        dataType: 'jsonp'
      }).done((resources) => {
        this.resources = resources;
        this.trigger(this.resources);
        ResourcesActions.getList.completed(resources);
      }).fail((err) => {
        ResourcesActions.getList.failed(err);
      })
    } else {
      this.trigger(this.resources);
      ResourcesActions.getList.completed(this.resources);
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
    }).done((resource) => {
      this.add(resource);
      ResourcesActions.create.completed(resource);
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
    }).done((resource) => {
      this.update(id, resource);
      ResourcesActions.update.completed(resource);
    }).fail((response) => {
      console.log('ResourcesStore.onUpdate failed');
      ResourcesActions.update.failed(response.message);
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
  }
});

export default ResourcesStore;