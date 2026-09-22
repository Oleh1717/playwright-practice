import { Locator } from '@playwright/test';
import { BaseForm } from './BaseForm';

export class SignInForm extends BaseForm {
    public readonly emailField: Locator = this.page.locator('#signinEmail');
    public readonly passwordField: Locator = this.page.locator('#signinPassword');
    public readonly loginButton: Locator = this.page.getByRole('button', { name: 'Login' });

    async signIn(email: string, password: string): Promise<void> {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }
}