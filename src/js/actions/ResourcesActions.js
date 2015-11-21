import Reflux from 'reflux';

let ResourcesActions = Reflux.createActions({
  'getList' : {asyncResult: true},
  'create': { asyncResult: true },
  'find': { asyncResult: true },
  'update': { asyncResult: true},
  'delete': { asyncResult: true}
});

export default ResourcesActions;