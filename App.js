import React, { Component } from 'react';
import { StyleSheet, Text, View, NavigatorIOS} from 'react-native';
import PropTypes from 'prop-types';

import Sketch from 'react-native-sketch';
import SquiggleCanvas from './SquiggleCanvas';
import SquiggleGrid from './SquiggleGrid';


var RNFS = require('react-native-fs');


export default class App extends Component {

  _toSquiggleCanvas = () => {
     this.refs.nav.push({
      title: 'Squiggle Canvas', 
      component: SquiggleCanvas
    })
  };
 
  render() {
    return (
       <NavigatorIOS
        ref='nav'
        style={styles.container}
        initialRoute={{
          title: 'Checkout your squigs',
          component: SquiggleGrid, 
          rightButtonTitle: 'New',
          onRightButtonPress: () => this._toSquiggleCanvas()
        }}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class FirstView extends Component { 

  _toSquiggleCanvas = () => {
    this.props.navigator.push({
      title: 'Squiggle Canvas', 
      component: SquiggleCanvas
    })
  };



}
