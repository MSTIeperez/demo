var url ='';
//console.log(window.location.hostname);
if(window.location.hostname=="")
	url='http://legixapp.abardev.net';
angular.module('starter.controllers', [])

.controller('MainCtrl', function($scope,$cookies,$cookieStore, $rootScope, Auth ){
	$scope.$on('$ionicView.loaded', function(e) {
		if(window.localStorage.getItem('user')&&window.localStorage.getItem('user').length>4){
		$rootScope.user_data = JSON.parse(window.localStorage.getItem('user'));
		$rootScope.user_data.src_img= url+$rootScope.user_data.src_img;
		}
	});  
})
.controller('SimpleCtrl', function($scope, $location, ContentService) {
	$scope.$on('$ionicView.loaded', function(e) {
		console.log($location.hash())
		var page_id=$location.hash();
		ContentService.content(page_id).success(function(data){
			$scope.page=data
		}).error(function(data){
			console.log("error en conexión");
		})
	});
})
.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state, Auth, $rootScope) {
    $scope.$on('$ionicView.loaded', function(e) {
	$scope.data = {};
	});
	$scope.logout = function() {
		Auth.logout();
		$state.go("login");
	};
    $scope.login = function() {
		  console.log("LOGIN user: " + $scope.data.username + " - PW: ********");
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
			$scope.user=data.user;
			$rootScope.user_data =data.user;
			 if (data.message=="logged") {
				Auth.setUser({
				  username: $scope.user.id+'-'+$scope.user.first_name+'-'+$scope.user.last_name
				});
				if(data.user.temas.length>0)
					$state.go('tab.tema_feeds');
				if(data.user.temas.length==0)
					$state.go('tab.configfeeds');
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
	$scope.recover=function(){
		LoginService.recoverpass($scope.data.email).success(function(data){
			console.log(data)
            var alertPopup = $ionicPopup.alert({
                title: 'Recuperación de contraseña',
                template: "Contraseña provisional generada, revisa tu correo electrónico.", //'¡Por favor revisa tu correo y/o contraseña!',
				buttons:[{
						text: 'Aceptar',
						type: 'button-positive',
						onTap: function(e) {
							$state.go('login');
						}
					}]	
            });
		}).error(function(data){
			console.log(data)
			if(data.message=="No-existe"){
				 var alertPopup = $ionicPopup.alert({
					title: 'Error al enviar datos',
					template: "Correo no encontrado en la base de datos. <strong>Regístrate</strong> y comienza tu período de 15 días.", //'¡Por favor revisa tu correo y/o contraseña!',
					buttons:[{
						text:'Cancelar',
						type:'button-default',
						onTap: function(e){
							
							}
						},{
						text: 'Registrarse',
						type: 'button-positive',
						onTap: function(e) {
							$state.go('register');
						}
					}]	
				});
			}else{
				var alertPopup = $ionicPopup.alert({
					title: 'Error al enviar datos',
					template: data.message, //'¡Por favor revisa tu correo y/o contraseña!',
					ontap: "#/registro", //'¡Por favor revisa tu correo y/o contraseña!',
					okText: 'Aceptar'
				});
			}
		});
	}
})
.controller('RegistroCtrl', function($scope, Registerservice, LoginService, $ionicPopup, $state, Auth) {
	$scope.data={};
	$scope.register = function(){

	  if($scope.data.terms==true){
		  
        Registerservice.newUser($scope.data.legix_id, $scope.data.first_name, $scope.data.last_name, $scope.data.email, $scope.data.password).success(function(data) {
			$scope.user=data.user;
			 if (data.message=="Creada") {
				    LoginService.loginUser($scope.data.email, $scope.data.password).success(function(data) {
						$scope.user=data.user;
						 if (data.message=="logged") {
							Auth.setUser({
							  username: $scope.user.id+'-'+$scope.user.first_name+'-'+$scope.user.last_name
							});
							if(data.user.temas.length>0)
								$state.go('tab.tema_feeds');
							if(data.user.temas.length==0)
								$state.go('tab.configfeeds');
						 }else{
							 $scope.logout = function() {
								Auth.logout();
								$state.go("login");
							};
						 }
					}).error(function(data) {
						console.log(data)
						$scope.logout = function() {
								Auth.logout();
								$state.go("login");
						};
					});
			 }else{
				var alertPopup = $ionicPopup.alert({
                title: 'Error de conexion',
                template: '¡Por favor intenta mas tarde!', //'¡Por favor revisa tu correo y/o contraseña!',
				okText: 'Aceptar'
            });
			 }
        }).error(function(data) {
			console.log(data)
            var alertPopup = $ionicPopup.alert({
                title: 'Error al iniciar sesión',
                template: data.message, //'¡Por favor revisa tu correo y/o contraseña!',
				okText: 'Aceptar'
            });
        });
	  }else{
		  var alertPopup = $ionicPopup.alert({
                title: 'Registro',
                template: 'Debes aceptar los Términos y condiciones', //'¡Por favor revisa tu correo y/o contraseña!',
				okText: 'Aceptar'
            });
	  }
    }
})
 
 // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
.controller('ConfigfeedCtrl', function($scope, Themes, $rootScope) {
   	$scope.data={};
	$scope.$on('$ionicView.beforeEnter', function(e) {
		//$rootScope.user_data = JSON.parse(window.localStorage.getItem('user'));
		//$rootScope.user_data.src_img= url+$rootScope.user_data.src_img;
		/*Themes.all().success(function(data){
				$scope.themes = data;
			});*/ var temas_id=[]
			
			
		if($rootScope.user_data.temas_ids.length==0){
			console.log("nada")
			Themes.all().success(function(data){
				$scope.themes = data;
			});
		}else{ console.log("datos")
			angular.forEach($rootScope.user_data.temas_ids, function(val, key){
				temas_id.push(parseInt(val));
			});
			Themes.all().success(function(data){
				var themas=[];
				angular.forEach(data, function(dato,key){
				angular.forEach(dato.tema, function(val,index){
					//console.log("ids"+val.id)
					if(temas_id.indexOf(val.id)!=-1)
						dato.tema.splice(index,1);
					$scope.themes = data;
				});
				});
				
				
			});
		}
		$scope.update_temas= function(){
			console.log($scope.data.subject_id);
		}
		$scope.remove = function(theme) {
			Themes.remove(theme);
		}
	});  
})
.controller('SearchCtrl', function($scope, Search, Auth,$stateParams, $state) {
	
	$scope.data={}
	
	$scope.$on('$ionicView.loaded', function(e) { console.log(Auth.isLoggedIn())
		if(Auth.isLoggedIn() && window.localStorage.getItem('user')!=null ){
		console.log("params: "+$state.params.busqueda);	
		$scope.busqueda=$state.params.busqueda;
		if($state.params.busqueda!=""){
			var noread=0;
			$scope.flag=true;
		Search.all(-1,$state.params.busqueda).success(function(data){
			angular.forEach(data.feeds, function(val, key){
				data.feeds[key].content=val.content+' <a href="#" onclick="window.open(\''+val.url+'\', \'_system\', \'location=no\'); return false;"> '+val.url+'</a>';
				data.feeds[key].content=$sce.trustAsHtml(data.feeds[key].content);
				if(val.read==0)
					noread++;
			});
			$scope.feeds = data.feeds;
			$scope.noread = noread;
			if(data.feeds.length==0)
				$scope.flag="no_feeds";
			else
				$scope.flag=false;
		
		}).error(function(){
			$scope.feeds = "";
		});
		}
		$scope.remove = function(feed) {
			Search.remove(feed);
		}
		} else $state.go('login');
	});  
})
.controller('FeedsCtrl', function($scope, Feeds_all, Auth, $state) {
	
	$scope.data={}
	
	$scope.$on('$ionicView.loaded', function(e) { console.log(Auth.isLoggedIn())
		if(Auth.isLoggedIn() && window.localStorage.getItem('user')!=null ){
			$scope.flag=true;
		$scope.load = Feeds_all.all(-1).success(function(data){
			angular.forEach(data.feeds, function(val, key){
				data.feeds[key].content=val.content+' <a href="#" onclick="window.open(\''+val.url+'\', \'_system\', \'location=no\'); return false;"> '+val.url+'</a>';
				data.feeds[key].content=$sce.trustAsHtml(data.feeds[key].content);
			});
			if(data.feeds.length==0)
				$scope.flag=false;
			else
				$scope.flag="no_feeds";
			$scope.feeds = data.feeds;
			
		}).error(function(){
			$scope.feeds = "";
		});
		$scope.remove = function(feed) {
			Feeds_all.remove(feed);
		}
		} else $state.go('login');
	});  
})

.controller('MyfeedsCtrl', function($scope, Feeds,$rootScope, $state, $stateParams, Auth,$sce) {

	$scope.$on('$ionicView.loaded', function(e) {
		 if(Auth.isLoggedIn() && window.localStorage.getItem('user')!=null ){
			//$rootScope.user_data = JSON.parse(window.localStorage.getItem('user'));
			//$rootScope.user_data.src_img= url+$rootScope.user_data.src_img;
		 var user = $rootScope.user_data;
		
		$scope.data = {};
		console.log(user.temas.length);
		if(user.temas.length==0)
			$state.go('tab.configfeeds');
		$scope.temas = user.temas;
		 var noread=0;
		 var follow="";
		 var asuntos_arr=[]
		 $scope.flag=true;
		// Feeds.all(-1,'send_data','','',$scope.data.origin_id, $scope.data.theme_id,'').success(function(data){
		$scope.changeLocation= Feeds.all(-1,'send_data','','','', $state.params.origin_id, $state.params.theme_id,'').success(function(data){
			angular.forEach(data.feeds, function(val, key){
				data.feeds[key].content=val.content+' <a href="#" onclick="window.open(\''+val.url+'\', \'_system\', \'location=no\'); return false;"> '+val.url+'</a>';
				data.feeds[key].content=$sce.trustAsHtml(data.feeds[key].content);
				angular.forEach(val.follow, function(valor,index){
					asuntos_arr.push(valor.subject_id);
				})
				if(val.read==0)
					noread++;
				data.feeds[key].asuntos_str =asuntos_arr.join(",");
			});
			$scope.feeds = data.feeds;
			$scope.noread = noread;
			if(data.feeds.length==0)
				$scope.flag="no_feeds";
			else
				$scope.flag=false;
		});
		$scope.tema_name=$state.params.name;
		
		$scope.remove = function(feed) {
			Feeds.remove(feed);
		}
		}else $state.go('login');
	});  
	
})

.controller('FollowingCtrl', function($scope, Follow, UserService, $rootScope, Auth, $stateParams, $state) {

	$scope.$on('$ionicView.afterEnter', function(e) {
		 if(Auth.isLoggedIn() && window.localStorage.getItem('user')!=null ){
			 UserService.datauser('siguiendo').success(function(data){
				 console.log(data.temas);
				 $scope.temas_follow = data.temas;
				 $scope.asuntos = data.follow;
			 })
		var asuntos = $rootScope.user_data?($rootScope.user_data.follow?$rootScope.user_data.follow:'0,0'):'0,0';
		//console.log(asuntos);
		asuntos= asuntos.toString()
		console.log(asuntos);
		var noread=0;
		$scope.flag=true;
		Follow.all(-1,'','send_data','',asuntos, $state.params.origin_id, $state.params.theme_id).success(function(data){
			angular.forEach(data.feeds, function(val, key){
				data.feeds[key].content=val.content+ ' <a href="#" onclick="window.open(\''+val.url+'\', \'_system\', \'location=no\'); return false;"> '+val.url+'</a>';
				data.feeds[key].content=$sce.trustAsHtml(data.feeds[key].content);
				if(val.read==0)
					noread++;
			});
			$scope.feeds = data.feeds;
			$scope.noread = noread;
			if(data.feeds.length==0)
				$scope.flag="no_feeds";
			else
				$scope.flag=false;
		});
		$scope.tema_name=$state.params.name;
		$scope.remove = function(feed) {
			Follow.remove(feed);
		}
		} else $state.go('login');
	});  
})
.controller('GroupsCtrl', function($scope, Feeds, $rootScope, Auth, $stateParams, $state) {

	$scope.$on('$ionicView.loaded', function(e) {
		 if(Auth.isLoggedIn() && window.localStorage.getItem('user')!=null ){
		$scope.grupos=$rootScope.user_data.grupos;
		console.log($scope.grupos);
		if($state.params.id){
			var grupo=[];
			angular.forEach($scope.grupos, function(val,key){
				if($state.params.id==val.id){
				grupo.push(val);
				grupo=grupo[0];}
			});
			console.log(grupo);
			$scope.group=grupo;
			$scope.tema_name=$state.params.name;
			var noread=0;
			$scope.flag=true;
			Feeds.all(-1,'send_data','','','', $state.params.origin_id, $state.params.theme_id,'').success(function(data){
				angular.forEach(data.feeds, function(val, key){
					data.feeds[key].content=val.content+' <a href="#" onclick="window.open(\''+val.url+'\', \'_system\', \'location=no\'); return false;"> '+val.url+'</a>';
					data.feeds[key].content=$sce.trustAsHtml(data.feeds[key].content);
					if(val.read==0)
						noread++;
				});
				$scope.feeds = data.feeds;
				$scope.noread = noread;
				if(data.feeds.length==0)
					$scope.flag="no_feeds";
				else
					$scope.flag=false;
			});
		}
		$scope.remove = function(feed) {
			Feeds.remove(feed);
		}
	} else $state.go('login');
	});  
})
.controller('FavoritesCtrl', function($scope, Search, $rootScope, $state) {
	
	
	$scope.$on('$ionicView.beforeEnter', function(e) {
	var fav_feeds = [];
	//$rootScope.user_data = JSON.parse(window.localStorage.getItem('user'));
	//$rootScope.user_data.src_img= url+$rootScope.user_data.src_img;
	$scope.favorites=$rootScope.user_data?$rootScope.user_data.favfolder:"0,0";
	var feedsfav=$rootScope.user_data?$rootScope.user_data.favfeeds:"";

	console.log("favoritos: "+feedsfav);
	$scope.favfolder=$state.params.favfolder?$state.params.favfolder:'';
	$scope.flag=true;
	var noread=0;
	var flag=0;
	$scope.folder_name=$state.params.foldername?$state.params.foldername:'Feeds Favoritos';
		if($state.params.favfolder){
			Search.all(-1,'','','', 'send_data','','','','',feedsfav).success(function(data){
					console.log(data)
					//$rootScope.user_data= window.localStorage.setItem('user',JSON.stringify(data.user_data));
					angular.forEach(data.feeds, function(val, key){
						fav_feeds=[];
						angular.forEach(val.favfolder, function(dato, index){
							fav_feeds.push(dato.folder_id);
						});
						data.feeds[key].content=val.content+' <a href="#" onclick="window.open(\''+val.url+'\', \'_system\', \'location=no\'); return false;"> '+val.url+'</a>';
						data.feeds[key].content=$sce.trustAsHtml(data.feeds[key].content);
						if(val.read==0)
							noread++;
						if(fav_feeds.indexOf($state.params.favfolder)!=-1){
							data.feeds[key].folder=true;
							$scope.flag=false;
						}else{
							data.feeds[key].folder=false;
							flag++;}
					});
				if(data.feeds.length==(flag))
					$scope.flag="no_feeds";
				$scope.feeds = data.feeds;
				$scope.noread = noread;
			});
		}
		$scope.remove = function(feed) {
			Search.remove(feed);
		}
	});  
	$scope.update_folder=function(){
	 console.log("datosupdate: "+$scope.data.folder_id+" "+$scope.data.title)	
	}
})

.controller('PerfilCtrl', function($scope,$rootScope, UpdateService, $ionicPopup, $state, Auth, LoadImage, UserService) {
	$scope.$on('$ionicView.loaded', function(e) {
		$scope.data={};
		$scope.photo= function(){
				var alertPopup = $ionicPopup.alert({
					title: 'Cambiar imagen de Perfil',
					//template: "Selecciona una imagen de tu galería o directo de la cámara", //'¡Por favor revisa tu correo y/o contraseña!',
					buttons:[{
						text:'Capturar Foto',
						type:'button-positive',
						onTap: function(e){
							capturePhoto();
							}
						},{
						text: 'De la galería',
						type: 'button-positive',
						onTap: function(e) {
							getPhoto(pictureSource.PHOTOLIBRARY);
						 }
						},{
						text: 'Aceptar',
						type: 'button-positive',
						onTap: function(e) {
							
						}
					}]	
				});
		}
		
		$scope.update = function(){
			console.log($scope.data);
			UpdateService.updateUser($scope.data.first_name, $scope.data.last_name, $scope.data.alias, $scope.data.password, $scope.data.thumbnail, $scope.data.archivos)
				.success(function(data){
					console.log(data)
					if(data=='"actualizado"'){
						UserService.datauser().success(function(response){
							window.localStorage.setItem('user',JSON.stringify(response));
							 $rootScope.user_data=response;
							 $rootScope.user_data.src_img= url+$rootScope.user_data.src_img;
						})
						var alertPopup = $ionicPopup.alert({
						title: '¡Datos de perfil actualizados!',
						//template: "Selecciona una imagen de tu galería o directo de la cámara", //'¡Por favor revisa tu correo y/o contraseña!',
						buttons:[{
							text: 'Aceptar',
							type: 'button-positive',
							onTap: function(e) {
							}
							}]	
						});
					}else{
						var alertPopup = $ionicPopup.alert({
						title: '¡No se modificó ningún dato!',
						//template: "Selecciona una imagen de tu galería o directo de la cámara", //'¡Por favor revisa tu correo y/o contraseña!',
						buttons:[{
							text: 'Aceptar',
							type: 'button-positive',
							onTap: function(e) {
								}
							}]	
						});
					}
				}).error(function(data){
					console.log(data)
					var alertPopup = $ionicPopup.alert({
						title: '¡Error!',
						template: "Ocurrió un error al actualizar los datos del Perfil", //'¡Por favor revisa tu correo y/o contraseña!',
						buttons:[{
								text: 'Aceptar',
								type: 'button-positive',
								onTap: function(e) {
								}
						}]	
					});
				});
		}
		$scope.data.first_name=$rootScope.user_data.first_name;
		$scope.data.last_name=$rootScope.user_data.last_name;
		$scope.data.thumbnail=$rootScope.user_data.thumbnail;
		$scope.data.alias=$rootScope.user_data.alias;
});
})
.controller('ConfigCtrl', function($scope,$rootScope, Registerservice, UserService, $ionicPopup, $state) {
	$scope.$on('$ionicView.loaded', function(e) {
			$scope.data={}; 
		$scope.removeuser= function(){
		console.log($scope.data.user_id);
		UserService.remove($scope.data.grupos,$scope.data.user_id).success(function(data) {
				//$scope.user=data.user;
				 if (data.message=="Eliminados") {
					UserService.datauser().success(function(response){
								window.localStorage.setItem('user',JSON.stringify(response));
								 $rootScope.user_data=response;
								 $rootScope.user_data.src_img= url+$rootScope.user_data.src_img;
							})
					var alertPopup = $ionicPopup.alert({
							title: '¡Usuario eliminado con éxito!',
							//template: "Selecciona una imagen de tu galería o directo de la cámara", //'¡Por favor revisa tu correo y/o contraseña!',
							buttons:[{
								text: 'Aceptar',
								type: 'button-positive',
								onTap: function(e) {
									$state.go('configuracion');
								}
								}]	
							});
				 }else{
					var alertPopup = $ionicPopup.alert({
					title: 'Error de conexion',
					template: '¡Por favor intenta mas tarde!', //'¡Por favor revisa tu correo y/o contraseña!',
					okText: 'Aceptar'
					});
				 }
			}).error(function(data) {
				console.log(data)
				var alertPopup = $ionicPopup.alert({
					title: 'Error de conexión',
					template: '¡Por favor intenta mas tarde!', //'¡Por favor revisa tu correo y/o contraseña!',
					okText: 'Aceptar'
				});
			});
	}
	});
})
.controller('ConfigAddCtrl', function($scope,$rootScope, Registerservice, UserService,GroupService, $ionicPopup, $state) {
	$scope.$on('$ionicView.loaded', function(e) {
	$scope.data={}; //});
			console.log($scope.data);
			
			console.log($scope.data.group_name);
		//=$rootScope.user_data.;
		$scope.createuser = function(){
			var users= $rootScope.user_data.users.length;
			var contratados= $rootScope.user_data.suscription.users;
			var id_legix= $rootScope.user_data.legix_id.split('-');
			var cero =""; 
			var parent_id = $rootScope.user_data.id;
			id_legix=id_legix[0];
			if((contratados-1)<10) cero="0"
			console.log(contratados-1)
			$scope.data.legix_id=id_legix+'-'+cero+(contratados-1).toString();
			console.log($scope.data.legix_id);
			if(users<contratados){
				Registerservice.newUser($scope.data.legix_id, $scope.data.first_name, $scope.data.last_name, $scope.data.email, $scope.data.password, parent_id).success(function(data) {
				$scope.user=data.user;
				 if (data.message=="Creada") {
					UserService.datauser().success(function(response){
								window.localStorage.setItem('user',JSON.stringify(response));
								 $rootScope.user_data=response;
								 $rootScope.user_data.src_img= url+$rootScope.user_data.src_img;
							})
					var alertPopup = $ionicPopup.alert({
							title: '¡Usuario creado con éxito!',
							//template: "Selecciona una imagen de tu galería o directo de la cámara", //'¡Por favor revisa tu correo y/o contraseña!',
							buttons:[{
								text: 'Aceptar',
								type: 'button-positive',
								onTap: function(e) {
									$state.go('config_user');
								}
								}]	
							});
				 }else{
					var alertPopup = $ionicPopup.alert({
					title: 'Error de conexion',
					template: '¡Por favor intenta mas tarde!', //'¡Por favor revisa tu correo y/o contraseña!',
					okText: 'Aceptar'
					});
				 }
			}).error(function(data) {
				console.log(data)
				var alertPopup = $ionicPopup.alert({
					title: 'Error de conexión',
					template: '¡Por favor intenta mas tarde!', //'¡Por favor revisa tu correo y/o contraseña!',
					okText: 'Aceptar'
				});
			});
			}else{
				var alertPopup = $ionicPopup.alert({
					title: '¡Haz llegado al limite de tus usuarios contratados!',
					//template: data.message, //'¡Por favor revisa tu correo y/o contraseña!',
					okText: 'Aceptar'
				});
			}
	}
	$scope.creategroup = function(){
			console.log($scope.data);
			console.log($scope.data.nombregrupo+' '+angular.isUndefined($scope.data.temas)+' '+angular.isUndefined($scope.data.usuarios))
	if($scope.data.nombregrupo && !angular.isUndefined($scope.data.temas) && !angular.isUndefined($scope.data.usuarios)){
			console.log($scope.data.nombregrupo+' '+angular.isUndefined($scope.data.temas)+' '+angular.isUndefined($scope.data.usuarios))
	
		GroupService.newgroup($scope.data.nombregrupo, $scope.data.temas,$scope.data.usuarios, $scope.data.group_id).success(function(data) {
				 if (data.message=='Actualizado') {
					UserService.datauser().success(function(response){
								window.localStorage.setItem('user',JSON.stringify(response));
								 $rootScope.user_data=response;
								 $rootScope.user_data.src_img= url+$rootScope.user_data.src_img;
							})
					var alertPopup = $ionicPopup.alert({
							title: 'Grupo creado con éxito!',
							//template: "Selecciona una imagen de tu galería o directo de la cámara", //'¡Por favor revisa tu correo y/o contraseña!',
							buttons:[{
								text: 'Aceptar',
								type: 'button-positive',
								onTap: function(e) {
									$state.go('config_groups');
								}
								}]	
							});
				 }else{
					var alertPopup = $ionicPopup.alert({
					title: 'Error de conexion',
					template: '¡Por favor intenta mas tarde!', //'¡Por favor revisa tu correo y/o contraseña!',
					okText: 'Aceptar'
					});
				 }
			}).error(function(data) {
				console.log(data)
				var alertPopup = $ionicPopup.alert({
					title: 'Error de conexión',
					template: '¡Por favor intenta mas tarde!', //'¡Por favor revisa tu correo y/o contraseña!',
					okText: 'Aceptar'
				});
			});
		}else{
			var alertPopup = $ionicPopup.alert({
					title: 'Campos obligatorios',
					template: 'Para crear tu grupo debes ingresar el nombre, seleccionar tema(s) y usuario(s)', //'¡Por favor revisa tu correo y/o contraseña!',
					okText: 'Aceptar'
				});
		}
	}
	
	});
})
.controller('FunctionsCtrl', function($scope,$rootScope, Registerservice, UserService, $ionicPopup, $state) {
})
.controller('DownloadfilesCtrl', function($scope,$rootScope, Registerservice, UserService, $ionicPopup, $state) {
	//$scope.$on('$ionicView.loaded', function(e) {
	$scope.data={}; //});
			console.log("data: "+$scope.data);
	$scope.download = function(url){
			console.log('url del archivo: ', url);
			var remoteFile = downloadurl;
        var localFileName = remoteFile.substring(remoteFile.lastIndexOf('/')+1);
        
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
            fileSystem.root.getFile(localFileName, {create: true, exclusive: false}, function(fileEntry) {
                var localPath = fileEntry.fullPath;
                //if (device.platform === "Android" && localPath.indexOf("file://") === 0) {
                    localPath = localPath.substring(7);
               // }
                var ft = new FileTransfer();
                ft.download(remoteFile,
                    localPath, function(entry) {
                        console.log("archivo-descargado");
                    }, fail);
            }, fail);
        }, fail);
	}
	
	//});
});
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


