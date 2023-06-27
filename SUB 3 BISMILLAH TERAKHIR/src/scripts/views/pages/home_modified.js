import RestoSource from '../../data/resto-source_custom';
import {
  createHomePage,
} from '../templates/template-creator';

const Home = {
  async render() {
    const heroSection = `
      <div class="hero">
        <div class="hero__inner">
          <h1 class="hero__title">Mabes Resto</h1>
          <p class="hero__tagline">Makanan Enak, Lezat, Bergizi</p>
        </div>
      </div>
    `;

    const contentSection = `
      <section id="content" class="headline">
        <h1 class="headline_tagline">Explore Restaurant</h1>
        <div class="form"> 
          <div class="list">
            <div class="menu" id="restaurant"> </div>
          </div>
        </div>
      </section>
    `;

    return `${heroSection}${contentSection}`;
  },

  async afterRender() {
    const restaurants = await RestoSource.home();
    const restaurantList = document.querySelector('#restaurant');

    restaurants.forEach((restaurant) => {
      restaurantList.innerHTML += createHomePage(restaurant);
    });

    // Added responsive images
    const images = document.querySelectorAll('.restaurant__image');
    images.forEach((image) => {
      const imageSrc = image.getAttribute('src');
      const imageSmallSrc = imageSrc.replace('.jpg', '-small.jpg');

      image.setAttribute('srcset', `${imageSmallSrc} 480w, ${imageSrc} 800w`);
      image.setAttribute('sizes', '(max-width: 600px) 480px, 800px');
    });
  },
};

export default Home;
