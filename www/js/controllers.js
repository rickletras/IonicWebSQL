angular.module('starter.controllers', [])


    .controller('DashCtrl', function ($scope, webSQL) {


        var acessos = [{sentido_acesso: 'entrada', data: '23/02/2015', hora: '08:55', local_acesso: 'Portaria 1'}];

        webSQL.add(acessos).then(
            function (res) {
                console.log('Add executado com sucesso!',res);
            }
        );

        webSQL.get("acessos").then(
            function (res) {
                console.log('GetAcessos executado com sucesso!',res);
            }
        );

        webSQL.del().then(function (res) {
            console.log('Del. executado com sucesso!', res);
        });


    })

    .controller('ChatsCtrl', function ($scope, Chats) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.chats = Chats.all();
        $scope.remove = function (chat) {
            Chats.remove(chat);
        };
    })

    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });
