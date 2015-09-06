import Reflux from 'reflux';
import UsersActions from '../actions/UsersActions';
import $ from 'jquery';

let UsersStore = Reflux.createStore({
  loggedUser: {},
  users: {},
  url: '/user',

  listenables: [UsersActions],

  onGetLoggedUser() {
    $.ajax({
      url: this.url + '/logged',
      method: 'POST',
      xhrFields: {
        withCredentials : true
      }
    }).done((user) => {
      this.loggedUser = user;
      this.trigger({loggedUser: user});
      UsersActions.getLoggedUser.completed(user);
    }).fail((xhr, code) => {
      UsersActions.getLoggedUser.failed()
    })
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
      },
      xhrFields: {
        withCredentials : true
      }
    }).done((user) => {
      this.loggedUser = user;
      this.trigger({loggedUser: user});
      UsersActions.login.completed(user);
    }).fail((xhr, code) => {
      UsersActions.login.failed(xhr.responseJSON.message);
    })
  },

  onLogout() {
    $.ajax({
      url: this.url + '/logout',
      method: 'POST',
      xhrFields: {
        withCredentials : true
      }
    }).done((response) => {
      this.loggedUser = {};
      this.trigger({loggedUser: {}});
      UsersActions.logout.completed();
    }).fail((xhr, code) => {
      UsersActions.logout.failed()
    })
  },

  onGetList() {
    $.ajax({
      url: this.url,
      method: 'GET',
      xhrFields: {
        withCredentials : true
      }
    }).done((users) => {
      this.users = users;
      this.trigger({
        users: users,
        loggedUser: this.loggedUser
      });
      UsersActions.getList.completed(users);
    }).fail((xhr, code) => {
      UsersActions.getList.failed()
    })
  },

  onFind(userId) {
    $.ajax({
      url: this.url + '/' + userId,
      method: 'GET',
      xhrFields: {
        withCredentials : true
      }
    }).done((user) => {
      UsersActions.find.completed(user);
    }).fail((xhr, code) => {
      UsersActions.find.failed()
    })
  }, 

  onUpdate(userId, data) {
    $.ajax({
      url: this.url + '/' + userId,
      method: 'PUT',
      xhrFields: {
        withCredentials : true
      },
      data: data,
    }).done((user) => {
      UsersActions.getList();
      UsersActions.update.completed(user);
    }).fail((xhr, code) => {
      UsersActions.update.failed()
    })
  },

  onDelete(userId) {
    $.ajax({
      url: this.url + '/' + userId,
      method: 'DELETE',
      xhrFields: {
        withCredentials : true
      }
    }).done((user) => {
      UsersActions.getList();
      UsersActions.delete.completed(user);
    }).fail((xhr, code) => {
      UsersActions.delete.failed()
    })
  },

  onCreate(data) {
    $.ajax({
      url: this.url,
      method: 'POST',
      xhrFields: {
        withCredentials : true
      },
      data: data,
    }).done((user) => {
      UsersActions.getList();
      UsersActions.create.completed();
    }).fail((xhr, code) => {
      UsersActions.create.failed()
    })
  }
});

export default UsersStore;