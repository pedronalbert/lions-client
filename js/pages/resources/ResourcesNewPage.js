import React from 'react/addons';
import {Input, ButtonInput} from 'react-bootstrap';
import Radium from 'radium';
import ResourcesActions from '../../actions/ResourcesActions';

let ResourcesNewPage = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  
  handleSubmit(e) {
    e.preventDefault();
    let data = {
      type: this.state.type,
      using: this.state.using,
      available: this.state.available,
      damaged: this.state.damaged
    };

    ResourcesActions
      .create
      .triggerPromise(data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (response) {
        console.log(response);
      });
  },


  render() {

    return <div>
      <form onSubmit={this.handleSubmit}>
        <Input valueLink={this.linkState('type')} type="text" label="Tipo" placeholder="Tipo"/>
        <Input valueLink={this.linkState('available')} type="text" label="Disponibles" placeholder="Disponibles"/>
        <Input valueLink={this.linkState('using')} type="text" label="Usando" placeholder="Usando"/>
        <Input valueLink={this.linkState('damaged')} type="text" label="Dañados" placeholder="Dañados"/>
        <ButtonInput type="submit" value="Agregar Recurso"/>
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
export default Radium(ResourcesNewPage);