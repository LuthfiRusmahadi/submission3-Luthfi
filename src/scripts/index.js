import 'regenerator-runtime/runtime';
import '../styles/style.css';
import App from './views/app';
import '../customElement/navbar_custom';
import '../customElement/footer_custom';
import swRegister from './utils/sw-register';
import { WebSocketInitiator } from './utils/websocket-initiator';
import CONFIG from './globals/config';

const app = new App({
  button: document.querySelector('#burger'),
  drawer: document.querySelector('#sidebar'),
  content: document.querySelector('#maincontent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
  WebSocketInitiator.init(CONFIG.WEB_SOCKET_SERVER);
});
