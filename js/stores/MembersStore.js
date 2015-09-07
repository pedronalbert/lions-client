import Reflux from 'reflux';
import MembersActions from '../actions/MembersActions';
import $ from 'jquery';
import _ from 'lodash';
import UsersActions from '../actions/UsersActions';

let MembersStore = Reflux.createStore({
  url: '/member',
  members: [],

  listenables: [MembersActions],

  find(id) {
    let member = _.find(this.members, (member) => {
      return member.id == id;
    });

    return member;
  },

  remove(id) {
     _.remove(this.members, (member) => {
      return member.id == id
    });

    this.trigger(this.members);
  },

  add(member) {
    MembersActions
      .getList
      .triggerPromise()
      .then((members) => {
        this.members.push(member);
        this.trigger(this.members);
      })
  },

  update(id, data) {
    let index =_.findIndex(this.members, (member) => {
      return member.id == id;
    });

    this.members[index] = data;

    this.trigger(this.members);
  },

  onGetList(force = false) {
    if (_.isEmpty(this.members) || force) {
      $.ajax({
        url: this.url,
        method: 'GET'
      }).done((members) => {
        this.members = members;
        this.trigger(this.members);
        MembersActions.getList.completed(members);
      }).fail((error) => {
        if(error.status == 400 || error.status == 401) {
          MembersActions.getList.failed(error.responseJSON.message);
        } else {
          MembersActions.getList.failed('Error en el servidor');
        }
      })
    } else {
      this.trigger(this.members);
      MembersActions.getList.completed(this.members);
    }
  },

  onCreate(data) {
    $.ajax({
      url: this.url,
      method: 'POST',
      data: data,
      xhrFields: {
        withCredentials : true
     }
    }).done((member) => {
      this.add(member);
      MembersActions.create.completed(member);
    }).fail((error) => {
      if(error.status == 400 || error.status == 401) {
        MembersActions.create.failed(error.responseJSON.message);
      } else {
        MembersActions.create.failed('Error en el servidor');
      }
    })
  },

  onFind(id) {
    let member = this.find(id);

    if (_.isEmpty(member)) {
      MembersActions
        .getList
        .triggerPromise()
        .then((members) => {
          member = this.find(id);

          if(_.isEmpty(member)) {
            MembersActions.find.failed('Miembro no encontrado');
          } else {
            MembersActions.find.completed(member);
          }
        })
        .catch((err) => {
          MembersActions.find.failed(err);
        })
    } else {
      MembersActions.find.completed(member);
    }
    
  },

  onUpdate(id, data) {
    $.ajax({
      url: this.url + '/' + id,
      method: 'PUT',
      data: data
    }).done((member) => {
      this.update(id, member);
      MembersActions.update.completed(member);
    }).fail((error) => {
      if(error.status == 400 || error.status == 401) {
        MembersActions.update.failed(error.responseJSON.message);
      } else {
        MembersActions.update.failed('Error en el servidor');
      }
    })
  },

  onDelete(id) {
    $.ajax({
      url: this.url + '/' + id,
      method: 'DELETE'
    }).done((response) => {
      this.remove(id);
    }).fail((error) => {
      if(error.status == 400 || error.status == 401) {
        MembersActions.delete.failed(error.responseJSON.message);
      } else {
        MembersActions.delete.failed('Error en el servidor');
      }
    })
  }
});

export default MembersStore;