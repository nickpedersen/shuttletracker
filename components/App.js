import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import shuttleTimes from '../shuttleTimes.json';
import Controls from './Controls';
import TimesList from './TimesList';
import DropdownList from './DropdownList';
import moment from 'moment';
import ReactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';

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
    this.setInterval(this.autoCalculateListings, 30000);
    this.setState({
      data: this.recalculateListings('All', 'All'),
      origins: ['All', ...new Set(shuttleTimes.map(item => item.origin))],
      destinations: ['All', ...new Set(shuttleTimes.map(item => item.destination))],
      selectedOrigin: 'All',
      selectedDestination: 'All'
    });
    this.loadInitialState().done();
  }
  async loadInitialState() {
    var origin = await AsyncStorage.getItem('@ShuttleTrackerStore:origin');
    if(origin === null) {
      origin = 'All'
    }
    var destination = await AsyncStorage.getItem('@ShuttleTrackerStore:destination');
    if(destination === null) {
      destination = 'All'
    }
    this.setState({
      data: this.recalculateListings(origin, destination),
      origins: ['All', ...new Set(shuttleTimes.map(item => item.origin))],
      destinations: ['All', ...new Set(shuttleTimes.map(item => item.destination))],
      selectedOrigin: origin,
      selectedDestination: destination
    });
  }
  autoCalculateListings = () => {
    this.setState({data:this.recalculateListings(this.state.selectedOrigin, this.state.selectedDestination)});
  }
  recalculateListings(origin, destination) {
    var currentDate = moment();
    //var currentDate = moment('2016-08-23T13:00:00Z1000');
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
        item.minutesTo = Math.ceil(moment.duration(item.nextTimestamp.diff(currentDate)).asMinutes());
        return item;
      }) //Attach next timestamp
      .filter(item => (item.nextTimestamp < moment(item.endDate) && item.nextTimestamp > moment(item.startDate) && item.nextTimestamp < currentDate.add(1, 'days')))//Filter outside date range and not within next 24h
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
    AsyncStorage.setItem('@ShuttleTrackerStore:origin', origin);
    AsyncStorage.setItem('@ShuttleTrackerStore:destination', selectedDestination);
    this.refs._timesList.scrollToTop();
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
    this.refs._timesList.scrollToTop();
    AsyncStorage.setItem('@ShuttleTrackerStore:destination', destination);
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
    AsyncStorage.setItem('@ShuttleTrackerStore:destination', this.state.selectedOrigin);
    AsyncStorage.setItem('@ShuttleTrackerStore:origin', this.state.selectedDestination);
    this.refs._timesList.scrollToTop();
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
    console.log('closing popovers')
    this.setState({
      isOriginsVisible: false,
      isDestinationsVisible: false
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Controls showOriginsPopover={this.showOriginsPopover} showDestinationsPopover={this.showDestinationsPopover} selectedOrigin={this.state.selectedOrigin} selectedDestination={this.state.selectedDestination} switchOriginAndDestination={this.switchOriginAndDestination} />
        <View style={styles.list}>
          <TimesList data={this.state.data} ref="_timesList" />
        </View>
        <DropdownList data={this.state.origins} isVisible={this.state.isOriginsVisible} selectItem={this.selectOrigin} topOffset={10}  closePopovers={this.closePopovers}/>
        <DropdownList data={this.state.destinations} isVisible={this.state.isDestinationsVisible} selectItem={this.selectDestination} topOffset={10}  closePopovers={this.closePopovers}/>
      </View>
    );
  }
}

ReactMixin(App.prototype, TimerMixin);

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  },
  list: {
    flex: 1
  }
});

export default App;
