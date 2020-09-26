import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { connect } from 'react-redux';

import { login } from '../store/actions/user';
import PopupComponent from '../components/PopupComponent';
import OAuth from '../model/OAuth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24
  },
  label: {
    color: 'black'
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 10
  },
  title: {
    alignItems: 'center',
    marginTop: '20%',
    marginBottom: '15%'
  },
  error: {
    fontSize: 15,
    marginBottom: 10
  }
});

class LoginPage extends Component {

  state = {
    email: '',
    password: '',
    isVisible: false
  }

  errorMessage(field) {
    const { errors } = this.props.user;
    if (!errors) return null;
    if (!errors.login) return null;

    return errors.login[field];
  }

  popupErroMessage() {
    return (<PopupComponent
      message={this.errorMessage('message')}
      isVisible={this.state.isVisible}
      onBackdropPress={() => this.setState({ isVisible: false })}
      onPress={() => this.setState({ isVisible: false })}
    />);
  }

  async onLogin() {
    const { login } = this.props;
    const { email, password } = this.state;

    await login({ email, password });
    const { user } = this.props;

    if (user && !user.errors) {
      OAuth.token = user.token;
      this.props.navigation.navigate('Home');
      return;
    }

    const { errors } = user;
    if (errors && errors.login && errors.login.message) {
      this.setState({ isVisible: true });
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.title}>
          <Text h2>LockHere</Text>
          <Text>Busque seu armário inteligente aqui</Text>
        </View>
        <Input
          testID="email_input"
          placeholder='email@exemplo.com'
          label="Email"
          errorMessage={this.errorMessage('email')}
          errorStyle={styles.error}
          labelStyle={styles.label}
          onChangeText={(email) => this.setState({ email })} />
        <Input
          testID="password_input"
          placeholder="******" label="Senha"
          errorMessage={this.errorMessage('password')}
          errorStyle={styles.error}
          labelStyle={styles.label}
          secureTextEntry
          onChangeText={(password) => this.setState({ password })} />
        {this.popupErroMessage()}
        <Text onPress={() => { }} style={{ alignSelf: 'flex-end' }}>Esqueci minha senha</Text>
        <View style={{ marginTop: 15 }}>
          <Button buttonStyle={styles.button} title="Entrar" onPress={() => this.onLogin()} />
          <Text h4 style={{ alignSelf: 'center' }}>OU</Text>
          <Button buttonStyle={styles.button} title="Cadastre-se" onPress={() => this.props.navigation.navigate('Signup')} />
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (props) => {
  return props;
}

export default connect(mapStateToProps, { login })(LoginPage);
