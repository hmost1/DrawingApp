import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, Button, ActivityIndicator} from 'react-native';
import Sketch from 'react-native-sketch';
var RNFS = require('react-native-fs');


export default class SquiggleCanvas extends Component {

  //TODO: use constructor
  //read this 
  //https://engineering.musefind.com/react-lifecycle-methods-how-and-when-to-use-them-2111a1b692b1

  //stateproperties
  state = {
    hasDrawn: false,
    strokeColor: "#000000",
    strokeThickness: 7, 
  };


   componentDidMount = () => {
    this.clear(); //otherwise will pull in old squiggles
  } 

  //this will occur before the clear callback
  onChange = (image) => {
    this.setState({hasDrawn: true});
  }

  save = () => {
    this.sketch.save().then(({ path }) => {
      Alert.alert('Squiggle saved!', path);
      this.clear();
    });
  };

  clear = () => {
    this.sketch.clear().then(() => {
      this.setState({hasDrawn: false});
    });
  };
 
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Squiggle Factory</Text>
        <View pointerEvents={this.state.hasDrawn ? "none" : "auto"} style={{ flex: 1 }}>
            <Sketch
              ref={sketch => {
                this.sketch = sketch;
              }}
              strokeColor={this.state.strokeColor}
              strokeThickness={this.state.strokeThickness}
              onChange={this.onChange}
            />
         </View>
        <Button onPress={this.save} title="Save" />
        <Button onPress={this.clear} title="Clear" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center'
  }
});
