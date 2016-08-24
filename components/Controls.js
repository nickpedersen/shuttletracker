import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  StatusBar,
  Image
} from 'react-native';
import LocationButton from './LocationButton';
import SwitchButton from './SwitchButton';

class Controls extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
         backgroundColor="#7CB342"
         barStyle="light-content"
        />
        <View style={styles.row}>
          <View style={styles.button}>
            <LocationButton text={this.props.selectedOrigin} onPress={this.props.showOriginsPopover} />
          </View>
          <Image style={styles.arrow} source={require('../img/arrow.png')} />
          <View style={styles.button}>
            <LocationButton text={this.props.selectedDestination} onPress={this.props.showDestinationsPopover} />
          </View>
          <View style={styles.switchButton}>
            <SwitchButton text={"&#x021C6;"} onPress={this.props.switchOriginAndDestination} isVisible={this.props.selectedOrigin !== 'All' || this.props.selectedDestination !== 'All'} />
          </View>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#8BC34A',
    padding: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.4,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0
    },
    zIndex: 100
  },
  row: {
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  header: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10
  },
  button: {
    flex: 2,
    paddingRight: 10
  },
  arrow: {
    width: 18,
    height: 18,
    marginTop: 10,
    marginRight: 10
  }
});

export default Controls;
