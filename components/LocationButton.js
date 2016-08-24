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
      <TouchableHighlight onPress={this.props.onPress} style={styles.highlight}>
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
    padding: 12,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#AED581',
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  text: {
    flex: 9,
    color: '#fff',
    fontWeight: 'bold'
  },
  caret: {
    textAlign: 'right',
    fontSize: 10,
    color: '#7CB342'
  },
  highlight: {
    borderRadius: 18
  }
});

export default LocationButton;
