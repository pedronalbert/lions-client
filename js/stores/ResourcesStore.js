import Reflux from 'reflux';
import ResourcesActions from '../actions/ResourcesActions';
import $ from 'jquery';
import _ from 'lodash';
import UsersActions from '../actions/UsersActions';

let ResourcesStore = Reflux.createStore({
  url: '/resource',
  resources: [],
  fetchedFromServer: false,

  listenables: [ResourcesActions],

  getInitialState() {
    return this.resources;
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

  onGetList() {
    if (!this.fetchedFromServer) {
      $.ajax({
        url: this.url,
        method: 'GET'
      }).done((resources) => {
        this.resources = resources;
        this.fetchedFromServer = true;
        this.trigger(this.resources);
        ResourcesActions.getList.completed(resources);
      }).fail((error) => {
        if(error.status == 400 || error.status == 401) {
          ResourcesActions.getList.failed(error.responseJSON.message);
        } else {
          ResourcesActions.getList.failed('Error en el servidor');
        }
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
    }).fail((error) => {
      if(error.status == 400 || error.status == 401) {
        ResourcesActions.create.failed(error.responseJSON.message);
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
    }).fail((error) => {
      if(error.status == 400 || error.status == 401) {
        ResourcesActions.update.failed(error.responseJSON.message);
      } else {
        ResourcesActions.update.failed('Error en el servidor');
      }
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
      ResourcesActions.delete.completed();
    }).fail((error) => {
      if(error.status == 400 || error.status == 401) {
        ResourcesActions.delete.failed(error.responseJSON.message);
      } else {
        ResourcesActions.delete.failed('Error en el servidor');
      }
    })
  }
});

export default ResourcesStore;