import React, { Component } from 'react';
import { View } from 'react-native';

import MenuComponent from '../components/MenuComponent';

export default class HomePage extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MenuComponent />
      </View>
    )
  }
}
