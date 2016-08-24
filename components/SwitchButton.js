import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  Image
} from 'react-native';

class SwitchButton extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress} style={styles.highlight}>
        <View style={styles.container}>
          <Image style={this.props.isVisible ? styles.text : styles.inactiveText} source={require('../img/reverse.png')} />
        </View>
      </TouchableHighlight>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#7CB342',
    borderRadius: 18,
    alignItems: 'center'
  },
  text: {
    width: 18,
    height: 18
  },
  inactiveText: {
    tintColor: '#9CCC65',
    width: 18,
    height: 18
  },
  highlight: {
    borderRadius: 18
  }
});

export default SwitchButton;
