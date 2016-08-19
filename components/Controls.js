import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import LocationButton from './LocationButton';
import SwitchButton from './SwitchButton';

class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Monash Shuttle Tracker</Text>
        <LocationButton text={'From: ' + this.props.selectedOrigin} onPress={this.props.showOriginsPopover} />
        <LocationButton text={'To: ' + this.props.selectedDestination} onPress={this.props.showDestinationsPopover} />
        <SwitchButton text={'See ' + this.props.selectedDestination + ' to ' + this.props.selectedOrigin} onPress={this.props.switchOriginAndDestination} isVisible={this.props.selectedOrigin !== 'All' || this.props.selectedDestination !== 'All'} />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#253A4B',
    padding: 20,
    paddingTop: 40
  },
  header: {
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 20
  }
});

export default Controls;
