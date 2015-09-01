import React from 'react';
import { Router, Route, Link } from 'react-router';
import { history } from 'react-router/lib/HashHistory';

import LeftSidebar from './components/LeftSidebar/LeftSidebar';
import MembersListPage from './pages/members/MembersListPage';
import MembersNewPage from './pages/members/MembersNewPage';
import MembersEditPage from './pages/members/MembersEditPage';
import ResourcesListPage from './pages/resources/ResourcesListPage';
import ResourcesEditPage from './pages/resources/ResourcesEditPage';
import ResourcesNewPage from './pages/resources/ResourcesNewPage';
import EventsNewPage from './pages/events/EventsNewPage';
import EventsListPage from './pages/events/EventsListPage';
import EventsEditPage from './pages/events/EventsEditPage';

let App = React.createClass({
  render() {
    return <div className="container">
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
  }
});

React.render((
  <Router history={history}>
    <Route path="/" component={App}>
      <Route path="members" component={MembersListPage} />
      <Route path="members/new" component={MembersNewPage} />
      <Route path="members/:id/edit" component={MembersEditPage} />
      <Route path="resources" component={ResourcesListPage} />
      <Route path="resources/:id/edit" component={ResourcesEditPage} />
      <Route path="resources/new" component={ResourcesNewPage} />
      <Route path="events/new" component={EventsNewPage} />
      <Route path="events" component={EventsListPage} />
      <Route path="events/:id/edit" component={EventsEditPage} />
    </Route>
  </Router>
), document.getElementById('app'));