const DrawerInitiator = {
  init({ button, drawer, content }) {
    const toggleDrawer = (event) => {
      event.stopPropagation();
      drawer.classList.toggle('open');
    };

    const closeDrawer = (event) => {
      event.stopPropagation();
      drawer.classList.remove('open');
    };

    if (button) {
      button.addEventListener('click', toggleDrawer);
    }

    if (content) {
      content.addEventListener('click', closeDrawer);
    }
  },
};

export default DrawerInitiator;
