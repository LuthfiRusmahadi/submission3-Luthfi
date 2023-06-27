import RestoIdb from '../../data/resto-idb_custom';
import { createHomePage } from '../templates/template-creator';

const Favorite = {
  async render() {
    const restaurants = await RestoIdb.getAllRestaurants();
    let restaurantContent = '';

    if (restaurants.length > 0) {
      restaurantContent = restaurants.map((restaurant) => createHomePage(restaurant)).join('');
    } else {
      restaurantContent = `
        <div class="notfound">
          <p>You don't have any favorite restaurants</p>
        </div>
      `;
    }

    return `
      <div class="hero">
        <div class="hero__inner">
          <h1 class="hero__title">Mabes Resto</h1>
          <p class="hero__tagline">Makanan Enak, Lezat dan Bergizi</p>
        </div>
      </div>
      <section id="content" class="headline">
        <h1 class="headline_tagline">Favorite Restaurants</h1>
        <div class="form">
          <div class="list">
            <div class="menu" id="restaurant">${restaurantContent}</div>
          </div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    const restaurants = await RestoIdb.getAllRestaurants();
    const restaurantsContainer = document.querySelector('#restaurant');

    try {
      restaurantsContainer.innerHTML = '';

      restaurants.forEach((restaurant) => {
        const restaurantElement = createHomePage(restaurant);
        restaurantsContainer.innerHTML += restaurantElement;
      });

      const existingRestaurants = restaurantsContainer.querySelectorAll('[data-id]');
      existingRestaurants.forEach((existingRestaurant) => {
        const restaurantId = existingRestaurant.getAttribute('data-id');
        const matchedRestaurant = restaurants.find((restaurant) => restaurant.id === restaurantId);
        if (!matchedRestaurant) {
          existingRestaurant.remove();
        }
      });

      if (restaurants.length === 0) {
        restaurantsContainer.innerHTML += `
          <div class="notfound">
            <p>You don't have any favorite restaurants</p>
          </div>
        `;
      }
    } catch (error) {
      console.log(error);
    }
  },
};

export default Favorite;
