angular.module('starter.controllers', [])


//.controller('MainCtrl', function($scope) {})
//.controller('LoginCtrl', function($scope) {})
.controller('ConfigfeedCtrl', function($scope) {})
.controller('RegisterCtrl', function($scope) {})
//.controller('FeedsCtrl', function($scope) {})
.controller('MyfeedCtrl', function($scope) {})
//.controller('FollowingCtrl', function($scope) {})
.controller('GroupsCtrl', function($scope) {})
.controller('PerfilCtrl', function($scope) {})
.controller('RegistroCtrl', function($scope) {})
.controller('SimpleCtrl', function($scope) {})

.controller('MainCtrl', function($scope,$cookies,$cookieStore, $rootScope, Auth ){
	var url ='http://legixapp.abardev.net';
	$scope.$on('$ionicView.enter', function(e) {
		//alert(window.localStorage.getItem('user').length)
		//alert(window.localStorage.getItem('user').length>4)
		if(window.localStorage.getItem('user')&&window.localStorage.getItem('user').length>4){
		$rootScope.user_data = JSON.parse(window.localStorage.getItem('user'));
		$rootScope.user_data.src_img= url+$rootScope.user_data.src_img;
		//console.log("logueado: "+Auth.isLoggedIn())
		}
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
			 if (data.message=="logged") {
				Auth.setUser({
				  username: $scope.user.id+'-'+$scope.user.first_name+'-'+$scope.user.last_name
				});
				$state.go('tab.feeds');
			 }else{
				 $scope.logout = function() {
					Auth.logout();
					$state.go("login");
				};
			 }
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
			angular.forEach(data, function(val, key){
				data[key].content=val.content+' <a href="#" onclick="'+window.open(val.url, '_system')+'"> '+val.url+'</a>';
			});
			$scope.feeds = data;
		});
		$scope.remove = function(feed) {
			Feeds.remove(feed);
		}
	});  
})

.controller('MyfeedsCtrl', function($scope, Feeds,$rootScope, $state, $stateParams) {
	 var user = $rootScope.user_data;
	$scope.data = {};
	
	$scope.$on('$ionicView.enter', function(e) {
		$scope.temas = user.temas;
		// Feeds.all(-1,'send_data','','',$scope.data.origin_id, $scope.data.theme_id,'').success(function(data){
		$scope.changeLocation= Feeds.all(-1,'send_data','','',$state.params.origin_id, $state.params.theme_id,'').success(function(data){
			angular.forEach(data, function(val, key){
				data[key].content=val.content+' <a href="'+val.url+'" rel="external" target="_system"> '+val.url+'</a>';
			});//data.content = data.content+' '+data.url;
			$scope.feeds = data;
			//if($scope.data.origin_id.length>0)
			//	$state.go('tab.myfeeds');
		});
		
		$scope.remove = function(feed) {
			Feeds.remove(feed);
		}
	/*	$scope.changeLocation = function (newRoute) {
			$state.go(newRoute);
		}*/
	});  
})
.controller('MyfeedCtrl', function($stateParams, $scope,Feeds,$state){
	//$scope.feeds=
	$scope.$on('$ionicView.enter', function(e) {
			Feeds.all(-1,'send_data','','',$state.params.origin_id, $state.params.theme_id,'').success(function(data){
			$scope.feeds = data;
		});  
		$scope.remove = function(feed) {
			Feeds.remove(feed);
		}
	});  
})

.controller('FollowingCtrl', function($scope, Feeds, $rootScope) {
	var user = $rootScope.user_data;
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
})
.controller('PerfilCtrl', function($scope,$rootScope) {
	$scope.$on('$ionicView.enter', function(e) {
		
	});
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


