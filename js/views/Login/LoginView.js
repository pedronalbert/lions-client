import React from 'react/addons';
import Radium from 'radium';
import {Row, Col, Input, Button, ButtonInput} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import UsersActions from '../../actions/UsersActions';
import UsersStore from '../../stores/UsersStore';
import {History} from 'react-router';

let LoginView = React.createClass({
  mixins: [
    React.addons.LinkedStateMixin,
    History
  ],

  getInitialState() {
    return {formButton: {disabled: false, style: 'primary'}};
  },

  handleSubmit(e) {
    e.preventDefault();

    this.setState({formButton: {disabled: true, style: null}});

    UsersActions
      .login
      .triggerPromise(this.state.email, this.state.password)
      .then((user) => {
        this.history.pushState(null, 'events');
      })
      .catch((error) => {
        window.toastr.error(error, 'ERROR!');
        this.setState({formButton: {disabled: false, style: 'primary'}});
      })
  },

  render() {
    let emailAddon = <FontAwesome name="envelope-o" />
    let passwordAddon = <FontAwesome name="key" />

    return (
      <div style={styles.base}>
        <div style={styles.loginBox}>
          <Row>
            <img style={styles.logo} src="./img/logo.png" />
          </Row>
          <Row>
            <form onSubmit={this.handleSubmit}>
              <Input 
                type="text" 
                valueLink={this.linkState('email')}
                placeholder="Correo"
                addonBefore={emailAddon}
              />

              <Input
                type="password"
                valueLink={this.linkState('password')}
                placeholder="Contraseña"
                addonBefore={passwordAddon}
              />

              <ButtonInput 
                type="submit" 
                bsStyle={this.state.formButton.style} 
                disabled={this.state.formButton.disabled} 
                value="Iniciar Session" 
                style={styles.button} />
            </form>
          </Row>
        </div>
      </div>
    );
  }
});

let styles = {
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  },

  loginBox: {
    width: '360px',
    height: '400px',
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0px 0px 5px black',
    padding: '40px'
  },

  logo: {
    width: '170px',
    height: '170px',
    margin: '0px auto 18px auto',
    display: 'block'
  },

  button: {
    width: '100%'
  }
};

export default Radium(LoginView);