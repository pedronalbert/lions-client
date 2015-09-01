import React from 'react/addons';
import {Input, ButtonInput} from 'react-bootstrap';
import Radium from 'radium';
import EventsActions from '../../actions/EventsActions';
import EventsStore from '../../stores/EventsStore';

let EventsNewPage = React.createClass({
  mixins: [React.addons.LinkedStateMixin], 
  
  handleSubmit(e) {
    e.preventDefault();

    let data = {
      title: this.state.title,
      description: this.state.description,
      location: this.state.location,
      date: this.state.date,
      sector: this.state.sector,
      active: 1
    };

    console.log(data);
    EventsActions
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
        <Input valueLink={this.linkState('title')} type="text" label="Titulo" placeholder="Titulo"/>
        <Input valueLink={this.linkState('description')} type="textarea" label="Descripcion" placeholder="Descripcion"/>
        <input type="date" className="form-control" valueLink={this.linkState('date')} />
        <Input valueLink={this.linkState('sector')} type="text" label="Sector" placeholder="Sector" />
        <label>Lugar</label>
        <select className="form-control"valueLink={this.linkState('location')} >
          <option value='Local'>Local</option>
          <option value='Cancha'>Cancha</option>
        </select>
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
export default Radium(EventsNewPage);