import React from 'react';
import {Input, ButtonInput} from 'react-bootstrap';
import Radium from 'radium';
import MembersActions from '../../actions/MembersActions';

let MembersNewPage = React.createClass({ 
  handleSubmit(e) {
    e.preventDefault();
    let data = this.getFormData();

    MembersActions
      .create
      .triggerPromise(data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (response) {
        console.log(response);
      });
  },

  getFormData() {
    let data = {};

    data.first_name = this.refs.first_name.getValue();
    data.last_name = this.refs.last_name.getValue();
    data.ci = this.refs.ci.getValue();
    data.email = this.refs.email.getValue();
    data.phone = this.refs.phone.getValue();

    return data;
  },

  render() {
    return <div>
      <form onSubmit={this.handleSubmit}>
        <Input ref="first_name" type="text" name="first_name" label="Nombre" placeholder="Nombre"/>
        <Input ref="last_name" type="text" name="last_name" label="Apellido" placeholder="Apellido"/>
        <Input ref="ci" type="text" name="dni" label="Cedula" placeholder="Cedula" />       
        <Input ref="email" type="text" name="email" label="Correo" placeholder="Correo" />
        <Input ref="phone" type="text" name="phone" label="Telefono" placeholder="Teléfono" />
        <ButtonInput type="submit" value="Registrar Miembro" />
      </form>
    </div>
  }
})

let styles = {
  buttonContainer: {
    display: 'flex',
    flexFlow: 'center'
  },

};
export default Radium(MembersNewPage);