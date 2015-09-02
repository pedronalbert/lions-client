import Reflux from 'reflux';

let EventsActions = Reflux.createActions({
  'create': {asyncResult: true},
  'getList': {asyncResult: true},
  'find': {asyncResult: true},
  'addMember': {asyncResult: true},
  'removeMember': {asyncReslut: true},
  'addResource': {asyncResult: true},
  'removeResource': {asyncResult: true},
  'delete': {}
});

export default EventsActions;