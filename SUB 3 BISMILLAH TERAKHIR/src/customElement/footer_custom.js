class FooterCustom extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const footer = document.createElement('footer');
    const paragraph = document.createElement('p');
    paragraph.innerHTML = '&copy; Mabes Resto 2023 (Modified)';
    footer.appendChild(paragraph);
    this.appendChild(footer);
  }
}

customElements.define('footer-custom', FooterCustom);
