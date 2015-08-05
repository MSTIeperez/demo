angular.module('starter.favorites', [])

.factory('Favorites', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var favorites = [{
    name: 'Todos los diputados',
    text: 'Lorem ipsum dolor sit...',
      postCount: 4,
    link: '#/tab/favorites/feed'
    
  }, {
    name: 'Favoritos',
    text: 'Lorem ipsum dolor sit...',
      postCount: 3,
    link: '#/tab/favorites/feed'
    
  }, {
    name: 'Diputados',
    text: 'Lorem ipsum dolor sit...',
      postCount: 10,
    link: '#/tab/favorites/feed'
    
  }];

  return {
    all: function() {
      return favorites;
    },
    remove: function(favorite) {
      favorite.splice(favorites.indexOf(favorite), 1);
    },
    get: function(favoriteId) {
      for (var i = 0; i < favorites.length; i++) {
        if (favorites[i].id === parseInt(favoriteId)) {
          return favorites[i];
        }
      }
      return null;
    }
  };
});