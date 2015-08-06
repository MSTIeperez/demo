angular.module('starter.services', [])

.factory('Comments', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var comments = [{
    id: 0,
    avatar: 'img/icons/icon-senado.png',
    name: 'Marty McFly',
    from: 'De Senado',
    update: new Date('2015', '03', '08'),
    message: { "html": 'Se prevee la presentación de un exhorto a la PGR y <a href="#" class="hashtag">#Pemex</a> a implemetar un programa de <a href="#" class="hashtag">#PrevencionDeAdeudos</a>...' }
   
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  },{
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
