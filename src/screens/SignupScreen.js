import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Input } from 'react-native-elements';
import { TextInputMask } from 'react-native-masked-text';

import { signup } from '../store/actions/user';
import PopupComponent from '../components/PopupComponent';
import Button from '../components/ButtonComponent';
import OAuth from '../model/OAuth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'white'
  },
  label: {
    color: 'black'
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 10,
    marginBottom: 50
  },
  error: {
    fontSize: 15,
    marginBottom: 10
  }
});

class SignupScreen extends Component {

  state = {
    isVisible: false,
    born: ''
  };

  async onSubmit() {
    const { signup } = this.props;
    const { name, email, password, repassword, cpf, born } = this.state;

    await signup({ name, email, password, repassword, cpf, born });

    const { user } = this.props;

    if (user && !user.errors) {
      OAuth.token = user.token;
      this.props.navigation.navigate('Home');
      return;
    }

    const { errors } = user;
    if (errors && errors.signup && errors.signup.message) {
      this.setState({ isVisible: true });
    }
  }

  errorMessage(field) {
    const { errors } = this.props.user;
    if (!errors) return '';
    if (!errors.signup) return '';

    return errors.signup[field] || '';
  }

  popupErroMessage() {
    return (<PopupComponent
      message={this.errorMessage('message')}
      isVisible={this.state.isVisible}
      onBackdropPress={() => this.setState({ isVisible: false })}
      onPress={() => this.setState({ isVisible: false })}
    />);
  }

  render() {
    return (
      <ScrollView testID='scroll_view' style={styles.container}>
        <Input
          testID="signup_name_input"
          errorProps={{ testID: 'signup_name_error' }}
          errorMessage={this.errorMessage('name')}
          errorStyle={styles.error}
          placeholder='Insira seu nome'
          label="Nome"
          labelStyle={styles.label}
          onChangeText={(name) => this.setState({ name })} />
        <Input
          testID="signup_email_input"
          errorProps={{ testID: 'signup_email_error' }}
          errorMessage={this.errorMessage('email')}
          errorStyle={styles.error}
          placeholder='email@exemplo.com'
          label="Email"
          labelStyle={styles.label}
          onChangeText={(email) => this.setState({ email })} />
        <Input
          testID="signup_cpf_input"
          errorProps={{ testID: 'signup_cpf_error' }}
          errorMessage={this.errorMessage('cpf')}
          errorStyle={styles.error}
          placeholder='Insira seu cpf'
          label="Cpf"
          maxLength={11}
          keyboardType='numeric'
          labelStyle={styles.label}
          onChangeText={(cpf) => this.setState({ cpf })} />
        <TextInputMask
          testID="signup_date_input"
          type={'datetime'}
          customTextInput={Input}
          customTextInputProps={{
            testID: "signup_date_input",
            placeholder: 'Insira sua data de nascimento',
            errorProps: { testID: 'signup_date_error' },
            errorMessage: this.errorMessage('born'),
            errorStyle: styles.error,
            label: 'Data de nascimento', 
            labelStyle: styles.label 
          }}
          options={{
            format: 'DD/MM/YYYY'
          }}
          value={this.state.born}
          onChangeText={born => { console.log(born); this.setState({ born }); }}
        />
        <Input
          testID="signup_password_input"
          secureTextEntry
          errorProps={{ testID: 'signup_password_error' }}
          errorMessage={this.errorMessage('password')}
          errorStyle={styles.error}
          placeholder='Insira a senha'
          label="Senha"
          labelStyle={styles.label}
          maxLength={15}
          onChangeText={(password) => this.setState({ password })} />
        <Input
          testID="signup_confirm_password_input"
          secureTextEntry
          errorProps={{ testID: 'signup_confirm_password_error' }}
          errorMessage={this.errorMessage('repassword')}
          errorStyle={styles.error}
          placeholder='Confirme sua senha'
          label="Confirmar senha"
          labelStyle={styles.label}
          maxLength={15}
          onChangeText={(repassword) => this.setState({ repassword })} />
        <Button
          testID='confirm_signup_button'
          buttonStyle={styles.button}
          title="Cadastrar"
          onPress={() => { this.onSubmit() }} />
        {this.popupErroMessage()}
      </ScrollView>
    )
  }
}

const mapStateToProps = (props) => {
  return props;
}

export default connect(mapStateToProps, { signup })(SignupScreen);