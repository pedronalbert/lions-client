import Reflux from 'reflux';

let UsersActions = Reflux.createActions({
  'isLogged': {asyncResult: true},
  'hasRole': {asyncResult: true},
  'getLoggedUser': {asyncResult: true},
  'getList': {asyncResult: true},
  'login': {asyncResult: true},
  'logout': {asyncResult: true},
  'delete': {asyncResult: true},
  'find': {asyncResult: true},
  'update': {asyncResult: true},
  'create': {asyncResult: true}
});

export default UsersActions;