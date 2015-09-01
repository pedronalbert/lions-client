import React from 'react';
import Radium from 'radium';
import Menu from './Menu';

let styles = {
  base: {
    background: '#5D5F61',
    width: '100%',
    height: '100%'
  },

  logo: {
    background: '#3891FD',
    height: '210px'
  }
};

let LeftSidebar = React.createClass({
  render() {
    return (<div style={styles.base}>
      <div style={styles.logo}>
      </div>

      <Menu />
    </div>);
  }
});

LeftSidebar = Radium(LeftSidebar);

export default LeftSidebar;
