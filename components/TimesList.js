import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import TimesListItem from './TimesListItem';

class TimesList extends Component {
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
    if(!this.props.data.length) {
      return null;
    }
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <TimesListItem data={rowData}/>}
      />
    );
  }
}

var styles = StyleSheet.create({
  container: {

  }
});

export default TimesList;
