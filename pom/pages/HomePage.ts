import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {

    private readonly signUpButton: Locator;
    private readonly signInButton: Locator;

    constructor(page: any) {
        super(page);

        this.signUpButton = this.page.getByRole('button', { name: 'Sign Up' });
        this.signInButton = this.page.getByRole('button', { name: 'Sign In' });
    }

    async navigate() {
        await this.page.goto('/');
    }

    async openSignInForm() {
        await this.signInButton.click();
    }

    async clickSignUpButton() {
        await this.signUpButton.click();
    }
}