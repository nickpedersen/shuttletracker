import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

class LocationButton extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.container}>
          <Text style={styles.text}>{this.props.text}</Text>
          <Text style={styles.caret}>&#9660;</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 3,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    flex: 9
  },
  caret: {
    flex: 1,
    textAlign: 'right',
    fontSize: 10,
    color: '#bbb'
  }
});

export default LocationButton;
