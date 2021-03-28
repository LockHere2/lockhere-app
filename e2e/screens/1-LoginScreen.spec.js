describe('LoginScreen', () => {
  beforeEach(async () => {
    // await device.reloadReactNative();
  });

  it('should validate email', async () => {
    await element(by.id('email_input')).typeText('teste@ \n');
    await element(by.id('login_button')).tap();
    await expect(element(by.id('email_error'))).toHaveText('Email inválido');
  });

  it('should validate password', async () => {
    await element(by.id('password_input')).typeText('123 \n');
    await element(by.id('login_button')).tap();
    await expect(element(by.id('password_error'))).toHaveText('A senha deve ter entre 6 a 15 caracteres');
  });

  it('should validate both email and password', async () => {
    await element(by.id('email_input')).clearText();
    await element(by.id('password_input')).clearText();
    await element(by.id('email_input')).typeText('teste@ \n');
    await element(by.id('password_input')).typeText('123 \n');
    await element(by.id('login_button')).tap();
    await expect(element(by.id('email_error'))).toHaveText('Email inválido');
    await expect(element(by.id('password_error'))).toHaveText('A senha deve ter entre 6 a 15 caracteres');
  });

});
