import React from 'react';
import { Router, Route, Link } from 'react-router';
import { history } from 'react-router/lib/HashHistory';
import LeftSidebar from './components/LeftSidebar/LeftSidebar';

//Members views
import MembersListView from './views/Members/views/List/MembersListView';
import MembersEditView from './views/Members/views/Edit/MembersEditView';
import MembersNewView from './views/Members/views/New/MembersNewView';
import ResourcesListView from './views/Resources/views/List/ResourcesListView';
import ResourcesEditView from './views/Resources/views/Edit/ResourcesEditView';
import ResourcesNewView from './views/Resources/views/New/ResourcesNewView';
import EventsNewView from './views/Events/views/New/EventsNewView';
import EventsEditView from './views/Events/views/Edit/EventsEditView';
import EventsListView from './views/Events/views/List/EventsListView';


let App = React.createClass({ 
  render() {
    return (
      <div className="container">
        <div className="leftSidebar">
          <LeftSidebar/>
        </div>
        <div className="content">
          <div className="header">
          </div>
          <div className="main">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
});

React.render((
  <Router history={history}>
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
    </Route>
  </Router>
), document.getElementById('app'));