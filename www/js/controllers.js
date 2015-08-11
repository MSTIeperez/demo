angular.module('starter.controllers', [])

//.controller('MainCtrl', function($scope) {})
//.controller('LoginCtrl', function($scope) {})
.controller('ConfigfeedCtrl', function($scope) {})
.controller('RegisterCtrl', function($scope) {})
//.controller('FeedsCtrl', function($scope) {})
//.controller('MyfeedsCtrl', function($scope) {})
//.controller('FollowingCtrl', function($scope) {})
.controller('GroupsCtrl', function($scope) {})
.controller('PerfilCtrl', function($scope) {})
.controller('RegistroCtrl', function($scope) {})
.controller('SimpleCtrl', function($scope) {})

.controller('MainCtrl', function($scope,$cookies,$cookieStore ){
	
	$scope.$on('$ionicView.enter', function(e) {
		//$scope.user_data={};
		$scope.user_data = window.localStorage.getItem('user');
	
	});  
})

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state, Auth) {
    $scope.data = {};
	$scope.logout = function() {
		Auth.logout();
		$state.go("login");
	};
    $scope.login = function() {
		  console.log("LOGIN user: " + $scope.data.username + " - PW: ********");
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
			$scope.user=data.user;
			 Auth.setUser({
			  username: $scope.user.id+'-'+$scope.user.first_name+'-'+$scope.user.last_name
			});
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

 // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //

.controller('FeedsCtrl', function($scope, Feeds) {
   	
	$scope.$on('$ionicView.enter', function(e) {
		Feeds.all(-1).success(function(data){
			$scope.feeds = data;
		});
		$scope.remove = function(feed) {
			Feeds.remove(feed);
		}
	});  
})

.controller('MyfeedsCtrl', function($scope, Feeds) {
 
	$scope.$on('$ionicView.enter', function(e) {
		Feeds.all(-1,'send_data').success(function(data){
			$scope.feeds = data;
		});
		$scope.remove = function(feed) {
			Feeds.remove(feed);
		}
	});  
})

.controller('FollowingCtrl', function($scope, Feeds) {
  var user =window.localStorage.getItem('user');
  var asuntos = user.follow?user.follow:'0,0';
  console.log(asuntos);
	$scope.$on('$ionicView.enter', function(e) {
		Feeds.all(-1,'','send_data',asuntos).success(function(data){
			$scope.feeds = data;
		});
		$scope.remove = function(feed) {
			Feeds.remove(feed);
		}
	});  
})
.controller('FavoritesCtrl', function($scope, Favorites) {
 
  
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


