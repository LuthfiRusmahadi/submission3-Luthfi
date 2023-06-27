let favoriteResto = [];

const FavoriteRestoArray = {
  getResto(id) {
    if (!id) {
      return;
    }

    // eslint-disable-next-line consistent-return
    return favoriteResto.find((resto) => resto.id === id);
  },

  getAllResto() {
    return favoriteResto;
  },

  putResto(resto) {
    // eslint-disable-next-line no-prototype-builtins
    if (!resto.hasOwnProperty('id')) {
      return;
    }

    const existingResto = this.getResto(resto.id);
    if (existingResto) {
      return;
    }

    favoriteResto.push(resto);
  },

  deleteResto(id) {
    favoriteResto = favoriteResto.filter((resto) => resto.id !== id);
  },
};

export default FavoriteRestoArray;
