import Reflux from 'reflux';

let LogsActions = Reflux.createActions({
  'getList': {asyncResult: true}
});

export default LogsActions;