import { test as base, Page } from '@playwright/test';
import { HomePage } from '../../pom/pages/HomePage';
import { SignInForm } from '../../pom/forms/SignInForm';
import { GaragePage } from '../../pom/pages/GaragePage';
import { AddCarForm } from '../../pom/forms/AddCarForm';
import { EditCarForm } from '../../pom/forms/EditCarForm';

type App = {
    page: Page;
    homePage: HomePage;
    signInForm: SignInForm;
    garagePage: GaragePage;
    addCarForm: AddCarForm;
    editCarForm: EditCarForm;
};

export const test = base.extend<{app: App}>({
    app: async ({ page }, use) => {
        const app: App = {
            page,
            homePage: new HomePage(page),
            signInForm: new SignInForm(page),
            garagePage: new GaragePage(page),
            addCarForm: new AddCarForm(page),
            editCarForm: new EditCarForm(page),
        };
        await use(app);
    }
});
