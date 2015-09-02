import React from 'react';
import Radium from 'radium';
import FontAwesome from 'react-fontawesome';
import MenuItem from './MenuItem'; 

let Menu = React.createClass({
  membersItems: [
    {title: 'Listar miembros', icon: 'list', link: '#/members'},
    {title: 'Agregar miembro', icon: 'user-plus', link: '#/members/new'}
  ],

  resourcesItems: [
    {title: 'Listar Recursos', icon: 'list', link: '#/resources'},
    {title: 'Agregar Recurso', icon: 'plus', link: '#/resources/new'}
  ],

  eventsItems: [
    {title: 'Lista de Eventos', icon: 'list', link: '#/events'},
    {title: 'Agregar Evento', icon: 'plus', link: '#/events/new'}
  ],

  render() {

    return <div style={styles.base}>
        <div style={styles.title}> Eventos </div>
        {this.eventsItems.map((item) => {
          return <MenuItem key={item.id} item={item} />
        })}
        <div style={styles.title}> Miembros </div>
        {this.membersItems.map((item) => {
          return <MenuItem key={item.id} item={item} />
        })}
        <div style={styles.title}> Recursos </div>
        {this.resourcesItems.map((item) => {
          return <MenuItem key={item.id} item={item} />
        })}

    </div>
  }
});

let styles = {
  base: {
    padding: '15px 0px',
    color: '#E4E4E4'
  },

  title: {
    fontSize: '15px',
    fontWeight: 900,
    padding: '5px 25px'
  }
}

Menu = Radium(Menu);

export default Menu;