import React, { Component } from 'react';
import { ActivityIndicator, View, StyleSheet, FlatList } from 'react-native';
import { Icon, SearchBar, ListItem, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';

import { fetchNearbyLockers } from '../store/actions/map';
import { fetchAddresses, cleanFetchAddress } from '../store/actions/address';

const latitudeDelta = 0.0922;
const longitudeDelta = 0.0421;

const styles = StyleSheet.create({
  currentPositionButton: {
    width: 40, 
    height: 35,
    backgroundColor: 'white'
  }, 
  currentPosition: {
    position: 'absolute',
    zIndex: 100,
    bottom: 20,
    padding: 5,
    alignSelf: 'flex-end'
  },  
  searchBarView: {
    marginTop: 50,
    position: 'absolute',
    zIndex: 100,
    width: '100%'
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    marginBottom: 0,
    padding: 0
  },
  searchBarInput: {
    backgroundColor: 'white'
  }
});

class MapPage extends Component {

  state = {
    mapLoaded: false,
    searchBarText: '',
    searchBarLoading: false
  }

  constructor(props) {
    super(props);
    this.timeout = null;
    this.renderRegion = true;
  }

  componentDidMount() {
    this.onCurrentPosition(({ coords }) => {
      const { latitude, longitude } = coords;
      this.setState({ position: { latitude, longitude }, mapLoaded: true });
    });
  }

  onCurrentPositionPress() {
    this.onCurrentPosition(({ coords }) => {
      this.renderRegion = true;
      const { latitude, longitude } = coords;
      this.setState({ position: { latitude, longitude }, searchBarText: '' });
    });
  }

  onCurrentPosition(cb) {
    navigator.geolocation.getCurrentPosition(
      cb,
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  onRenderRegion() {
    return this.renderRegion ? { latitudeDelta, longitudeDelta, ...this.state.position } : {};
  }

  onMarkerPress(id) {
    this.props.navigation.navigate('Lockers', { id });
  }

  onRenderAddressItemPress(geometry) {
    this.renderRegion = true;
    this.props.cleanFetchAddress();
    this.setState({ position: { latitude: geometry.lat, longitude: geometry.lng } });
  }

  fetchLockersOnChange({ latitude, longitude }) {
    this.renderRegion = false;
    this.props.fetchNearbyLockers(longitude, latitude);
  }

  fetchAddresses(searchBarText) {
    if (!searchBarText) {
      this.props.cleanFetchAddress();
      this.setState({ searchBarText: '', searchBarLoading: false });
      return;
    }

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(async () => {
      await this.props.fetchAddresses(searchBarText);
      this.setState({ searchBarLoading: false });
    }, 1500);

    this.setState({ searchBarText, searchBarLoading: true });
  }

  renderAddressItem({ item }) {
    const { address, geometry } = item;
    return (
      <ListItem
         activeOpacity={1}
         bottomDivider
         onPress={() => { this.onRenderAddressItemPress(geometry); }}>
         <ListItem.Content style={{ opacity: 1 }}>
           <ListItem.Subtitle>{address}</ListItem.Subtitle>
         </ListItem.Content>
      </ListItem>
    );
  }

  renderAddresses() {
    const { address } = this.props;
    if (!address) return null;
    
    const { addresses } = address;
    if (!addresses || !addresses.length) return null;

    return (
      <FlatList 
        style={{ height: 150 }}
        keyExtractor={(item, index) => index}
        data={addresses}
        renderItem={this.renderAddressItem.bind(this)}
      />
    )
  }

  renderLockers() {
    const { map } = this.props;
    if (!map || !map.lockers) return null;

    return map.lockers.map(({ _id, long, lat }) => (
      <MapView.Marker
        key={_id}
        coordinate={{
          latitude: lat,
          longitude: long,
          latitudeDelta,
          longitudeDelta
        }}
        onPress={() => this.onMarkerPress(_id)}
      >
        <Icon size={30} name='lock' />
      </MapView.Marker>
    ));
  }

  render() {
    const { position, mapLoaded } = this.state;
    if (!mapLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size='large' />
        </View>
      );
    }

    return (
      <>
        <View style={styles.searchBarView}> 
          <SearchBar
            placeholder="Insira um endereço..."
            round
            showLoading={this.state.searchBarLoading}
            containerStyle={styles.searchBarContainer}
            inputStyle={styles.searchBarInput}
            inputContainerStyle={styles.searchBarInput}
            value={this.state.searchBarText}
            onChangeText={(searchBarText) => this.fetchAddresses(searchBarText)}
            onClear={() => this.props.cleanFetchAddress()}
          />
          {this.renderAddresses()}
        </View>
        <View style={styles.currentPosition}>
          <Button
            icon={<Icon name="my-location" />} 
            buttonStyle={styles.currentPositionButton} 
            onPress={() => this.onCurrentPositionPress() } />
        </View>
        <MapView
          style={{ flex: 1 }}
          region={this.onRenderRegion()}
          onRegionChangeComplete={(position) => this.fetchLockersOnChange(position)}
          initialRegion={{
            latitude: position.latitude,
            longitude: position.longitude,
            latitudeDelta,
            longitudeDelta,
          }}
        >
          <MapView.Marker
            coordinate={{
              latitude: position.latitude,
              longitude: position.longitude,
              latitudeDelta,
              longitudeDelta
            }}
          >
            <Icon size={40} name='person-pin-circle' />
          </MapView.Marker>
          {this.renderLockers()}
        </MapView>
      </>
    );
  }
}

const mapStateToProps = (props) => {
  return props;
}

export default connect(mapStateToProps, { fetchNearbyLockers, fetchAddresses, cleanFetchAddress })(MapPage);