import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  ListView
} from 'react-native';

class Item extends Component {
  render() {
    return (
      <TouchableHighlight onPress={() => this.props.onPress(this.props.data)}>
        <View style={styles.item}>
          <Text>{this.props.data}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

class DropdownList extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(props.data),
    };
  }
  componentWillReceiveProps(props) {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(props.data),
    };
  }
  render() {
    if(!this.props.data.length || !this.props.isVisible) {
      return null;
    }
    return (
      <View style={styles.overlay}>
        <ListView
          style={[styles.container, {top: this.props.topOffset}]}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Item data={rowData} onPress={this.props.selectItem}/>}
          renderFooter={() => <View style={styles.itemFooter} />}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  container: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 77,
    left: 20,
    right: 20,
    backgroundColor: '#ffffff',
    borderRadius: 3,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  item: {
    padding: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  itemHeader: {
    padding: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontWeight: 'bold'
  },
  itemFooter: {
    height: 5
  }
});

export default DropdownList;
