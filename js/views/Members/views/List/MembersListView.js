import React from 'react/addons';
import Reflux from 'reflux';
import MembersActions from '../../../../actions/MembersActions';
import MembersStore from '../../../../stores/MembersStore';
import MembersTable from './components/MembersTable';
import {Input} from 'react-bootstrap';

let MembersLisView = React.createClass({
  mixins: [
    Reflux.connect(MembersStore, 'members'),
    React.addons.LinkedStateMixin
  ],
  
  getInitialState() {
    return {members: [], filter: ''};
  },

  componentDidMount() {
    MembersActions.getList();
  },

  render() {
    return (
      <div>
        <Input type="text" valueLink={this.linkState('filterWord')} />
        <MembersTable members={this.state.members} filter={this.state.filterWord} />
      </div>
    );
  }
});

export default MembersLisView;