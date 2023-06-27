import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({
    content, menu, drawer, main,
  }) {
    this._content = content;
    this._menu = menu;
    this._drawer = drawer;
    this._main = main;

    this._menuClickListener = this._toggleDrawer.bind(this);
    this._mainClickListener = this._closeDrawer.bind(this);

    this._initialize();
  }

  _initialize() {
    this._drawer.addEventListener('click', this._menuClickListener);
    this._content.addEventListener('click', this._mainClickListener);
  }

  _toggleDrawer(event) {
    this._drawer.classList.toggle('open');
    event.stopPropagation();
  }

  _closeDrawer() {
    this._drawer.classList.remove('open');
  }

  // eslint-disable-next-line class-methods-use-this
  async _handleSkipLinkClick(event) {
    event.preventDefault();
    document.querySelector('#content').focus();
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];

    this._content.innerHTML = await page.render();
    await page.afterRender();

    const skipLinkElem = document.querySelector('.skip-link');
    skipLinkElem.addEventListener('click', this._handleSkipLinkClick);
  }
}

export default App;
