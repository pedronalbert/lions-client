import Reflux from 'reflux';
import MembersActions from '../actions/MembersActions';
import $ from 'jquery';
import _ from 'lodash';

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

  onGetList(forceUpdate = false) {
    if (_.isEmpty(this.members) || forceUpdate) {
      $.ajax({
        url: this.url,
        method: 'GET',
        xhrFields: {
            withCredentials : true
        }
      }).done((members) => {
        this.members = members;
        this.trigger(this.members);
        MembersActions.getList.completed(members);
      }).fail((xhr) => {
        MembersActions.getList.failed('Error en el servidor');
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
    }).fail((xhr) => {
      if (xhr.status == 400) {
        MembersActions.create.failed(xhr.responseJSON.error);   
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
      data: data,
      xhrFields: {
        withCredentials : true
     }
    }).done((member) => {
      this.update(id, member);
      MembersActions.update.completed(member);
    }).fail((response) => {
      MembersActions.update.failed(response.message);
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

export default MembersStore;