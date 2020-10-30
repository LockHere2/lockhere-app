
async function fieldTest({ errorElementId, errorMessage, finalErrorMessage='', inputElementId, inputValue }) {
    await expect(element(by.id(errorElementId))).toHaveText(errorMessage);
    await element(by.id(inputElementId)).typeText(inputValue + '\n');
    await element(by.id('confirm_signup_button')).tap();
    if (finalErrorMessage) await expect(element(by.id(errorElementId))).toHaveText(finalErrorMessage);
}

describe('SignupScreen', () => {
    it('should go to signup', async () => {
        await element(by.id('signup_button')).tap();
    });

    it('should validate all fields', async () => {
        await element(by.id('scroll_view')).scroll(50, 'down');
        await element(by.id('confirm_signup_button')).tap();
    });

    it('should put valid name', async () => {
        await element(by.id('scroll_view')).scrollTo('top');
        await expect(element(by.id('signup_name_error'))).toHaveText('Nome inválido');
        await element(by.id('signup_name_input')).typeText('Mateus\n');
        await element(by.id('scroll_view')).scroll(50, 'down');
        await element(by.id('confirm_signup_button')).tap();
        await expect(element(by.id('signup_name_error'))).toHaveText('');
    });

    it('should put valid email', async () => {
        await fieldTest({ 
            errorElementId: 'signup_email_error', 
            errorMessage: 'Email inválido',
            inputElementId: 'signup_email_input',
            inputValue: 'mateusspadacio@gmail.com'
        });
    });

    it('should put valid cpf', async () => {
        await fieldTest({ 
            errorElementId: 'signup_cpf_error', 
            errorMessage: 'Cpf inválido',
            inputElementId: 'signup_cpf_input',
            inputValue: '12345678911'
        });
    });

    it('should put valid date', async () => {
        await element(by.id('signup_date_input')).clearText();
        await fieldTest({ 
            errorElementId: 'signup_date_error', 
            errorMessage: 'Data de nascimento inválida',
            inputElementId: 'signup_date_input',
            inputValue: '10/11/2001'
        });
    });

    it('should put valid password', async () => {
        await fieldTest({ 
            errorElementId: 'signup_password_error', 
            errorMessage: 'A senha deve ter entre 6 a 15 caracteres',
            inputElementId: 'signup_password_input',
            inputValue: '123456'
        });
    });

    it('should put invalid confirm password', async () => {
        await fieldTest({ 
            errorElementId: 'signup_confirm_password_error', 
            errorMessage: 'As senhas não condizem',
            inputElementId: 'signup_confirm_password_input',
            inputValue: '1234567',
            finalErrorMessage: 'As senhas não condizem',
        });
    });

    it('should put valid confirm password', async () => {
        await element(by.id('signup_confirm_password_input')).clearText();
        await fieldTest({ 
            errorElementId: 'signup_confirm_password_error', 
            errorMessage: 'As senhas não condizem',
            inputElementId: 'signup_confirm_password_input',
            inputValue: '123456'
        });
    });
    
});