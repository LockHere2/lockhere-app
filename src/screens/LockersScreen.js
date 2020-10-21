import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Text } from 'react-native-elements';

import { fetchLockersByGroupId, handleReservation } from '../store/actions/locker';

import { Bottom } from '../components/PositionComponent';
import LoadingComponent from '../components/LoadingComponent';
import SimpleListComponent from '../components/SimpleListComponent';
import Button from '../components/ButtonComponent';

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
    marginTop: 5,
    fontSize: 16,
    fontWeight: '700'
  },
  lockerButtonView: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  text: {
    marginLeft: 5,
    marginTop: 5
  },
  textCenter: {
    textAlign: 'center'
  },
  button: {
    width: 170
  }
});

class LockersScreen extends Component {

  state = {
    selectedLocker: 0
  }

  componentDidMount() {
    this.props.fetchLockersByGroupId(this.props.route.params.id);
  }

  getSelectedLocker() {
    const { lockers } = this.props.locker.lockerGroup;
    const { selectedLocker } = this.state;
    return lockers.find(({ number }) => number === selectedLocker);
  }

  onOpenLocker() {
    const locker = this.getSelectedLocker();
    this.props.handleReservation(locker);
    this.props.navigation.navigate('OpenLockerScreen', { action: 'open' });
  }

  onScheduleLocker() {
    const locker = this.getSelectedLocker();
    this.props.handleReservation(locker);
    this.props.navigation.navigate('ScheduleLocker');
  }

  renderSelectedLocker() {
    const locker = this.getSelectedLocker();

    if (!locker) return null;

    const { size, hour_price } = locker;
    const data = [
      { text: 'Tamanho do armário', value: size },
      { text: 'Valor por hora', value: hour_price, valueType: 'currency' }
    ];

    return (
      <View>
        <Text style={{ ...styles.lockerTitle }}>Resumo</Text>
        <SimpleListComponent data={data} />
      </View>
    );
  }

  renderLockers() {
    const { lockers } = this.props.locker.lockerGroup;
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
    const { address } = this.props.locker.lockerGroup;
    return <Text h4 style={styles.address}>{`${address.street}, ${address.number}`}</Text>;
  }

  render() {
    const { loading } = this.props.locker;
    if (loading) {
      return <LoadingComponent />
    }

    const disabled = !this.state.selectedLocker;

    return (
      <>
        <ScrollView style={styles.container}>
          {this.renderAddress()}
          <Text style={styles.lockerTitle}>Armários disponíveis</Text>
          <View style={styles.lockerButtonView}>
            {this.renderLockers()}
          </View>
          {this.renderSelectedLocker()}
        </ScrollView>
        {}
        <Bottom style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Button 
            shadow 
            disabled={disabled}
            onPress={() => this.onScheduleLocker()} 
            buttonStyle={styles.button} title='Reservar' />
          <Button 
            shadow 
            disabled={disabled}
            buttonStyle={styles.button} 
            title='Abrir locker' />
        </Bottom>
      </>
    );
  }

}

const mapStateToProps = (props) => {
  return props;
}

export default connect(mapStateToProps, { fetchLockersByGroupId, handleReservation })(LockersScreen);
