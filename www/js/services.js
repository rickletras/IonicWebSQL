angular.module('starter.services', [])
    .factory('Database', function () {

        const
            DB_NAME = "nomedabadse",
            VERSION = "versao",
            DESC = "descricao";

        var createDatabase = function () {
            return openDatabase(DB_NAME, VERSION, DESC, 2 * 1024 * 1024);
        };

        var createTable = function () {
            var db = createDatabase();
            db.transaction(function (tx) {
                tx.executeSql("CREATE TABLE IF NOT EXISTS tabela (coluna_1,coluna_2,coluna_3,coluna_4)", null,
                    function (transaction, result) {
                       console.log('Tabela criada com sucesso!');
                    },
                    function (transaction, error) {
                        console.error(error.message);
                    });
            });
        };

        createDatabase();
        createTable();
        return {
            open: createDatabase
        }

    })

    .factory('webSQL', function (Database,$q) {


        var openDataSql = function () {
            return Database.open();
        }

        var insertData = function (value) {
            var defer = $q.defer();
            var db = openDataSql();

            db.transaction(function (tx) {
                value.forEach(function (element) {
                    tx.executeSql("INSERT INTO tabela(coluna_1,coluna_2,coluna_3,coluna_4) VALUES (?,?,?,?)",
                        [element.sentido_acesso,element.data,element.hora,element.local_acesso],
                        function(transaction, result){
                            defer.resolve(result);
                        },
                        function (transaction, error) {
                            defer.reject(error);
                        }
                    );

                });

            });

            return defer.promise;
        }

        var getAll = function () {
            var db = openDataSql();
            var defer = $q.defer();

            db.transaction(function (tx) {
                tx.executeSql("SELECT * FROM Tabela", null,
                    function (transaction, result) {
                        defer.resolve(result.rows);
                    },
                    function (transaction, error) {
                        defer.reject(error);
                    });
            });
            return defer.promise;
        };

        var deleteAll = function () {
            var db = openDataSql();
            var defer = $q.defer();
            db.transaction(function (tx) {
                tx.executeSql("DELETE FROM Tabela", null,
                    function (transaction, result) {
                        defer.resolve(result.rowsAffected);
                    },
                    function (transaction, error) {
                        defer.$$reject(error);
                    });
            });
            return defer.promise;
        }
        return {
            add: insertData,
            get: getAll,
            del: deleteAll
        }
    })


    .factory('Chats', function () {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var chats = [{
            id: 0,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
        }, {
            id: 1,
            name: 'Max Lynx',
            lastText: 'Hey, it\'s me',
            face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
        }, {
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
            all: function () {
                return chats;
            },
            remove: function (chat) {
                chats.splice(chats.indexOf(chat), 1);
            },
            get: function (chatId) {
                for (var i = 0; i < chats.length; i++) {
                    if (chats[i].id === parseInt(chatId)) {
                        return chats[i];
                    }
                }
                return null;
            }
        };
    });
