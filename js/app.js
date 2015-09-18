import React from 'react';
import { Router, Route, Link , State, History} from 'react-router';
import LeftSidebar from './components/LeftSidebar/LeftSidebar';
import Reflux from 'reflux';
import _ from 'lodash';

//Members views
import MembersListView from './views/Members/views/List/MembersListView';
import MembersEditView from './views/Members/views/Edit/MembersEditView';
import MembersNewView from './views/Members/views/New/MembersNewView';
import ResourcesListView from './views/Resources/views/List/ResourcesListView';
import ResourcesEditView from './views/Resources/views/Edit/ResourcesEditView';
import ResourcesNewView from './views/Resources/views/New/ResourcesNewView';
import EventsNewView from './views/Events/views/New/EventsNewView';
import EventsEditView from './views/Events/views/Edit/EventsEditView';
import EventsShowView from './views/Events/views/Show/EventsShowView';
import EventsListView from './views/Events/views/List/EventsListView';
import LoginView from './views/Login/LoginView';
import UsersListView from './views/Users/views/List/UsersListView';
import UsersStore from './stores/UsersStore';
import UsersActions from './actions/UsersActions';
import UsersEditView from './views/Users/views/Edit/UsersEditView';
import UsersNewView from './views/Users/views/New/UsersNewView';
import LogsListView from './views/Logs/LogsListView';
import BackupsListView from './views/Backups/BackupsListView';

let App = React.createClass({ 
  mixins: [
    State,
    History,
    Reflux.ListenerMixin
  ],

  componentDidMount() {
    this.listenTo(UsersStore, this.onUserChange);
      UsersActions
        .getLoggedUser()
  },

  getInitialState() {
    return {userLogged: false}
  },

  onUserChange(data) {
      if(_.isEmpty(data.loggedUser)) {
         this.setState({userLogged: false});
      } else {
        this.setState({userLogged: true});
      }
  },

  render() {
    if (this.state.userLogged) {
      return (
        <div className="container">
          <div className="leftSidebar">
            <LeftSidebar/>
          </div>
          <div className="content">
            <div className="main">
              {this.props.children}
            </div>
          </div>
        </div>
      ); 
    } else {
      return (
        <LoginView />
      );
    }
  }
});

React.render((
  <Router>
    <Route path="/" component={App}>
      <Route path="members" component={MembersListView} />
      <Route path="members/:id/edit" component={MembersEditView} />
      <Route path="members/new" component={MembersNewView} />
      <Route path="resources" component={ResourcesListView} />
      <Route path="resources/:id/edit" component={ResourcesEditView} />
      <Route path="resources/new" component={ResourcesNewView} />
      <Route path="events/new" component={EventsNewView} />
      <Route path="events/:id/edit" component={EventsEditView} />
      <Route path="events" component={EventsListView} />
      <Route path="login" component={LoginView} />
      <Route path="users" component={UsersListView} />
      <Route path="users/:id/edit" component={UsersEditView} />
      <Route path="users/new" component={UsersNewView} />
      <Route path="logs" component={LogsListView} />
      <Route path="events/:id" component={EventsShowView} />
      <Route path="backups" component={BackupsListView} />
    </Route>
  </Router>
), document.getElementById('app'));