(function () {
    angular
        .module("TipTag")
        .controller("RegisterController", RegisterController)
        .controller("LoginController", LoginController)
        .controller("AdminController", AdminController);

    function RegisterController($rootScope, $location, UserService) {
        var vm = this;
        vm.register = function (user) {
            if (!(user.username && user.password)) return;
            UserService
                .register(user)
                .then(function (res) {
                    var user = res.data;
                    alert("User " + user.username + " created!");
                    $rootScope.currentUser = user;
                    $location.url("/");
                }, function (err) {
                    alert("Error: " + err.statusText);
                });
        };
    }
    
    function LoginController($rootScope, $location, UserService) {
        var vm = this;
        vm.login = function (user) {
            if (!(user.username && user.password)) return;
            UserService
                .login(user)
                .then(function (res) {
                    var user = res.data;
                    alert("User " + user.username + " login!");
                    $rootScope.currentUser = user;
                    $location.url("/");
                }, function (err) {
                    alert("Error: " + err.statusText);
                });
        };
    }
    
    function AdminController($rootScope, $location, $route, UserService) {
        var vm = this;

        function init() {
            UserService
                .findUsers()
                .then(function (res) {
                    vm.users = res.data;
                }, function (err) {
                    alert("Error: " + err.statusText);
                });
        }
        init();
        
        vm.create = function (user) {
            UserService
                .create(user)
                .then(function (res) {
                    alert("User " + user.username + " created!");
                    $route.reload();
                }, function (err) {
                    alert("Error: " + err.statusText);
                })
        };
        
        vm.update = function (user) {
            UserService
                .update(user)
                .then(function (res) {
                    alert("User " + user.username + " updated!");
                    $route.reload();
                }, function (err) {
                    alert("Error: " + err.statusText);
                });
        };
        
        vm.delete = function (user) {
            UserService
                .delete(user)
                .then(function (res) {
                    alert("User " + user.username + " deleted!");
                    $route.reload();
                }, function (err) {
                    alert("Error: " + err.statusText);
                });
        };
    }
})();