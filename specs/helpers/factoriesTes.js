/* eslint-disable no-undef */
import itActsAsFavoriteRestoModel from '../contract/favRestorContract';
import FavoriteRestaurantIdb from '../../src/scripts/data/resto-idb_custom';

describe('Favorite Restaurant Idb Contract Test Implementation', () => {
  afterEach(async () => {
    (await FavoriteRestaurantIdb.getAllRestaurants()).forEach(async (restaurant) => {
      await FavoriteRestaurantIdb.deleteRestaurant(restaurant.id);
    });
  });

  itActsAsFavoriteRestoModel(FavoriteRestaurantIdb);
});
