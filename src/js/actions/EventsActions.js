import Reflux from 'reflux';

let EventsActions = Reflux.createActions({
  'create': {asyncResult: true},
  'getList': {asyncResult: true},
  'find': {asyncResult: true},
  'addMember': {asyncResult: true},
  'removeMember': {asyncResult: true},
  'addResource': {asyncResult: true},
  'removeResource': {asyncResult: true},
  'update': {asyncResult: true},
  'finishEvent': {asyncResult: true},
  'delete': {asyncResult: true}
});

export default EventsActions;