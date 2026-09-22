import { Page } from '@playwright/test';

export class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    protected async navigate(path: string) {
        await this.page.goto(path);
    }
}
