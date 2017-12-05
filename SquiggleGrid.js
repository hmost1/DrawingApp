import React, { Component } from 'react';
import PhotoGrid from 'react-native-photo-grid';
import { StyleSheet, Text, View, Alert, Button, ActivityIndicator, Image, TouchableOpacity, NavigatorIOS, TouchableHighlight} from 'react-native';
import PropTypes from 'prop-types';
//import NavigatorNavigationBarStylesIOS from 'NavigatorNavigationBarStylesIOS';

import Sketch from 'react-native-sketch';
import ChickCanvas from './ChickCanvas';
import SquiggleCanvas from './SquiggleCanvas';


var RNFS = require('react-native-fs');
var that; 

//TODO: this page needs much better styling. Cards as the images, etc. would be cute. 
//Then the trash and chick butto at the bottom of each 

export default class SquiggleGrid extends Component {

  constructor() {
    console.log("constructing!!!");
    super();
    this.state = { items: [], a: false };
    that = this;
  }

  //load the files 
  componentDidMount() {
    RNFS.readDir(RNFS.DocumentDirectoryPath).then((results) => {
      let items = Array.apply(null, results.map((v, i) => {
          return { id: i, src: v.path }
        })
      );
      this.setState({ items });
    }).catch((err) => { //TODO: something better with the error
      Alert.alert(err.message);
    });
  }

  _toSquiggleCanvas = () => {
    console.log("HI HI HI HI HI")
    this.props.navigator.push({
      title: 'Squiggle Canvas', 
      component: SquiggleCanvas
    })
  };

  render() {
    //TODO: DRY this down
    if (this.state.items.length == 0 ) {
      return(<View style = {styles.container} ><Text style = {{height: 20}}>Looks like you need to add some squiggles!</Text></View>);
    }
    else {
      return(
        <View style={styles.container}>
          <PhotoGrid
            data = { this.state.items }
            itemsPerRow = { 3 }
            itemMargin = { 1 }
            renderHeader = { this.renderHeader }
            renderItem = { this.renderItem }
          />
        </View>
      );
    }
  } //TODO: need to move to 
  // https://www.npmjs.com/package/react-native-sketch-view

  renderHeader() {
    return(
      <Text style={styles.text}>Click one to make it a chick!</Text>
    );
  }

  renderItem(item, itemSize) {
    return(
      <TouchableOpacity
        key = { item.id }
        style = {{ width: itemSize, height: itemSize }}
        onPress = { () => {
          that.props.navigator.push({
            component: ChickCanvas,
            title: 'Make that Chick!',
            passProps: { imageSrc : item.src}
          });
        }}
        >
        <Image
          resizeMode = "cover"
          style = {{ flex: 1 }}
          source = {{ uri: item.src }}
          //onPress = { () => Alert.alert("heelllp")}
        />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center'
  }, 
  container: {
    paddingTop: 64,  //WRONG: should get the height from navigatorios 
    flex: 1
  }
})