import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { TextInputMask } from 'react-native-masked-text';
import * as Yup from "yup";

import { signup, sendConfirmCode } from '../store/actions/user';
import PopupComponent from '../components/PopupComponent';
import Button from '../components/ButtonComponent';
import Input from '../components/InputComponent';
import Form from '../components/FormComponent';
import OAuth from '../model/OAuth';
import { name, cpf, born, password, email } from '../validators/UserConstraints';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'white'
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 10,
    marginBottom: 50
  }
});

const userSchema = Yup.object().shape({ name, email, cpf, born, password, repassword: password });

class SignupScreen extends Component {

  state = {
    isVisible: false,
    isLoading: false
  };

  async onSubmit(values) {
    this.setState({ isLoading: true });
    const { signup, sendConfirmCode } = this.props;
    const { name, email, password, repassword, cpf, born } = values;

    await signup({ name, email, password, repassword, cpf, born });

    const { user } = this.props;

    if (user && !user.errors) {
      OAuth.token = user.token;
      await sendConfirmCode('active_email');
      this.setState({ isLoading: false });
      this.props.navigation.navigate('ConfirmCodeScreen', { value: email, mode: 'email' });
      return;
    }

    const { errors } = user;
    if (errors && errors.signup && errors.signup.message) {
      this.setState({ isVisible: true });
    }

    this.setState({ isLoading: false });
  }

  popupErroMessage() {
    const { isVisible } = this.state;
    if (!isVisible) return null;

    return (<PopupComponent
      message={this.props.user.errors.signup.message}
      isVisible={isVisible}
      onBackdropPress={() => this.setState({ isVisible: false })}
      onPress={() => this.setState({ isVisible: false })}
    />);
  }

  renderSignupForm(props) {
    const { isLoading } = this.state;
    const { handleSubmit, values, touched, errors } = props;

    return (
      <ScrollView testID='scroll_view' style={styles.container}>
        <Input
          testID="signup_name_input"
          errorProps={{ testID: 'signup_name_error' }}
          errorMessage={touched.name && errors.name}
          placeholder='Insira seu nome'
          label="Nome"
          onBlur={() => props.setFieldTouched('name', true)}
          onChangeText={text => props.setFieldValue('name', text)} />
        <Input
          testID="signup_email_input"
          errorProps={{ testID: 'signup_email_error' }}
          errorMessage={touched.email && errors.email}
          placeholder='email@exemplo.com'
          label="Email"
          onBlur={() => props.setFieldTouched('email', true)}
          onChangeText={text => props.setFieldValue('email', text)} />
        <Input
          testID="signup_cpf_input"
          errorProps={{ testID: 'signup_cpf_error' }}
          errorMessage={touched.cpf && errors.cpf}
          placeholder='Insira seu cpf'
          label="Cpf"
          maxLength={11}
          keyboardType='numeric'
          onBlur={() => props.setFieldTouched('cpf', true)}
          onChangeText={text => props.setFieldValue('cpf', text)} />
        <TextInputMask
          testID="signup_date_input"
          type='datetime'
          customTextInput={Input}
          customTextInputProps={{
            testID: "signup_date_input",
            placeholder: 'Insira sua data de nascimento',
            errorProps: { testID: 'signup_date_error' },
            errorMessage: touched.born && errors.born,
            label: 'Data de nascimento',
          }}
          options={{
            format: 'DD/MM/YYYY'
          }}
          value={values.born}
          onBlur={() => props.setFieldTouched('born', true)}
          onChangeText={text => props.setFieldValue('born', text)}
        />
        <Input
          testID="signup_password_input"
          secureTextEntry
          errorProps={{ testID: 'signup_password_error' }}
          errorMessage={touched.password && errors.password}
          placeholder='Insira a senha'
          label="Senha"
          maxLength={15}
          onBlur={() => props.setFieldTouched('password', true)}
          onChangeText={text => props.setFieldValue('password', text)} />
        <Input
          testID="signup_confirm_password_input"
          secureTextEntry
          errorProps={{ testID: 'signup_confirm_password_error' }}
          errorMessage={touched.repassword && errors.repassword}
          placeholder='Confirme sua senha'
          label="Confirmar senha"
          maxLength={15}
          onBlur={() => props.setFieldTouched('repassword', true)}
          onChangeText={text => props.setFieldValue('repassword', text)} />
        <Button
          testID='confirm_signup_button'
          loading={isLoading}
          buttonStyle={styles.button}
          title="Cadastrar"
          onPress={handleSubmit} />
        {this.popupErroMessage()}
      </ScrollView>
    );
  }

  render() {
    return (
      <Form
        initialValues={{ name: '', email: '', cpf: '', born: '', password: '', repassword: '' }}
        validationSchema={userSchema}
        onSubmit={this.onSubmit.bind(this)}
        formComponent={this.renderSignupForm.bind(this)}
        validate={({ password, repassword }) => {
          const errors = {};
          if (password !== repassword) {
            errors.message = 'Senhas não condizem';
          }

          return errors;
        }}
      />
    )
  }
}

const mapStateToProps = (props) => {
  return props;
}

export default connect(mapStateToProps, { signup, sendConfirmCode })(SignupScreen);