import itActsAsFavoriteRestoModel from './contract/favRestorContract';
import FavoriteRestaurantIdb from '../src/scripts/data/resto-idb_custom';

describe('Liking A Restaurant', () => {
  afterEach(async () => {
    (await FavoriteRestaurantIdb.getAllRestaurants()).forEach(async (restaurant) => {
      await FavoriteRestaurantIdb.deleteRestaurant(restaurant.id);
    });
  });

  itActsAsFavoriteRestoModel(FavoriteRestaurantIdb);

  it('should not add a restaurant again when it already exists', async () => {
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });

    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([{ id: 1 }]);
  });
});
