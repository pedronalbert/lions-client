import React from 'react';
import Radium from 'radium';
import FontAwesome from 'react-fontawesome';
import MenuItem from './MenuItem'; 
import {State, Link} from 'react-router';
import UsersActions from '../../../actions/UsersActions';

let Menu = React.createClass({
  getInitialState() {
    return {loggedUser: {}};
  },

  componentDidMount() {
    UsersActions
      .getLoggedUser
      .triggerPromise()
      .then((user) => {
        this.setState({loggedUser: user});
      })
  },

  render() {
    if(this.state.loggedUser.role == 1) {
      return <div style={styles.base}>
        <div style={styles.title}><FontAwesome name="calendar" /> Eventos</div>
        <MenuItem href="events" text="Lista de eventos" icon="list" />
        <MenuItem href="events/new" text="Registrar Evento" icon="calendar-plus-o" />

        <div style={styles.title}><FontAwesome name="cubes" /> Inventario</div>
        <MenuItem href="resources" text="Lista de Recursos" icon="list" />
        <MenuItem href="resources/new" text="Registrar Recurso" icon="cart-plus" />

        <div style={styles.title}><FontAwesome name="users" /> Miembros</div>
        <MenuItem href="members" text="Lista de Miembros" icon="list" />
        <MenuItem href="members/new" text="Registrar Miembro" icon="user-plus" />

        <div style={styles.title}><FontAwesome name="user-secret" /> Administracion</div>
        <MenuItem href="users" text="Lista de Usuarios" icon="list" />
        <MenuItem href="users/new" text="Registrar Usuario" icon="user-plus" />
        <MenuItem href="logs" text="Auditoria" icon="heartbeat" />

      </div>
    } else {
      return <div style={styles.base}>
        <div style={styles.title}><FontAwesome name="calendar" /> Eventos</div>
        <MenuItem href="events" text="Lista de eventos" icon="list" />

        <div style={styles.title}><FontAwesome name="cubes" /> Inventario</div>
        <MenuItem href="resources" text="Lista de Recursos" icon="list" />

        <div style={styles.title}><FontAwesome name="users" /> Miembros</div>
        <MenuItem href="members" text="Lista de Miembros" icon="list" />
      </div>  
    }
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