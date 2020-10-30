import React, { Component } from 'react';
import { FlatList, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Card, Text, Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import { fetchUserReservations } from '../store/actions/locker';

import LoadingComponent from '../components/LoadingComponent';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingTop: 30
  }
});

class ReserveScreen extends Component {

  componentDidMount() {
    this.props.fetchUserReservations();
  }

  renderReservationItem({ item }) {
    const { id, locker, start_date } = item;
    const { locker_group, number } = locker;
    const { address } = locker_group;
    const { street } = address;
    return (
      <TouchableWithoutFeedback onPress={() => console.log('clicicicici ', id)}>
        <Card>
          <Card.Title>{start_date}</Card.Title>
          <Card.Divider />
          <Text>{street}</Text>
          <Text>Armário {number}</Text>
        </Card>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    const { loading, reservations } = this.props.locker;
    if (loading) {
      return <LoadingComponent />
    }

    return (
      <ScrollView style={styles.view}>
        <FlatList
          data={reservations}
          renderItem={this.renderReservationItem}
          keyExtractor={item => item.id}
          
        />
      </ScrollView>
    )
  }
}

const mapStateToProps = ({ locker }) => {
  return { locker };
}

export default connect(mapStateToProps, { fetchUserReservations })(ReserveScreen);