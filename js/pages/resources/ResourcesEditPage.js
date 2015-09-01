import React from 'react/addons';
import {Input, ButtonInput} from 'react-bootstrap';
import Radium from 'radium';
import ResourcesActions from '../../actions/ResourcesActions';

let ResourcesEdit = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  componentDidMount() {
    this.updateResourceData(this.props.id);
  },

  handleSubmit(e) {
    e.preventDefault();
    let data = {
      type: this.state.type,
      using: this.state.using,
      available: this.state.available,
      damaged: this.state.damaged
    };

    ResourcesActions
      .update
      .triggerPromise(this.props.params.id, data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (response) {
        console.log(response);
      });
  },


  updateResourceData(id) {
    ResourcesActions
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
        <Input valueLink={this.linkState('type')} type="text" label="Tipo" placeholder="Tipo"/>
        <Input valueLink={this.linkState('available')} type="text" label="Disponibles" placeholder="Disponibles"/>
        <Input valueLink={this.linkState('using')} type="text" label="Usando" placeholder="Usando"/>
        <Input valueLink={this.linkState('damaged')} type="text" label="Dañados" placeholder="Dañados"/>
        <ButtonInput type="submit" value="Editar Recurso"/>
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
export default Radium(ResourcesEdit);