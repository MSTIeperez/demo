angular.module('starter.services', [])

.service('LoginService', function($http, $q) {
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
			var url ='http://legixapp.abardev.net';
            var promise = deferred.promise;
		if(window.localStorage.getItem('user')==null)	{
		//$http.post(url+'/api/login',{'email':name,'password': pw})
		$http.post('/api/login',{'email':name,'password': pw})
				.success(function(data, status, headers, config){
					//data = $.parseJSON(data);
					console.log(data);//deferred.resolve()
					 if (data.message=="logged") {
						window.localStorage.setItem('user',JSON.stringify(data.user));
						deferred.resolve('Welcome ' + data.name + '!');
						
					} else {
						deferred.reject(data);
					}
				})
				.error(function (data){
					deferred.reject(data);
				});
				
			//console.log($location.protocol()+"://"+$location.host());
		}
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})
.factory('Feeds', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var feeds = [{
    id: 0,
    avatar: 'img/icons/icon-senado.png',
    name: 'Rafael rojas',
    from: 'De Senado',
    update: new Date('2015', '03', '08'),
    message: 'Se prevee la presentación de un exhorto a la PGR y #Pemex a implemetar un programa de #PrevencionDeAdeudos...',
    file: [{
        link: 'img/icons/icon-senado.png'
    }, {
        link: 'img/icons/icon-senado.png'
    }]
  }, {
    id: 0,
    avatar: 'img/icons/icon-senado.png',
    name: 'Rafael rojas',
    from: 'De Senado',
    update: new Date('2015', '03', '08'),
    message: 'Se prevee la presentación de un exhorto a la PGR y #Pemex a implemetar un programa de #PrevencionDeAdeudos...',
    file: [{
        link: 'img/icons/icon-senado.png'
    }, {
        link: 'img/icons/icon-senado.png'
    }]
  }, {
    id: 0,
    avatar: 'img/icons/icon-senado.png',
    name: 'Rafael rojas',
    from: 'De Senado',
    update: new Date('2015', '03', '08'),
    message: 'Se prevee la presentación de un exhorto a la PGR y #Pemex a implemetar un programa de #PrevencionDeAdeudos...',
    file: [{
        link: 'img/icons/icon-senado.png'
    }, {
        link: 'img/icons/icon-senado.png'
    }]
  }, {
    id: 0,
    avatar: 'img/icons/icon-senado.png',
    name: 'Rafael rojas',
    from: 'De Senado',
    update: new Date('2015', '03', '08'),
    message: 'Se prevee la presentación de un exhorto a la PGR y #Pemex a implemetar un programa de #PrevencionDeAdeudos...',
    file: [{
        link: 'img/icons/icon-senado.png'
    }, {
        link: 'img/icons/icon-senado.png'
    }]
  }, {
    id: 0,
    avatar: 'img/icons/icon-senado.png',
    name: 'Rafael rojas',
    from: 'De Senado',
    update: new Date('2015', '03', '08'),
    message: 'Se prevee la presentación de un exhorto a la PGR y #Pemex a implemetar un programa de #PrevencionDeAdeudos...',
    file: [{
        link: 'img/icons/icon-senado.png'
    },
    {
        link: 'img/icons/icon-senado.png'
    }]
  }];

  return {
    all: function() {
      return feeds;
    },
    remove: function(feed) {
      feed.splice(feeds.indexOf(feed), 1);
    },
    get: function(feedId) {
      for (var i = 0; i < feeds.length; i++) {
        if (feeds[i].id === parseInt(feedId)) {
          return feeds[i];
        }
      }
      return null;
    }
  };
});
