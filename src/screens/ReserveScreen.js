import React, { Component } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { Card, Text, Icon, Button } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import { TabActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import moment from 'moment';

import { fetchLockerById } from '../store/actions/locker';
import { fetchUserReservations, updateUserReservationStatus, updateReservationPrice, fetchReservationById, cleanFetchReservations } from '../store/actions/reserve';
import { refundPaymentPaypal } from '../store/actions/payment';
import { formatBrDateWithTime, getBrTime } from '../utils/DateUtils';

import LoadingComponent from '../components/LoadingComponent';
import ConfirmPopupComponent from '../components/ConfirmPopupComponent';
import ReserveStatusEnum from '../enum/ReserveStatusEnum';
import NumberFormat from '../components/CurrencyNumberFormatComponent';
import LoadingPopup from '../components/LoadingPopupComponent';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 24
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
  },
  cardText: {
    fontSize: 16
  },
  dropDownPicker: {
    width: '45%', 
    height: 40
  }
});

const fields = [
  { label: 'Data de inicio', value: 'start_date' },
  { label: 'Data de termino', value: 'end_date' },
  { label: 'Preço', value: 'price' }
];

class ReserveScreen extends Component {

  constructor(props) {
    super(props);
    this.countReservations = 0;
    this.filter = {
      page: 1,
      orderBy: fields[0].value,
      status: ReserveStatusEnum.toArrayDropdown().map(item => item.value)
    }
  }

  state = {
    isCancelPopupVisible: false,
    isLoadingPopupVisible: false
  }

  componentDidMount() {
    this.onRefetchUserReservations();
  }

  onRefetchUserReservations() {
    this.props.cleanFetchReservations();
    this.onFetchUserReservations();
  }

  async onFetchUserReservations() {
    await this.props.fetchUserReservations(this.filter);
    const { reservations } = this.props.reserve;
    if (reservations.length !== this.countReservations) {
      this.filter.page += 1;
      this.countReservations = reservations.length;
    }
  }

  async onCancelReservation() {
    const { id } = this.state;
    this.setState({ isCancelPopupVisible: false, isLoadingPopupVisible: true });
    await this.props.updateUserReservationStatus(id, ReserveStatusEnum.CANCELED);
    await this.props.refundPaymentPaypal(id);
    this.setState({ isLoadingPopupVisible: false });
    this.props.navigation.dispatch(TabActions.jumpTo('Home'));
  }

  async onFinishReservation(id) {
    await this.props.fetchReservationById(id);
    const { reservation } = this.props.reserve;
    await this.props.fetchLockerById(reservation.locker_id);
    const { locker } = this.props.locker;

    reservation.hour_price = locker.hour_price;
    reservation.size = locker.size;
    reservation.start_date = moment(reservation.start_date);
    reservation.end_date = getBrTime();
    this.props.updateReservationPrice(reservation);

    const data = [
      { text: 'Valor por hora', value: reservation.hour_price, valueType: 'currency' },
      { text: 'Total', value: reservation.price, valueType: 'currency' }
    ];

    this.props.navigation.navigate('ResumePaymentScreen', { title: 'Resumo de uso', data });
  }

  renderFooter() {
    if (!this.props.reserve.loading) return null;
    return <ActivityIndicator size='large' />;
  }
 
  renderFilter() {
    return <View style={styles.filterView}>
      <DropDownPicker
        label='Campo'
        containerStyle={styles.dropDownPicker}
        items={fields}
        defaultValue={this.filter.orderBy}
        onChangeItem={(item) => { this.filter.page = 1; this.filter.orderBy = item.value; this.onRefetchUserReservations(); }} />
      <DropDownPicker
        label='Status'
        multiple
        multipleText='%d status'
        containerStyle={styles.dropDownPicker}
        defaultValue={this.filter.status}
        items={ReserveStatusEnum.toArrayDropdown()}
        onChangeItem={(status) => { this.filter.page = 1; this.filter.status = status; }}
        onClose={() => this.onRefetchUserReservations()} />
    </View>
  }

  renderLoadingPopup() {
    const { isLoadingPopupVisible } = this.state;
    return <LoadingPopup 
      isVisible={isLoadingPopupVisible}
      message='Estamos realizando o cancelamento e o reembolso, por favor aguarde.'
    />
  }

  renderCancelPopup() {
    const { isCancelPopupVisible } = this.state;
    return <ConfirmPopupComponent
      isVisible={isCancelPopupVisible}
      message='Você realmente quer cancelar esta reserva? Você será reembolsado.'
      okButton={{ title: 'Sim', onPress: () => { this.onCancelReservation(); } }}
      cancelButton={{ title: 'Não', style: { backgroundColor: 'red' }, onPress: () => { this.setState({ isCancelPopupVisible: false }); } }} />;
  }

  renderReservationItem({ item }) {
    const { id, locker, start_date, end_date, status, price } = item;
    const { locker_group, number } = locker;
    const { address } = locker_group;
    const { street } = address;

    let openButton = null;
    let finishButton = null;
    let cancelButton = null;
    if (status === ReserveStatusEnum.SCHEDULED && getBrTime().diff(start_date, 'milliseconds') < 0) {
      cancelButton = <Button
        onPress={() => this.setState({ isCancelPopupVisible: true, id })}
        buttonStyle={{ backgroundColor: 'red' }}
        title='Cancelar' />;
    }

    if (status === ReserveStatusEnum.SCHEDULED && 
      getBrTime().diff(start_date, 'milliseconds') > 0 &&
      getBrTime().diff(end_date, 'milliseconds') < 0) {
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
        <Text style={styles.cardText}>Endereço: {street}</Text>
        <Text style={styles.cardText}>Armário: {number}</Text>
        { end_date ? <Text style={styles.cardText}>Termino: {formatBrDateWithTime(end_date)}</Text> : null }
        <NumberFormat textStyle={styles.cardText} value={price} />
        {finishButton}
        {openButton}
        {cancelButton}
      </Card>
    );
  }

  render() {
    const { loading, reservations } = this.props.reserve;

    //if (loading) {
    //  return <LoadingComponent />
    //}
     
    return (
      <View style={styles.view}>
        <View style={{ marginBottom: 50 }}>{this.renderFilter()}</View>
        {this.renderCancelPopup()}
        {this.renderLoadingPopup()}
        <FlatList
          data={reservations}
          renderItem={this.renderReservationItem.bind(this)}
          keyExtractor={item => item.id}
          onEndReached={this.onFetchUserReservations.bind(this)}
          onEndReachedThreshold={0.1}
          ListFooterComponent={this.renderFooter.bind(this)}
        />
      </View>
    )
  }
}

const mapStateToProps = ({ locker, reserve }) => {
  return { locker, reserve };
}

export default connect(mapStateToProps, { 
  fetchUserReservations, 
  updateUserReservationStatus, 
  updateReservationPrice, 
  fetchReservationById, 
  fetchLockerById,
  cleanFetchReservations,
  refundPaymentPaypal
})(ReserveScreen);