import React from 'react';
import Radium from 'radium';
import FontAwesome from 'react-fontawesome';
import {Link} from 'react-router';

let MenuItem = React.createClass({
  render() {
    return (
      <div style={styles.base}> 
        <Link to={this.props.href} style={styles.link} >
          <FontAwesome name={this.props.icon} style={styles.icon} />
          <span>{this.props.text}</span>
        </Link>
      </div>
    );
  }
});

let styles = {
  link: {
    textDecoration: 'none',
    color: 'inherit'
  },

  base: {
    padding: '12px 35px',
    fontSize: '17px',

    ':hover': {
      background: '#909090'
    }
  }, 

  icon: {
    paddingRight: '8px'
  }
};

export default Radium(MenuItem);