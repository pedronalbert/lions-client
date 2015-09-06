import React from 'react';
import Radium from 'radium';
import Menu from './components/Menu';
import FontAwesome from 'react-fontawesome';
import {ButtonToolbar, Button} from 'react-bootstrap';
import UsersActions from '../../actions/UsersActions';

let LeftSidebar = React.createClass({
  handleLogout() {
    UsersActions
      .logout()
  },

  render() {
    return (<div style={styles.base}>
      <div>
        <img style={styles.logo} src="./img/logo.png" />
      </div>
      <div style={styles.label} >
        <div style={styles.welcome}>Bienvenido Alberto</div>
        <div style={styles.logout}>
          <Button bsStyle="danger" onClick={this.handleLogout} >
            <FontAwesome name="power-off" />
          </Button>
        </div>
      </div>
      <Menu />
    </div>);
  }
});

let styles = {
  base: {
    background: '#377CB7',
    width: '100%',
    height: '100%'
  },

  logo: {
    width: '180px',
    margin: '30px 30px 10px 30px'
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
