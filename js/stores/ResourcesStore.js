import Reflux from 'reflux';
import ResourcesActions from '../actions/ResourcesActions';
import $ from 'jquery';
import _ from 'lodash';

let ResourcesStore = Reflux.createStore({
  url: '/resource',
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

  add(resource) {
    ResourcesActions
      .getList
      .triggerPromise()
      .then((resources) => {
        this.resources.push(resource);
        this.trigger(this.resources);
      })
  },

  update(id, data) {
    let index =_.findIndex(this.resources, (resource) => {
      return resource.id == id;
    });

    this.resources[index] = data;

    this.trigger(this.resources);
  },

  onGetList(forceUpdate = false) {
    if (_.isEmpty(this.resources) || forceUpdate) {
      $.ajax({
        url: this.url,
        method: 'GET',
        xhrFields: {
            withCredentials : true
        }
      }).done((resources) => {
        this.resources = resources;
        this.trigger(this.resources);
        ResourcesActions.getList.completed(resources);
      }).fail((xhr, status) => {
        ResourcesActions.getList.failed('Error en el servidor!');
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
    }).fail((xhr) => {
      if (xhr.status == 400) {
        ResourcesActions.create.failed(xhr.responseJSON.error);   
      } else {
        ResourcesActions.create.failed('Error en el servidor');
      }
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
      ResourcesActions.delete.completed();
    })
  }
});

export default ResourcesStore;