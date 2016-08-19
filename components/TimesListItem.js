import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

class TimesListItem extends Component {
  formatTime(hour, minute) {
    var ampm;
    if(hour > 11) {
      ampm = 'pm';
    }
    else {
      ampm = 'am';
    }
    if(hour > 12) {
      hour -= 12;
    }
    if(minute < 10) {
      return hour + ':0' + minute + ampm;
    }
    else {
      return hour + ':' + minute + ampm;
    }
  }
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{this.props.data.origin}</Text><Text style={styles.titleText}>to {this.props.data.destination}</Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{this.formatTime(this.props.data.hour, this.props.data.minute)}</Text>
          <Text style={styles.subtitleText}>in {this.props.data.minutesTo} min</Text>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    padding: 20,
    borderBottomColor: '#eee',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center'
  },
  timeText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24
  },
  timeContainer: {
    flex: 1
  },
  titleContainer: {
    flex: 2
  },
  titleText: {

  },
  subtitleText: {
    color: '#bbb',
    textAlign: 'center'
  }
});

export default TimesListItem;
