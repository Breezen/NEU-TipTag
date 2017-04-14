(function () {
    angular
        .module("TipTag")
        .controller("RegisterController", RegisterController)
        .controller("LoginController", LoginController)
        .controller("AdminController", AdminController)
        .controller("ProfileController", ProfileController);

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

    function ProfileController($rootScope, $location, $route, $routeParams, UserService) {
        var vm = this;
        vm.uid = $routeParams.uid;

        vm.tab1 = "active";

        function init() {
            UserService
                .findUserById(vm.uid)
                .then(function (res) {
                    vm.user = res.data;
                }, function (err) {
                    alert("Error: " + err.statusText);
                });
        }
        init();

        vm.update = function(user) {
            UserService
                .update(user)
                .then(function (res) {

                }, function (err) {
                    alert("Error: " + err.statusText);
                });
        };
    }
})();