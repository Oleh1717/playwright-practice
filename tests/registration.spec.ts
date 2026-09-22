import { test, expect } from '@playwright/test';
import { HomePage } from '../pom/pages/HomePage';
import { SignUpForm } from '../pom/forms/SignUpForm';
import { GaragePage } from '../pom/pages/GaragePage'; 


let email: string;
let homePage: HomePage;
let signUpForm: SignUpForm;
let garagePage: GaragePage;

function getErrorMessage(message: string) {
  return signUpForm.errorMessageWithP.filter({ hasText: message });
}


test.describe('Sign up verification', () => {

  test.beforeEach(async ({ page }) => {
    email = `testuser_${Date.now()}@example.com`;
    homePage = new HomePage(page);
    signUpForm = new SignUpForm(page);
    garagePage = new GaragePage(page);

    await homePage.navigate();
    await homePage.clickSignUpButton();
  })


  test.describe('Sign up process', () => {
    
    test('Verify possibility to sign up with valid values', async ({ page }) => {
        await signUpForm.signUp('Name', 'LastName', email, '123456Qwerty', '123456Qwerty');
      await expect(page.getByRole('heading', { name: 'Garage' })).toHaveText('Garage');
    })

    test('Verify that user cannot sign up with already registered email', async ({ page }) => {
        await signUpForm.signUp('Name', 'LastName', email, '123456Qwerty', '123456Qwerty');

        await expect(page.getByRole('heading', { name: 'Garage' })).toBeVisible();
        await garagePage.myProfileButton.click();
        await garagePage.clickLogOutButton();
        await homePage.clickSignUpButton();

        await signUpForm.signUp('Name', 'LastName', email, '123456Qwerty', '123456Qwerty');

        await expect(signUpForm.errorMessageUserExists).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Garage' })).not.toBeVisible();
      })
  })

  test.describe('Modal dialog', () => {

    test('Verify that user can close the Registration modal dialog', async ({ page }) => {
      await signUpForm.clickCloseButton();
      await expect(signUpForm.modalDialog).not.toBeVisible();
    })
  })

  
  test.describe('Name field validation', () => {

    test('Verify error message when entering 1 character in the Name field', async ({ page }) => {
      await signUpForm.enterName('N');
      await signUpForm.blurOnField(signUpForm.nameField);

      await expect(signUpForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      await expect(getErrorMessage('Name has to be from 2 to 20 characters long')).toBeVisible();
    })

    test('Verify error message when entering 21 characters in the Name field', async ({ page }) => {
      await signUpForm.enterName('N'.repeat(21));
      await signUpForm.blurOnField(signUpForm.nameField);

      await expect(signUpForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      await expect(getErrorMessage('Name has to be from 2 to 20 characters long')).toBeVisible();
    })

    test('Verify error message when Name field is empty', async ({ page }) => {
      await signUpForm.enterName('');
      await signUpForm.blurOnField(signUpForm.nameField);

      await expect(signUpForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      await expect(getErrorMessage('Name required')).toBeVisible();
    })

    test('Verify the error message when entering invalid value in the Name field', async ({ page }) => {
      await signUpForm.enterName('@#$%99');
      await signUpForm.blurOnField(signUpForm.nameField);

      await expect(signUpForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      await expect(getErrorMessage('Name is invalid')).toBeVisible();
    })

    test('Verify that user can see two error messages when entering one invalid value in the Name field', async ({ page }) => {
      await signUpForm.enterName('#');
      await signUpForm.blurOnField(signUpForm.nameField);

      await expect(signUpForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      await expect(getErrorMessage('Name is invalid')).toBeVisible();
      await expect(getErrorMessage('Name has to be from 2 to 20 characters long')).toBeVisible();
    })

    test('Verify the error messages when entering spaces in the Name field', async ({ page }) => {
      await signUpForm.enterName('   ');
      await signUpForm.blurOnField(signUpForm.nameField);
      
      await expect(signUpForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      await expect(getErrorMessage('Name is invalid')).toBeVisible();
    })

    test('Verify the error messages when entering Cyrillic characters in the Name field', async ({ page }) => {
      await signUpForm.enterName('Петро');
      await signUpForm.blurOnField(signUpForm.nameField);

      await expect(signUpForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      await expect(getErrorMessage('Name is invalid')).toBeVisible();
    })
  })
  
  test.describe('Last Name field validation', () => {
    
    test('Verify error message when entering 1 character in the Last Name field', async ({ page }) => {
      await signUpForm.enterLastName('L');
      await signUpForm.blurOnField(signUpForm.lastNameField);

      await expect(signUpForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      await expect(getErrorMessage('Last Name has to be from 2 to 20 characters long')).toBeVisible();
    })

    test('Verify error message when entering 21 characters in the Last Name field', async ({ page }) => {
      await signUpForm.enterLastName('L'.repeat(21));
      await signUpForm.blurOnField(signUpForm.lastNameField);

      await expect(signUpForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      await expect(getErrorMessage('Last Name has to be from 2 to 20 characters long')).toBeVisible();
    })

    test('Verify error message when Last Name field is empty', async ({ page }) => {
      await signUpForm.enterLastName('');
      await signUpForm.blurOnField(signUpForm.lastNameField);

      await expect(signUpForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      await expect(getErrorMessage('Last name required')).toBeVisible();
    })

    test('Verify the error message when entering invalid value in the Last Name field', async ({ page }) => {
      await signUpForm.enterLastName('@#$%99');
      await signUpForm.blurOnField(signUpForm.lastNameField);

      await expect(signUpForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      await expect(getErrorMessage('Last Name is invalid')).toBeVisible();
    })

    test('Verify that user can see two error messages when entering one invalid value in the Last Name field', async ({ page }) => {
      await signUpForm.enterLastName('#');
      await signUpForm.blurOnField(signUpForm.lastNameField);

      await expect(signUpForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      await expect(getErrorMessage('Last Name is invalid')).toBeVisible();
      await expect(getErrorMessage('Last Name has to be from 2 to 20 characters long')).toBeVisible();
    })

    test('Verify the error messages when entering spaces in the Last Name field', async ({ page }) => {
      await signUpForm.enterLastName('   ');
      await signUpForm.blurOnField(signUpForm.lastNameField);

      await expect(signUpForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      await expect(getErrorMessage('Last Name is invalid')).toBeVisible();
    })

    test('Verify the error messages when entering Cyrillic characters in the Last Name field', async ({ page }) => {
      await signUpForm.enterLastName('Петро');
      await signUpForm.blurOnField(signUpForm.lastNameField);

      await expect(signUpForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      await expect(getErrorMessage('Last Name is invalid')).toBeVisible();
    })
  })

  
  test.describe('Email field validation', () => {

    test('Verify error message when Email field is empty', async ({ page }) => {
      await signUpForm.enterEmail('');
      await signUpForm.blurOnField(signUpForm.emailField);

      await expect(signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      await expect(getErrorMessage('Email required')).toBeVisible();
    })

    for (const [description, invalidEmail] of [
      ['starts with a dot', '.example.com'],
      ['ends with @', 'example@'],
      ['has no dot in the domain', 'usertest@examplecom'],
      ['has no domain', 'usertest@'],
      ['has no local part', '@example.com'],
      ['contains two @ symbols', 'usertest@@example.com'],
    ]) {
      test(`Verify that email is invalid when it ${description}`, async () => {
        await signUpForm.enterEmail(invalidEmail);
        await signUpForm.blurOnField(signUpForm.emailField);

        await expect(signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      await expect(getErrorMessage('Email is incorrect')).toBeVisible();
      });
    }

    test('Verify that email can not contain Cyrillic characters in the Email field', async ({ page }) => {
      await signUpForm.enterEmail('usertest@екзампл.ком');
      await signUpForm.blurOnField(signUpForm.emailField);

      await expect(signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      await expect(getErrorMessage('Email is incorrect')).toBeVisible();
    })

    for (const [description, invalidEmail] of [
      ['contains spaces', 'user test@example.com'],
      ['contains an invalid special character', 'usertest@exam!ple.com'],
      ['contains leading spaces', ' usertest@example.com'],
      ['contains trailing spaces', 'usertest@example.com '],
      ['has a one-character top-level domain', 'usertest@example.c'],
    ]) {
      test(`Verify that email is invalid when it ${description}`, async () => {
        await signUpForm.enterEmail(invalidEmail);
        await signUpForm.blurOnField(signUpForm.emailField);

        await expect(signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      await expect(getErrorMessage('Email is incorrect')).toBeVisible();
      });
    }

  })
  
  
  test.describe('Password field validation', () => {

    test('Verify that error message is displayed when Password field is empty', async ({ page }) => {
      await signUpForm.enterPassword('');
      await signUpForm.blurOnField(signUpForm.passwordField);

      await expect(signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      await expect(getErrorMessage('Password required')).toBeVisible();
    })

    for (const [description, invalidPassword] of [
      ['has fewer than 8 characters', 'Qwerty1'],
      ['has more than 15 characters', 'Qwerty1234567890'],
      ['has no capital letter', 'qwerty123'],
      ['has no lowercase letter', 'QWERTY123'],
      ['has no digit', 'QwertyQwerty'],
    ]) {
      test(`Verify that Password error message is displayed when it ${description}`, async () => {
        await signUpForm.enterPassword(invalidPassword);
        await signUpForm.blurOnField(signUpForm.passwordField);

        await expect(signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      await expect(getErrorMessage('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).toBeVisible();
      });
    }

    test('Verify that Password validation message disappears after entering a valid Password', async ({ page }) => {
      await signUpForm.enterPassword('Qwerty');
      await signUpForm.blurOnField(signUpForm.passwordField);

      await expect(getErrorMessage('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).toBeVisible();

  
      await signUpForm.enterPassword('Qwerty12');
      await signUpForm.blurOnField(signUpForm.passwordField);

      await expect(getErrorMessage('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).not.toBeVisible();
    })

  })

  
  test.describe('Re-enter password field validation', () => {

    test('Verify that error message is displayed when Re-enter password field is empty', async ({ page }) => {
      await signUpForm.enterPassword('Qwerty12');
      await signUpForm.enterRepeatPassword('');
      await signUpForm.blurOnField(signUpForm.repeatPasswordField);

      await expect(signUpForm.repeatPasswordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      await expect(getErrorMessage('Re-enter password required')).toBeVisible();
    })

    test('Verify that error message is displayed when Re-enter password does not match the Password field', async ({ page }) => {
      await signUpForm.enterPassword('Qwerty12');
      await signUpForm.enterRepeatPassword('Qwerty123');
      await signUpForm.blurOnField(signUpForm.repeatPasswordField);

      await expect(signUpForm.repeatPasswordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      await expect(getErrorMessage('Passwords do not match')).toBeVisible();
    })

    test('Verify that Re-enter password validation message disappears after entering a matching password', async ({ page }) => {
      await signUpForm.enterPassword('Qwerty12');
      await signUpForm.enterRepeatPassword('Qwerty123');
      await signUpForm.blurOnField(signUpForm.repeatPasswordField);

      await expect(getErrorMessage('Passwords do not match')).toBeVisible();

      await signUpForm.enterRepeatPassword('Qwerty12');
      await signUpForm.blurOnField(signUpForm.repeatPasswordField);

      await expect(getErrorMessage('Passwords do not match')).not.toBeVisible();
    })
  })

  
  test.describe('Register button state', () => {

    test('Verify that Register button is disabled when all fields are empty', async ({ page }) => {
      await expect(signUpForm.registerButton).toBeDisabled();
    })

    test('Verify that Register button is enabled when all fields are filled with valid values', async ({ page }) => {
      await signUpForm.enterName('Name');
      await signUpForm.blurOnField(signUpForm.nameField);
      await signUpForm.enterLastName('LastName');
      await signUpForm.blurOnField(signUpForm.lastNameField);
      await signUpForm.enterEmail(email);
      await signUpForm.blurOnField(signUpForm.emailField);
      await signUpForm.enterPassword('Qwerty12');
      await signUpForm.blurOnField(signUpForm.passwordField);
      await signUpForm.enterRepeatPassword('Qwerty12');
      await signUpForm.blurOnField(signUpForm.repeatPasswordField);

      await expect(signUpForm.registerButton).toBeEnabled();
    })

    test('Verify that Register button is disabled when the Name field is incorrect', async ({ page }) => {
      await signUpForm.enterName('Петро');
      await signUpForm.blurOnField(signUpForm.nameField);
      await signUpForm.enterLastName('LastName');
      await signUpForm.blurOnField(signUpForm.lastNameField);
      await signUpForm.enterEmail(email);
      await signUpForm.blurOnField(signUpForm.emailField);
      await signUpForm.enterPassword('Qwerty12');
      await signUpForm.blurOnField(signUpForm.passwordField);
      await signUpForm.enterRepeatPassword('Qwerty12');
      await signUpForm.blurOnField(signUpForm.repeatPasswordField);

      await expect(signUpForm.registerButton).toBeDisabled();
    })

    test('Verify that Register button is disabled when the Last Name field is incorrect', async ({ page }) => {
      await signUpForm.enterName('Name');
      await signUpForm.blurOnField(signUpForm.nameField);
      await signUpForm.enterLastName('Петро');
      await signUpForm.blurOnField(signUpForm.lastNameField);
      await signUpForm.enterEmail(email);
      await signUpForm.blurOnField(signUpForm.emailField);
      await signUpForm.enterPassword('Qwerty12');
      await signUpForm.blurOnField(signUpForm.passwordField);
      await signUpForm.enterRepeatPassword('Qwerty12');
      await signUpForm.blurOnField(signUpForm.repeatPasswordField);

      await expect(signUpForm.registerButton).toBeDisabled();
    })

    test('Verify that Register button is disabled when the Email field is incorrect', async ({ page }) => {
      await signUpForm.enterName('Name');
      await signUpForm.blurOnField(signUpForm.nameField);
      await signUpForm.enterLastName('LastName');
      await signUpForm.blurOnField(signUpForm.lastNameField);
      await signUpForm.enterEmail('usertest@екзампл.com');
      await signUpForm.blurOnField(signUpForm.emailField);
      await signUpForm.enterPassword('Qwerty12');
      await signUpForm.blurOnField(signUpForm.passwordField);
      await signUpForm.enterRepeatPassword('Qwerty12');
      await signUpForm.blurOnField(signUpForm.repeatPasswordField);

      await expect(signUpForm.registerButton).toBeDisabled();
    })

    test('Verify that Register button is disabled when the Password field is incorrect', async ({ page }) => {
      await signUpForm.enterName('Name');
      await signUpForm.blurOnField(signUpForm.nameField);
      await signUpForm.enterLastName('LastName');
      await signUpForm.blurOnField(signUpForm.lastNameField);
      await signUpForm.enterEmail(email);
      await signUpForm.blurOnField(signUpForm.emailField);
      await signUpForm.enterPassword('Qwerty');
      await signUpForm.blurOnField(signUpForm.passwordField);
      await signUpForm.enterRepeatPassword('Qwerty');
      await signUpForm.blurOnField(signUpForm.repeatPasswordField);

      await expect(signUpForm.registerButton).toBeDisabled();
    })

    test('Verify that Register button is disabled when the Re-enter password field is incorrect', async ({ page }) => {
      await signUpForm.enterName('Name');
      await signUpForm.blurOnField(signUpForm.nameField);
      await signUpForm.enterLastName('LastName');
      await signUpForm.blurOnField(signUpForm.lastNameField);
      await signUpForm.enterEmail(email);
      await signUpForm.blurOnField(signUpForm.emailField);
      await signUpForm.enterPassword('Qwerty12');
      await signUpForm.blurOnField(signUpForm.passwordField);
      await signUpForm.enterRepeatPassword('Qwerty123');
      await signUpForm.blurOnField(signUpForm.repeatPasswordField);

      await expect(signUpForm.registerButton).toBeDisabled();
    })

    test('Verify that Register button is disabled when the Name field is empty', async ({ page }) => {
      await signUpForm.enterName('');
      await signUpForm.blurOnField(signUpForm.nameField);
      await signUpForm.enterLastName('LastName');
      await signUpForm.blurOnField(signUpForm.lastNameField);
      await signUpForm.enterEmail(email);
      await signUpForm.blurOnField(signUpForm.emailField);
      await signUpForm.enterPassword('Qwerty12');
      await signUpForm.blurOnField(signUpForm.passwordField);
      await signUpForm.enterRepeatPassword('Qwerty12');
      await signUpForm.blurOnField(signUpForm.repeatPasswordField);

      await expect(signUpForm.registerButton).toBeDisabled();
    })
    
    test('Verify that Register button is disabled when the Last Name field is empty', async ({ page }) => {
      await signUpForm.enterName('Name');
      await signUpForm.blurOnField(signUpForm.nameField);
      await signUpForm.enterLastName('');
      await signUpForm.blurOnField(signUpForm.lastNameField);
      await signUpForm.enterEmail(email);
      await signUpForm.blurOnField(signUpForm.emailField);
      await signUpForm.enterPassword('Qwerty12');
      await signUpForm.blurOnField(signUpForm.passwordField);
      await signUpForm.enterRepeatPassword('Qwerty12');
      await signUpForm.blurOnField(signUpForm.repeatPasswordField);

      await expect(signUpForm.registerButton).toBeDisabled();
    })

    test('Verify that Register button is disabled when the Email field is empty', async ({ page }) => {
      await signUpForm.enterName('Name');
      await signUpForm.blurOnField(signUpForm.nameField);
      await signUpForm.enterLastName('LastName');
      await signUpForm.blurOnField(signUpForm.lastNameField);
      await signUpForm.enterEmail('');
      await signUpForm.blurOnField(signUpForm.emailField);
      await signUpForm.enterPassword('Qwerty12');
      await signUpForm.blurOnField(signUpForm.passwordField);
      await signUpForm.enterRepeatPassword('Qwerty12');
      await signUpForm.blurOnField(signUpForm.repeatPasswordField);

      await expect(signUpForm.registerButton).toBeDisabled();
    })

    test('Verify that Register button is disabled when the Password field is empty', async ({ page }) => {
      await signUpForm.enterName('Name');
      await signUpForm.blurOnField(signUpForm.nameField);
      await signUpForm.enterLastName('LastName');
      await signUpForm.blurOnField(signUpForm.lastNameField);
      await signUpForm.enterEmail(email);
      await signUpForm.blurOnField(signUpForm.emailField);
      await signUpForm.enterPassword('');
      await signUpForm.blurOnField(signUpForm.passwordField);
      await signUpForm.enterRepeatPassword('Qwerty12');
      await signUpForm.blurOnField(signUpForm.repeatPasswordField);

      await expect(signUpForm.registerButton).toBeDisabled();
    })

    test('Verify that Register button is disabled when the Re-enter password field is empty', async ({ page }) => {
      await signUpForm.enterName('Name');
      await signUpForm.blurOnField(signUpForm.nameField);
      await signUpForm.enterLastName('LastName');
      await signUpForm.blurOnField(signUpForm.lastNameField);
      await signUpForm.enterEmail(email);
      await signUpForm.blurOnField(signUpForm.emailField);
      await signUpForm.enterPassword('Qwerty12');
      await signUpForm.blurOnField(signUpForm.passwordField);
      await signUpForm.enterRepeatPassword('');
      await signUpForm.blurOnField(signUpForm.repeatPasswordField);

      await expect(signUpForm.registerButton).toBeDisabled();
    })

    test('Verify that Register button is disabled when all fields are filled with invalid values', async ({ page }) => {
      await signUpForm.enterName('Петро');
      await signUpForm.blurOnField(signUpForm.nameField);
      await signUpForm.enterLastName('Петро');
      await signUpForm.blurOnField(signUpForm.lastNameField);
      await signUpForm.enterEmail('usertest@екзампл.com');
      await signUpForm.blurOnField(signUpForm.emailField);
      await signUpForm.enterPassword('Qwerty');
      await signUpForm.blurOnField(signUpForm.passwordField);
      await signUpForm.enterRepeatPassword('Qwerty');
      await signUpForm.blurOnField(signUpForm.repeatPasswordField);

      await expect(signUpForm.registerButton).toBeDisabled();
    })

    test('Verify that Register button is enabled after correcting incorrect values', async ({ page }) => {
      await signUpForm.enterName('Петро');
      await signUpForm.blurOnField(signUpForm.nameField);
      await signUpForm.enterLastName('LastName');
      await signUpForm.blurOnField(signUpForm.lastNameField);
      await signUpForm.enterEmail(email);
      await signUpForm.blurOnField(signUpForm.emailField);
      await signUpForm.enterPassword('Qwerty12');
      await signUpForm.blurOnField(signUpForm.passwordField);
      await signUpForm.enterRepeatPassword('Qwerty12');
      await signUpForm.blurOnField(signUpForm.repeatPasswordField);

      await expect(signUpForm.registerButton).toBeDisabled();

      await signUpForm.enterName('Name');
      await signUpForm.blurOnField(signUpForm.nameField);
      await expect(signUpForm.registerButton).toBeEnabled();
    })
  })
})
