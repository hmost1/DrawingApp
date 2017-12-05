import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Alert, Button, ActivityIndicator, ImageBackground, Image, NavigatorIOS} from 'react-native';
import Sketch from 'react-native-sketch';
var RNFS = require('react-native-fs');


export default class ChickCanvas extends Component {
  static propTypes = {
    imageSrc: PropTypes.string.isRequired
  }

  //stateproperties
  state = {
    strokeColor: "#000000",
    strokeThickness: 7, 
  };

  componentDidMount = () => {
    this.clear(); //otherwise will pull in old squiggles
  } 

  save = () => {
    this.sketch.save().then(({ path }) => {
      this.clear(); //super annoying it reloads the previous sketch state
      this.props.navigator.pop();
    });
  };

  clear = () => {
    this.sketch.clear();
  };
 
  render() {
    const { imageSrc } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Text>Make your chick!</Text>     
        <ImageBackground //major bug, this isn't correctly saving right now, but later on that might work for us since we could want to save them separately.
          resizeMode = "cover"
          style = {{ flex: 1 }}
          source = {{ uri: imageSrc }}>
          <Sketch 
              ref={sketch => {
                this.sketch = sketch;
              }}
              strokeColor={this.state.strokeColor}
              strokeThickness={this.state.strokeThickness}
              onChange={this.onChange}
            />   
         </ImageBackground>

        <Button onPress={this.save} title="Save" />
        <Button onPress={this.clear} title="Clear"
        //TODO: back button to erase the last thing you did 
        />
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
  }, 
  image: {
    backgroundColor: '#ccc',
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  }
});
