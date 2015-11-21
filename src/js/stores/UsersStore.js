import Reflux from 'reflux';
import UsersActions from 'actions/UsersActions';
import $ from 'jquery';
import _ from 'lodash';

let UsersStore = Reflux.createStore({
  loggedUser: {},
  users: {},
  url: '/user',
  fetchedFromServer: false,

  listenables: [UsersActions],

  getInitialState() {
    return {
      loggedUser: this.loggedUser,
      users: this.users
    };
  },

  onGetLoggedUser() {
    if(!this.fetchedFromServer) {
      $.ajax({
        url: this.url + '/logged',
        method: 'POST'
      }).done((user) => {
        this.loggedUser = user;
        this.fetchedFromServer = true;
        this.trigger({loggedUser: user});
        UsersActions.getLoggedUser.completed(user);
      }).fail((error) => {
        if(error.status == 400 || error.status == 401) {
          UsersActions.getLoggedUser.failed(error.responseJSON.message);
        } else {
          UsersActions.getLoggedUser.failed('Error en el servidor');
        }
      })   
    } else {
      this.trigger({loggedUser: this.loggedUser, users: this.users});
      UsersActions.getLoggedUser.completed(this.loggedUser);
    }
  },

  onIsLogged() {
    UsersActions
      .getLoggedUser
      .triggerPromise()
      .then((user) => {
        UsersActions.isLogged.completed()
      })
      .catch((error) => {
        UsersActions.isLogged.failed()
      })
  },

  onLogin(email, password) {
    $.ajax({
      url: this.url + '/login',
      method: 'POST',
      data: {
        email: email,
        password: password
      }
    }).done((user) => {
      this.loggedUser = user;
      this.trigger({loggedUser: user, users: this.users});
      UsersActions.login.completed(user);
    }).fail((error) => {
      if(error.status == 400 || error.status == 401) {
        UsersActions.login.failed(error.responseJSON.message);
      } else {
        UsersActions.login.failed('Error en el servidor');
      }
    }) 
  },

  onLogout() {
    $.ajax({
      url: this.url + '/logout',
      method: 'POST'
    }).done((response) => {
      this.loggedUser = {};
      this.trigger({loggedUser: {}});
      UsersActions.logout.completed();
    }).fail((error) => {
      if(error.status == 400 || error.status == 401) {
        UsersActions.login.failed(error.responseJSON.message);
      } else {
        UsersActions.login.failed('Error en el servidor');
      }
    })
  },

  onGetList() {
    $.ajax({
      url: this.url,
      method: 'GET'
    }).done((users) => {
      this.users = users;
      this.trigger({
        users: users,
        loggedUser: this.loggedUser
      });
      UsersActions.getList.completed(users);
    }).fail((error) => {
      if(error.status == 400 || error.status == 401) {
        UsersActions.getList.failed(error.responseJSON.message);
      } else {
        UsersActions.getList.failed('Error en el servidor');
      }
    })
  },

  onFind(userId) {
    $.ajax({
      url: this.url + '/' + userId,
      method: 'GET'
    }).done((user) => {
      UsersActions.find.completed(user);
    }).fail((error) => {
      if(error.status == 400 || error.status == 401) {
        UsersActions.find.failed(error.responseJSON.message);
      } else {
        UsersActions.find.failed('Error en el servidor');
      }
    })
  }, 

  onUpdate(userId, data) {
    $.ajax({
      url: this.url + '/' + userId,
      method: 'PUT',
      data: data,
    }).done((user) => {
      UsersActions.getList();
      UsersActions.update.completed(user);
    }).fail((error) => {
      if(error.status == 400 || error.status == 401) {
        UsersActions.update.failed(error.responseJSON.message);
      } else {
        UsersActions.update.failed('Error en el servidor');
      }
    })
  },

  onDelete(userId) {
    $.ajax({
      url: this.url + '/' + userId,
      method: 'DELETE'
    }).done((user) => {
      UsersActions.getList();
      UsersActions.delete.completed(user);
    }).fail((error) => {
      if(error.status == 400 || error.status == 401) {
        UsersActions.delete.failed(error.responseJSON.message);
      } else {
        UsersActions.delete.failed('Error en el servidor');
      }
    })
  },

  onCreate(data) {
    $.ajax({
      url: this.url,
      method: 'POST',
      data: data,
    }).done((user) => {
      UsersActions.getList();
      UsersActions.create.completed();
    }).fail((error) => {
      if(error.status == 400 || error.status == 401) {
        UsersActions.create.failed(error.responseJSON.message);
      } else {
        UsersActions.create.failed('Error en el servidor');
      }
    })
  }
});

export default UsersStore;