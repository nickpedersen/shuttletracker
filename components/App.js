import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import shuttleTimes from '../shuttleTimes.json';
import Controls from './Controls';
import TimesList from './TimesList';
import DropdownList from './DropdownList';
import moment from 'moment';

class App extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      data: [],
      origins: [],
      destinations: [],
      selectedOrigin: "",
      selectedDestination: "",
      isOriginsVisible: false,
      isDestinationsVisible: false
    }
  }
  componentDidMount() {
    this.setState({
      data: this.recalculateListings('All', 'All'),
      origins: ['All', ...new Set(shuttleTimes.map(item => item.origin))],
      destinations: ['All', ...new Set(shuttleTimes.map(item => item.destination))],
      selectedOrigin: 'All',
      selectedDestination: 'All'
    });
  }
  recalculateListings(origin, destination) {
    var currentDate = moment();
    var data = shuttleTimes
      .filter(item => (item.origin === origin || origin === 'All') && (item.destination === destination || destination === 'All')) //Filter origin and destinations
      .map(item => {
        var nextTimestamp = moment(currentDate);
        nextTimestamp.hour(item.hour).minute(item.minute).second(0).millisecond(0);
        //if time already passed, set tomorrow
        if(nextTimestamp < currentDate) {
          nextTimestamp.add(1, 'days');
        }
        if(((nextTimestamp.day() === 0 || nextTimestamp.day() === 6) && item.weekends === 'FALSE') || (nextTimestamp.day() === 7 && item.mondayThursdayOnly === 'TRUE')) {
          //Next shuttle is not until the following Monday
          while(nextTimestamp.day() !== 1) {
            nextTimestamp.add(1, 'days');
          }
        }
        item.nextTimestamp = nextTimestamp;
        item.minutesTo = Math.round(moment.duration(item.nextTimestamp.diff(currentDate)).asMinutes());
        return item;
      }) //Attach next timestamp
      .filter(item => (item.nextTimestamp < moment(item.endDate) && item.nextTimestamp > moment(item.startDate) && item.nextTimestamp < moment().add(1, 'days')))//Filter outside date range and not within next 24h
      .sort((a,b) => a.nextTimestamp - b.nextTimestamp) //Sort by next arrival
      return data;
  }
  calculateDestinations(origin) {
    if(origin === "All") {
      return ['All', ...new Set(shuttleTimes.map(item => item.destination))];
    }
    var destinations = [...new Set(shuttleTimes.filter(item => item.origin === origin).map(item => item.destination))];
    if(destinations.length !== 1) {
      destinations = ['All', ...destinations];
    }
    return destinations;
  }
  selectOrigin = (origin) => {
    var destinations = this.calculateDestinations(origin);
    var selectedDestination = destinations[0];
    //Check if the currently selected destination is still available
    if(destinations.find(item => item === this.state.selectedDestination)) {
      selectedDestination = this.state.selectedDestination;
    }
    var data = this.recalculateListings(origin, selectedDestination);
    this.setState({
      data: data,
      destinations: destinations,
      selectedOrigin: origin,
      selectedDestination: selectedDestination,
      isOriginsVisible: false,
      isDestinationsVisible: false
    });
  }
  selectDestination = (destination) => {
    var data = this.recalculateListings(this.state.selectedOrigin, destination);
    this.setState({
      data: data,
      selectedDestination: destination,
      isOriginsVisible: false,
      isDestinationsVisible: false
    });
  }
  switchOriginAndDestination = () => {
    var destinations = this.calculateDestinations(this.state.selectedDestination);
    var data = this.recalculateListings(this.state.selectedDestination, this.state.selectedOrigin);
    this.setState({
      data: data,
      destinations: destinations,
      selectedOrigin: this.state.selectedDestination,
      selectedDestination: this.state.selectedOrigin,
    });
  }
  showOriginsPopover = () => {
    this.setState({
      isOriginsVisible: true,
      isDestinationsVisible: false
    });
  }
  closeOriginsPopover = () => {
    this.setState({
      isOriginsVisible: false
    });
  }
  showDestinationsPopover = () => {
    this.setState({
      isOriginsVisible: false,
      isDestinationsVisible: true
    });
  }
  closeDestinationsPopover = () => {
    this.setState({
      isDestinationsVisible: false
    });
  }
  closePopovers = () => {
    this.setState({
      isOriginsVisible: false,
      isDestinationsVisible: false
    });
  }
  render() {
    return (
      <View style={styles.container} onPress={this.closePopovers}>
        <Controls showOriginsPopover={this.showOriginsPopover} showDestinationsPopover={this.showDestinationsPopover} selectedOrigin={this.state.selectedOrigin} selectedDestination={this.state.selectedDestination} switchOriginAndDestination={this.switchOriginAndDestination} />
        <View style={styles.list}>
          <TimesList data={this.state.data} />
        </View>
        <DropdownList data={this.state.origins} isVisible={this.state.isOriginsVisible} selectItem={this.selectOrigin} topOffset={77}/>
        <DropdownList data={this.state.destinations} isVisible={this.state.isDestinationsVisible} selectItem={this.selectDestination} topOffset={124}/>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  },
  label: {

  },
  button: {

  },
  list: {
    flex: 1
  }
});

export default App;
