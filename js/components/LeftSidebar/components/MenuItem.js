/*---Dependencies---*/
import FontAwesome from 'react-fontawesome';
import Radium from 'radium';
import React from 'react';
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
    color: 'white'
  },

  base: {
    padding: '12px 0px 12px 45px',
    fontSize: '16px',

    ':hover': {
      padding: '12px 0px 12px 52px',
      fontWeight: '600'
    }
  }, 

  icon: {
    paddingRight: '8px'
  }
};

export default Radium(MenuItem);