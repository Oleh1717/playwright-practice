import {test} from '@playwright/test';
test ('Find Sign In button', async ({page}) => {
    await page.goto('');

    // CSS selector
    const signInByCss = page.locator(".header_signin");
    await signInByCss.highlight();

    // XPath selector
    const signInByXpath = page.locator("//button[contains(@class, 'header_signin')]");
    await signInByXpath.highlight();

    // getby role selector
    const signInByRole = page.getByRole('button', {name: 'Sign In'});
    await signInByRole.highlight();
});

test ('Find header navigation items', async ({page}) => {
    await page.goto('');

    const header = page.locator('header');
    const home = header.getByText('Home');
    await home.highlight();

    const about = header.getByText('About');
    await about.highlight();

    const contacts = header.getByText('Contacts');
    await contacts.highlight();
});