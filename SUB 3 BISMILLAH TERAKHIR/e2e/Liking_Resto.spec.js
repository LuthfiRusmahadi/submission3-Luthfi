/* eslint-disable no-undef */
const assert = require('assert');

Feature('Liking Restaurant');

Scenario('liking some restaurant', async ({ I }) => {
  // halaman home page
  I.amOnPage('/');
  // tunggu list restaurant muncul
  I.waitForElement('.list_restaurant_content .list_restaurant_title');
  // arahkan ke restaurant pertama
  const firstRestaurant = locate('.list_restaurant_content .list_restaurant_title').first();
  // klik restaurant pertama
  I.click(firstRestaurant);
  // di halaman detail, cari dan klik like button
  I.waitForElement('#likeButton');
  I.seeElement('#likeButton');
  I.click('#likeButton');
  // ke halaman favorite, pastikan sudah ada restaurant yang di like
  I.amOnPage('/#/favorite');
  I.waitForElement('.list_restaurant_content .list_restaurant_title');
  // pastikan restaurant yang muncul di pages like, merupakan restaurant yang disukai sebelumnya
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  const favoritedRestaurantName = await I.grabTextFrom('.list_restaurant_content .list_restaurant_title');
  assert.strictEqual(firstRestaurantName, favoritedRestaurantName);
});
Scenario('batal menyukai restaurant', async ({ I }) => {
  // Mengunjungi halaman favorite
  I.amOnPage('/#/favorite');
  // Memastikan tidak ada restoran yang ditampilkan
  I.dontSeeElement('.list_restaurant_content .list_restaurant_title');
  // Kembali ke halaman home
  I.amOnPage('/');
  // Menunggu 5 detik
  I.wait(5);
  // Melihat restoran
  I.waitForElement('.list_restaurant_content .list_restaurant_title');
  // Memilih restoran
  const firstRestaurant = locate('.list_restaurant_content .list_restaurant_title').first();
  I.click(firstRestaurant);
  // Melihat tombol Like
  I.waitForElement('#likeButton');
  I.seeElement('#likeButton');
  // Menyukai restoran
  I.click('#likeButton');
  // Menuju halaman favorite
  I.amOnPage('/#/favorite');
  // Menunggu 5 detik
  I.wait(5);
  // Melihat restoran yang telah disukai
  I.waitForElement('.list_restaurant_content .list_restaurant_title');
  // Memilih restoran yang telah disukai
  const favoritedRestaurant = locate('.list_restaurant_content .list_restaurant_title').first();
  I.click(favoritedRestaurant);
  // Melihat tombol Batal Menyukai
  I.waitForElement('#likeButton');
  I.seeElement('#likeButton');
  // Membatalkan menyukai restoran
  I.click('#likeButton');
});
