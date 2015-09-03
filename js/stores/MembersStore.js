import Reflux from 'reflux';
import MembersActions from '../actions/MembersActions';
import $ from 'jquery';
import _ from 'lodash';

let MembersStore = Reflux.createStore({
  url: 'http://server.lions.com/member',
  members: [],

  listenables: [MembersActions],

  init() {
    this.onGetList();
  },

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
    this.members.push(member);

    this.trigger(this.members);
  },

  update(id, data) {
    let index =_.findIndex(this.members, (member) => {
      return member.id == id;
    });

    this.members[index] = data;

    this.trigger(this.members);
  },

  onGetList() {
    if (_.isEmpty(this.members)) {
      $.ajax({
        url: this.url,
        method: 'GET',
      }).done((members) => {
        this.members = members;
        this.trigger(this.members);
        MembersActions.getList.completed(members);
      }).fail((err) => {
        console.log('ERROR MEmbersStore.onGetList()');
        MembersActions.getList.failed(err);
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
      xhrFields : {
        withCredentials : true
     }
    }).done((member) => {
      this.add(member);
      MembersActions.create.completed(member);
    }).fail((response) => {
      console.log('ERROR MEmbersStore.onCreate()');
      MembersActions.create.failed(response.message);
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
      xhrFields : {
        withCredentials : true
     }
    }).done((member) => {
      this.update(id, member);
      MembersActions.update.completed(member);
    }).fail((response) => {
      console.log('MembersStore.onUpdate failed');
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