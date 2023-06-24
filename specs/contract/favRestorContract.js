const itActsAsFavoriteRestoModel = (favoriteRestaurant) => {
  it('should return the restaurant that has been added', async () => {
    await favoriteRestaurant.putRestaurant({ id: 1 });
    await favoriteRestaurant.putRestaurant({ id: 2 });

    expect(await favoriteRestaurant.getRestaurant(1)).toEqual({ id: 1 });
    expect(await favoriteRestaurant.getRestaurant(2)).toEqual({ id: 2 });
    expect(await favoriteRestaurant.getRestaurant(3)).toBe();
  });

  it('should be able to delete a restaurant', async () => {
    await favoriteRestaurant.putRestaurant({ id: 1 });
    await favoriteRestaurant.putRestaurant({ id: 2 });
    await favoriteRestaurant.putRestaurant({ id: 3 });

    await favoriteRestaurant.deleteRestaurant(1);

    expect(await favoriteRestaurant.getAllRestaurants()).toEqual([{ id: 2 }, { id: 3 }]);
  });

  it('should be able to return all of the added restaurants', async () => {
    await favoriteRestaurant.putRestaurant({ id: 1 });
    await favoriteRestaurant.putRestaurant({ id: 2 });

    expect(await favoriteRestaurant.getAllRestaurants()).toEqual([{ id: 1 }, { id: 2 }]);
  });
};

export default itActsAsFavoriteRestoModel;
