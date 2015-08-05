angular.module('starter.controllers', [])

.controller('FeedsCtrl', function($scope) {})
.controller('MyfeedsCtrl', function($scope) {})
.controller('FollowingCtrl', function($scope) {})
.controller('GroupsCtrl', function($scope) {})
.controller('PerfilCtrl', function($scope) {})
.controller('SignInCtrl', function($scope, $state) {
  
  $scope.signIn = function(user) {
    console.log('Sign-In', user);
    $state.go('tabs.feeds');
  };
  
})
.controller('FeedsCtrl', function($scope, Feeds) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.feeds = Feeds.all();
  $scope.remove = function(feed) {
    Feeds.remove(feed);
  }
})

.controller('FavoritesCtrl', function($scope, Favorites) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.favorites = Favorites.all();
  $scope.remove = function(favorite) {
    Favorites.remove(favorite);
  }
})

.controller('FeedFavoritesCtrl', function($scope, $stateParams, Feeds) {
  $scope.feed = Feeds.get($stateParams.feedId);
});
/*
.controller('FeedDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('FavoritesCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('FavoritesFeedCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});*/
/*
.controller('UsuariosCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})*/


