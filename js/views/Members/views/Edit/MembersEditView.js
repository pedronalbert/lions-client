import React from 'react/addons';
import {Input, ButtonInput} from 'react-bootstrap';
import Radium from 'radium';
import MembersActions from '../../../../actions/MembersActions';

let MembersEditView = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  componentDidMount() {
    this.updateMemberData(this.props.id);
  },

  handleSubmit(e) {
    e.preventDefault();
    let data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      ci: this.state.ci,
      phone: this.state.phone,
      email: this.state.email
    };

    MembersActions
      .update
      .triggerPromise(this.props.params.id, data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (response) {
        console.log(response);
      });
  },


  updateMemberData(id) {
    MembersActions
      .find
      .triggerPromise(this.props.params.id)
      .then((response) => {
        this.setState(response);
      })
      .catch((response) => {
        console.log(response);
      }) 
  },

  render() {

    return <div>
      <form onSubmit={this.handleSubmit}>
        <Input valueLink={this.linkState('first_name')} type="text" label="Nombre" placeholder="Nombre"/>
        <Input valueLink={this.linkState('last_name')} type="text" label="Apellido" placeholder="Apellido" />
        <Input valueLink={this.linkState('ci')} type="text" label="Cedula" placeholder="Cedula" />       
        <Input valueLink={this.linkState('email')} type="text" label="Correo" placeholder="Correo" />
        <Input valueLink={this.linkState('phone')} type="text" label="Telefono" placeholder="Teléfono" />
        <ButtonInput type="submit" value="Registrar Miembro"/>
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
export default Radium(MembersEditView);