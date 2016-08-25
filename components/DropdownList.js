import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated
} from 'react-native';

class Item extends Component {
  render() {
    return (
      <TouchableHighlight onPress={() => this.props.onPress(this.props.data)}  underlayColor="#eee">
        <View style={this.props.isFooter ? styles.itemFooter : styles.item}>
          <Text>{this.props.data}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

class DropdownList extends Component {
  constructor(props) {
     super(props);
     this.state = {
       fadeAnim: new Animated.Value(0),
       isVisible: false
     };
   }
   componentWillReceiveProps(props) {
     this.setState({
       isVisible: true
     })
     if(props.isVisible) {
       Animated.timing(
         this.state.fadeAnim, {
           toValue: 1,
           duration: 100
         }
       ).start(() => {
         this.setState({
           isVisible: true
         })
       });
     }
     else {
       Animated.timing(
         this.state.fadeAnim, {
           toValue: 0,
           duration: 100
         }
       ).start(() => {
         this.setState({
           isVisible: false
         })
       });
     }
   }
  render() {
    if(!this.props.data.length || (!this.state.isVisible)) {
      return null;
    }
    var itemNodes = this.props.data.map((item, index) => {
      return <Item data={item} key={index} onPress={this.props.selectItem} isFooter={index === this.props.data.length - 1}/>
    })
    return (
      <Animated.View style={[styles.overlay, {opacity: this.state.fadeAnim}]}>
        <Animated.View style={[styles.container, {height: this.state.fadeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 45*this.props.data.length]
        })}]}>
          {itemNodes}
        </Animated.View>
        <TouchableWithoutFeedback onPress={this.props.closePopovers}>
          <View style={styles.closePopovers}/>
        </TouchableWithoutFeedback>
      </Animated.View>
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
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 200,
    elevation: 10,
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 3,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
    elevation: 30,
    margin: 10,
    overflow: 'hidden'
  },
  item: {
    padding: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 45,
    justifyContent: 'center'
  },
  itemHeader: {
    padding: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontWeight: 'bold'
  },
  itemFooter: {
    padding: 10,
    height: 45,
    justifyContent: 'center'
  },
  closePopovers: {
    flex: 1
  }
});

export default DropdownList;
