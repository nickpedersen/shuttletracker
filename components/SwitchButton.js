import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

class SwitchButton extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    if(!this.props.isVisible) {
      return null;
    }
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.container}>
          <Text style={styles.text}>{this.props.text}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#F33B5F',
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    flex: 1
  }
});

export default SwitchButton;
