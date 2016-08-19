import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import ListPopover from './ListPopover';

class SelectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.selected,
      isVisible: false,
    }
  }
  componentWillReceiveProps(props) {
    this.state = {
      item: props.selected
    }
  }
  showPopover = () => {
    this.setState({isVisible: true});
  }
  closePopover = () => {
    this.setState({isVisible: false});
  }
  setItem = (item) => {
    this.props.updateData(item);
    this.setState({item: item});
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.button} onPress={this.showPopover}>
          <Text>{this.props.prefix} {this.state.item}</Text>
        </TouchableHighlight>

        <ListPopover
          list={this.props.data}
          isVisible={this.state.isVisible}
          onClick={this.setItem}
          onClose={this.closePopover}/>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    marginBottom: 10
  },
  button: {
    borderRadius: 4,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#B8C",
  },
});

export default SelectList;
