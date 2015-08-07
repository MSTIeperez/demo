angular.module('starter.controllers', [])

.controller('MainCtrl', function($scope) {})
.controller('LoginCtrl', function($scope) {})
.controller('RegisterCtrl', function($scope) {})
.controller('FeedsCtrl', function($scope) {})
.controller('MyfeedsCtrl', function($scope) {})
.controller('FollowingCtrl', function($scope) {})
.controller('GroupsCtrl', function($scope) {})
.controller('PerfilCtrl', function($scope) {})
.controller('RegistroCtrl', function($scope) {})
/*
.controller('MainCtrl', function($scope, $controller ){
	if(window.localStorage.getItem('user')!=null){
		$controller('LoginCtrl', {$scope:$scope});
		console.log("usuario: "+$scope.user);}
	else{
		
	}//scope.user = $scope.user; 
		//console.log("nombre usuario: "+$scope.user.first_name);
	//else
		//$scope.user =null;

})*/
.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state, Feeds) {
    $scope.data = {};
    $scope.login = function() {
		  console.log("LOGIN user: " + $scope.data.username + " - PW: ********");
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
			$scope.user=data.user;
			$state.go('tab.feeds');
        }).error(function(data) {
			console.log(data)
            var alertPopup = $ionicPopup.alert({
                title: 'Error al iniciar sesión',
                template: data.message, //'¡Por favor revisa tu correo y/o contraseña!',
				okText: 'Aceptar'
            });
        });
    }
})
.controller('FeedsCtrl', function($scope, Feeds) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  //$scope.user =LoginService.user();
  $scope.feeds = Feeds.all();
  //console.log("variable: "+Feeds.all());
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


