import React from 'react';
import Radium from 'radium';
import FontAwesome from 'react-fontawesome';

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

    let membersItems = this.membersItems.map(function (item) {
      return <div style={styles.item}> 
          <a href={item.link} style={styles.link}>
            <FontAwesome name={item.icon} style={styles.icon} />
            <span>{item.title}</span>
          </a>
        </div>
    });

    let resourcesItems = this.resourcesItems.map(function (item) {
      return <div style={styles.item}> 
          <a href={item.link} style={styles.link}>
            <FontAwesome name={item.icon} style={styles.icon} />
            <span>{item.title}</span>
          </a>
        </div>
    });

    let eventsItems = this.eventsItems.map(function (item) {
      return <div style={styles.item}> 
          <a href={item.link} style={styles.link}>
            <FontAwesome name={item.icon} style={styles.icon} />
            <span>{item.title}</span>
          </a>
        </div>
    });

    return <div style={styles.base}>
        <div style={styles.title}> Eventos </div>
        {eventsItems}
        <div style={styles.title}> Miembros </div>
        {membersItems}
        <div style={styles.title}> Recursos </div>
        {resourcesItems}

    </div>
  }
});

let styles = {
  base: {
    padding: '15px 0px',
    color: '#fff'
  },

  link: {
    textDecoration: 'none',
    color: 'inherit'
  },

  title: {
    fontSize: '20px',
    marginBottom: '10px',
    fontWeight: 900,
    padding: '5px 25px'
  },

  item: {
    padding: '12px 25px',
    fontSize: '18px'
  }, 

  icon: {
    paddingRight: '8px'
  }
}

Menu = Radium(Menu);

export default Menu;