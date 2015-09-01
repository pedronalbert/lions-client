import Reflux from 'reflux';

let MembersActions = Reflux.createActions({
  'getList' : {asyncResult: true},
  'create': { asyncResult: true },
  'find': { asyncResult: true },
  'update': { asyncResult: true},
  'delete': {}
});

export default MembersActions;