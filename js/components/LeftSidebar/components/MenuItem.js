import React from 'react';
import Radium from 'radium';
import FontAwesome from 'react-fontawesome';

let MenuItem = React.createClass({
  render() {
    return (
      <div style={styles.base}> 
        <a href={this.props.item.link} style={styles.link}>
          <FontAwesome name={this.props.item.icon} style={styles.icon} />
          <span>{this.props.item.title}</span>
        </a>
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