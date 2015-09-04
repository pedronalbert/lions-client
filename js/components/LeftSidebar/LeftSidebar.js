import React from 'react';
import Radium from 'radium';
import Menu from './components/Menu';


let LeftSidebar = React.createClass({
  render() {
    return (<div style={styles.base}>
      <div style={styles.logo}>
      </div>

      <Menu />
    </div>);
  }
});

let styles = {
  base: {
    background: '#4D4E50',
    width: '100%',
    height: '100%'
  },

  logo: {
    background: '#3891FD',
    height: '210px'
  }
};

LeftSidebar = Radium(LeftSidebar);

export default LeftSidebar;
