import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Text, Button } from 'react-native-elements';

import { fetchLockersByGroupId } from '../store/actions/locker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24
  },
  address: {
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 30
  },
  lockerButton: {
    width: 80, 
    margin: 5
  },
  lockerTitle: { 
    marginLeft: 5, 
    fontSize: 16, 
    fontWeight: '700' 
  },
  lockerButtonView: { 
    display: 'flex', 
    flexWrap: 'wrap', 
    flexDirection: 'row' 
  }
});

class LockersScreen extends Component {

  state = {
    selectedLocker: 0
  }

  componentDidMount() {
    this.props.fetchLockersByGroupId(this.props.route.params.id);
  }

  renderLockers() {
    const { locker } = this.props;
    if (!locker) return null;

    const { lockerGroup } = locker;
    if (!lockerGroup) return null;

    const { lockers } = lockerGroup;
    const { selectedLocker } = this.state;

    return lockers.map(({ number }, i) => (
      <Button
        key={i}
        titleStyle={{ color: selectedLocker !== number ? 'black' : 'white' }}
        buttonStyle={{ ...styles.lockerButton, backgroundColor: selectedLocker !== number ? '#C4C4C4' : 'black' }}
        title={number.toString()}
        onPress={() => this.setState({ selectedLocker: number })} />
    ));
  }

  renderAddress() {
    const { locker } = this.props;
    if (!locker) return null;

    const { lockerGroup } = locker;
    if (!lockerGroup) return null;

    const { address } = lockerGroup;

    return <Text h4 style={styles.address}>{`${address.street}, ${address.number}`}</Text>;
  }

  render() {
    
    return (
      <ScrollView style={styles.container}>
         {this.renderAddress()}
        <Text style={styles.lockerTitle}>Armários disponíveis</Text>
        <View style={styles.lockerButtonView}>
          {this.renderLockers()}
        </View>
      </ScrollView>
    );
  }

}

const mapStateToProps = (props) => {
    return props;
  }
  
export default connect(mapStateToProps, { fetchLockersByGroupId })(LockersScreen);
