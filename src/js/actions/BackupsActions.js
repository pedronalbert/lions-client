import Reflux from 'reflux';

let BackupsActions = Reflux.createActions({
	'getList': {asyncResult: true},
	'create': {asyncResult: true}
});

export default BackupsActions;