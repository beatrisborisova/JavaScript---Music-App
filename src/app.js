import { catalogPage } from '../views/catalog.js';
import { createPage } from '../views/create.js';
import { detaisPage } from '../views/details.js';
import { editPage } from '../views/edit.js';
import { homePage } from '../views/home.js';
import { loginPage } from '../views/login.js';
import { registerPage } from '../views/register.js';
import { searchPage } from '../views/search.js';
import { logout } from './api/api.js';
import { render } from './lib.js';
import { page } from './lib.js';
import { getUserData } from './utils.js';

const root = document.getElementById('main-content');
document.getElementById('logout-btn').addEventListener('click', onLogout)

page(decorateContext);
page('//', homePage)
page('/login', loginPage)
page('/register', registerPage)
page('/catalog', catalogPage)
page('/details/:id', detaisPage)
page('/create', createPage)
page('/edit/:id', editPage)
page('/search', searchPage)

updateUserNav();
page.start();

async function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;
    next();
}

function onLogout() {
    logout();
    updateUserNav();
    page.redirect('/');
}

async function updateUserNav() {
    const userData = await getUserData();

    if (userData) {
        Array.from(document.querySelectorAll('.user')).forEach(el => el.style.display = 'inline');
        Array.from(document.querySelectorAll('.guest')).forEach(el => el.style.display = 'none');
    } else {
        Array.from(document.querySelectorAll('.user')).forEach(el => el.style.display = 'none');
        Array.from(document.querySelectorAll('.guest')).forEach(el => el.style.display = 'inline');
    }
}