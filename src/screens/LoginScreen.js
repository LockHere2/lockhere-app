import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import { connect } from 'react-redux';
import * as Yup from "yup";

import { login } from '../store/actions/user';
import PopupComponent from '../components/PopupComponent';
import Button from '../components/ButtonComponent';
import Form from '../components/FormComponent';
import Input from '../components/InputComponent';
import OAuth from '../model/OAuth';
import { email, password } from '../validators/UserConstraints';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24
  },
  title: {
    alignItems: 'center',
    marginTop: '20%',
    marginBottom: '15%'
  }
});

const loginSchema = Yup.object().shape({ email, password });

class LoginScreen extends Component {

  state = {
    isVisible: false
  }

  popupErroMessage() {
    const { isVisible } = this.state;
    if (!isVisible) return null;

    return (<PopupComponent
      message={this.props.user.errors.login.message}
      isVisible={isVisible}
      onBackdropPress={() => this.setState({ isVisible: false })}
      onPress={() => this.setState({ isVisible: false })}
    />);
  }

  async onLogin(values) {
    const { login } = this.props;
    const { email, password } = values;

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

  renderLoginForm(props) {
    const { handleSubmit, touched, errors } = props;

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
          errorProps={{ testID: 'email_error' }}
          errorMessage={touched.email && errors.email}
          onBlur={() => props.setFieldTouched('email', true)}
          onChangeText={text => props.setFieldValue('email', text)} />
        <Input
          testID="password_input"
          placeholder="******" 
          label="Senha"
          errorProps={{ testID: 'password_error' }}
          errorMessage={touched.password && errors.password}
          secureTextEntry
          onBlur={() => props.setFieldTouched('password', true)}
          onChangeText={text => props.setFieldValue('password', text)} />
        {this.popupErroMessage()}
        <Text onPress={() => { }} style={{ alignSelf: 'flex-end' }}>Esqueci minha senha</Text>
        <View style={{ marginTop: 15 }}>
          <Button 
            testID='login_button'
            title="Entrar" 
            onPress={handleSubmit} />
          <Text h4 style={{ alignSelf: 'center' }}>OU</Text>
          <Button 
            testID='signup_button'
            title="Cadastre-se" 
            onPress={() => this.props.navigation.navigate('Signup')} />
        </View>
      </ScrollView>
    );
  }

  render() {
    return (
      <Form
        initialValues={{ email: '', password: ''}}
        validationSchema={loginSchema}
        onSubmit={this.onLogin.bind(this)}
        formComponent={this.renderLoginForm.bind(this)}
      />
    )
  }
}

const mapStateToProps = (props) => {
  return props;
}

export default connect(mapStateToProps, { login })(LoginScreen);
