/* eslint-disable no-undef */
import itActsAsFavoriteRestoModel from './contract/favRestorContract';
import FavoriteRestaurantIdb from '../src/scripts/data/resto-idb_custom';

describe('Unlike A Restaurant', () => {
  afterEach(async () => {
    (await FavoriteRestaurantIdb.getAllRestaurants()).forEach(async (restaurant) => {
      await FavoriteRestaurantIdb.deleteRestaurant(restaurant.id);
    });
  });

  itActsAsFavoriteRestoModel(FavoriteRestaurantIdb);

  it('should not throw error if the unliked restaurant is not in the list', async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(1);

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
