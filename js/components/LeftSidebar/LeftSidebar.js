/*---Dependencies---*/
import FontAwesome from 'react-fontawesome';
import Radium from 'radium';
import React from 'react';
import Reflux from 'reflux';
import {ButtonToolbar, Button} from 'react-bootstrap';

/*---Components---*/
import Menu from './components/Menu';
import UsersActions from '../../actions/UsersActions';
import UsersStore from '../../stores/UsersStore';

let LeftSidebar = React.createClass({
  mixins: [Reflux.connect(UsersStore, 'usersStore')],

  componentWillMount() {
    UsersActions.getLoggedUser()
  },

  render() {
    return (<div style={styles.base}>
      <div>
        <img style={styles.logo} src="./img/logo.png" />
      </div>
      <div style={styles.label} >
        <div style={styles.welcome}>Bienvenido {this.state.usersStore.loggedUser.name}</div>
        <div style={styles.logout}>
          <Button bsStyle="danger" onClick={this.handleLogout} >
            <FontAwesome name="power-off" />
          </Button>
        </div>
      </div>

      <Menu/>
    </div>);
  },

  handleLogout() {
    UsersActions
      .logout()
  }
});

let styles = {
  base: {
    background: '#377CB7',
    width: '100%',
    height: '100%'
  },

  logo: {
    width: '150px',
    margin: '15px 45px 10px 45px'
  },

  label: {
    'backgroundColor': '#0065BB',
    height: '50px',
    display: 'flex',
    alignItems: 'center'
  },

  logout: {
    width: '50px'
  },

  welcome: {
    flex: 1,
    color: '#fff',
    fontSize: '15px',
    textAlign: 'center'
  }
};

LeftSidebar = Radium(LeftSidebar);

export default LeftSidebar;
