import React, { Component } from 'react';
import { FlatList, StyleSheet, ScrollView, View } from 'react-native';
import { Card, Text, Icon, Button } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import { connect } from 'react-redux';
import moment from 'moment';

import { fetchUserReservations, updateUserReservationStatus, updateReservationPrice, fetchReservationById, fetchLockerById } from '../store/actions/locker';
import { formatBrDateWithTime } from '../utils/DateUtils';

import LoadingComponent from '../components/LoadingComponent';
import ConfirmPopupComponent from '../components/ConfirmPopupComponent';
import ReserveStatusEnum from '../enum/ReserveStatusEnum';
import NumberFormat from '../components/CurrencyNumberFormatComponent';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 24,
    marginBottom: 5
  },
  filterView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  cardTitleView: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

const fields = [
  { label: 'Data de inicio', value: 'start_date' },
  { label: 'Data de termino', value: 'end_date' },
  { label: 'Preço', value: 'price' }
];

class ReserveScreen extends Component {

  state = {
    isVisible: false,
    filter: {
      orderBy: fields[0].value,
      status: ReserveStatusEnum.toArrayDropdown().map(item => item.value)
    }
  }

  componentDidMount() {
    this.props.fetchUserReservations(this.state.filter);
  }

  async onCancelReservation() {
    const { id } = this.state;
    await this.props.updateUserReservationStatus(id, ReserveStatusEnum.CANCELED);
    await this.props.fetchUserReservations(this.state.filter);
    this.setState({ isVisible: false });
  }

  async onFinishReservation(id) {
    await this.props.fetchReservationById(id);
    const { reservation } = this.props.locker;
    await this.props.fetchLockerById(reservation.locker_id);
    const { locker } = this.props.locker;

    reservation.hour_price = locker.hour_price;
    reservation.size = locker.size;
    reservation.end_date = new Date();
    this.props.updateReservationPrice(reservation);

    const data = [
      { text: 'Valor por hora', value: reservation.hour_price, valueType: 'currency' },
      { text: 'Total', value: reservation.price, valueType: 'currency' }
    ];

    this.props.navigation.navigate('ResumePaymentScreen', { title: 'Resumo de uso', data });
  }

  renderFilter() {
    const { filter } = this.state;
    return <View style={styles.filterView}>
      <DropDownPicker
        label='Campo'
        containerStyle={{ width: '45%' }}
        items={fields}
        defaultValue={filter.orderBy}
        onChangeItem={(item) => this.setState({ filter: { ...this.state.filter, orderBy: item.value } })}
        onClose={() => this.props.fetchUserReservations(this.state.filter)} />
      <DropDownPicker
        label='Status'
        multiple
        multipleText='%d status'
        containerStyle={{ width: '45%' }}
        defaultValue={filter.status}
        items={ReserveStatusEnum.toArrayDropdown()}
        onChangeItem={(status) => this.setState({ filter: { ...this.state.filter, status } })}
        onClose={() => this.props.fetchUserReservations(this.state.filter)} />
    </View>

  }

  renderCancelPopup() {
    const { isVisible } = this.state;
    return <ConfirmPopupComponent
      isVisible={isVisible}
      message='Você realmente quer cancelar esta reserva? Você será reembolsado.'
      okButton={{ title: 'Confirmar', style: { backgroundColor: 'blue' }, onPress: () => { this.onCancelReservation() } }}
      cancelButton={{ title: 'Cancelar', style: { backgroundColor: 'red' }, onPress: () => { this.setState({ isVisible: false }); } }} />;
  }

  renderReservationItem({ item }) {
    const { id, locker, start_date, end_date, status, price } = item;
    const { locker_group, number } = locker;
    const { address } = locker_group;
    const { street } = address;

    let openButton = null;
    let finishButton = null;
    let cancelButton = null;
    if (status === ReserveStatusEnum.SCHEDULED && moment().diff(start_date, 'milliseconds') < 0) {
      cancelButton = <Button
        onPress={() => this.setState({ isVisible: true, id })}
        buttonStyle={{ backgroundColor: 'red' }}
        title='Cancelar' />;
    }

    if (status === ReserveStatusEnum.SCHEDULED && moment().diff(start_date, 'milliseconds') > 0) {
      openButton = <Button
        onPress={() => this.props.navigation.navigate('OpenScheduledLocker', { action: 'open', id })}
        buttonStyle={{ marginBottom: 10 }}
        title='Abrir armário' />;
    }

    if (status === ReserveStatusEnum.INUSE) {
      finishButton = <Button
        buttonStyle={{ marginBottom: 10 }}
        title='Finalizar'
        onPress={() => this.onFinishReservation(id)} />;
    }

    return (
      <Card>
        <View style={styles.cardTitleView}>
          <Icon name='date-range' />
          <Card.Title>{formatBrDateWithTime(start_date)}</Card.Title>
        </View>
        <Card.Divider />
        <Text>Endereço: {street}</Text>
        <Text>Armário: {number}</Text>
        <NumberFormat value={price} />
        {finishButton}
        {openButton}
        {cancelButton}
      </Card>
    );
  }

  render() {
    const { loading, reservations } = this.props.locker;
    if (loading) {
      return <LoadingComponent />
    }

    return (
      <ScrollView style={styles.view}>
        {this.renderFilter()}
        {this.renderCancelPopup()}
        <FlatList
          data={reservations}
          renderItem={this.renderReservationItem.bind(this)}
          keyExtractor={item => item.id}
        />
      </ScrollView>
    )
  }
}

const mapStateToProps = ({ locker }) => {
  return { locker };
}

export default connect(mapStateToProps, { fetchUserReservations, updateUserReservationStatus, updateReservationPrice, fetchReservationById, fetchLockerById })(ReserveScreen);