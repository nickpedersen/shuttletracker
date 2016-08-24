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
  scrollToTop = () => {
    if(this.refs._listView) {
      this.refs._listView.scrollTo({y: 0});
    }
  }
  render() {
    if(!this.props.data.length) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>There are no shuttles in the next 24 hours.</Text>
        </View>
      )
    }
    return (
      <ListView
        ref="_listView"
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <TimesListItem data={rowData}/>}
      />
    );
  }
}

var styles = StyleSheet.create({
  container: {
    padding: 20
  },
  text: {
    color: '#333',
    textAlign: 'center',
    fontStyle: 'italic'
  }
});

export default TimesList;
