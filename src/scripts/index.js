import 'regenerator-runtime';
import '../styles/style.css';
import App from './views/app';
// eslint-disable-next-line import/no-unresolved
// eslint-disable-next-line import/extensions
import './customElement/navbar_custom.js';
// eslint-disable-next-line import/no-unresolved
// eslint-disable-next-line import/extensions
import './customElement/footer_custom.js';

import swRegister from './utils/sw-register';
import { WebSocketInitiator } from './utils/websocket-initiator';
import CONFIG from './globals/config';
import RestoSource from './data/resto-source_custom';

const app = new App({
  button: document.querySelector('#burger'),
  drawer: document.querySelector('#sidebar'),
  content: document.querySelector('#maincontent'),
});

const init = async () => {
  await app.renderPage();
  swRegister();
  WebSocketInitiator.init(CONFIG.WEB_SOCKET_SERVER);
};

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  init();
});

RestoSource.home = async () => {
  const response = await fetch('https://restaurant-api.dicoding.dev/list');
  const responseJson = await response.json();
  return responseJson.restaurants;
};
