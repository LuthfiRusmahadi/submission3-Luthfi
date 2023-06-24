/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
// eslint-disable-next-line no-unused-vars
const assert = require('assert');

Feature('Liking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

async function likeRestaurant(I, count) {
  I.amOnPage('/');

  for (let i = 1; i <= count; i++) {
    await I.waitForElement('.list_restaurant_content .restaurant-item ', 20);
    const restaurantLinks = await I.grabMultiple('.list_restaurant_content .restaurant-item ');
    const targetLink = restaurantLinks[0]; // Mengklik restoran pertama dalam daftar
    I.click(targetLink);
    I.amOnPage('/#/detail');
    await I.waitForElement('#likeButton', 20);
    I.click('#likeButton');
    I.amOnPage('/');
  }
}

async function unlikeRestaurant(I, index) {
  I.amOnPage('/#/favorite');
  await I.waitForElement('.list_restaurant_content .restaurant-item ', 20);
  const targetLink = locate('.list_restaurant_content .restaurant-item').at(index - 1);
  I.click(targetLink);
  await I.waitForElement('#likeButton', 20);
  I.click('#likeButton');
}

Scenario('liking some restaurant', async ({ I }) => {
  I.seeElement('.list_restaurant_content');
  I.seeNumberOfVisibleElements('.list_restaurant_content .restaurant-item', 0);

  await likeRestaurant(I, 3);

  I.amOnPage('/#/favorite');
  I.seeElement('.list_restaurant_content');
  I.seeNumberOfVisibleElements('.list_restaurant_content .restaurant-item', 3);
});

Scenario('unlike one restaurant', async ({ I }) => {
  await likeRestaurant(I, 1);

  I.amOnPage('/#/favorite');
  I.seeElement('.list_restaurant_content');

  await unlikeRestaurant(I, 1);

  I.amOnPage('/#/favorite');
  I.dontSeeElement('.list_restaurant_content .restaurant-item');
});
