(function () {
    angular
        .module("TipTag")
        .controller("RegisterController", RegisterController)
        .controller("LoginController", LoginController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = function (user) {
            UserService
                .createUser(user)
                .then(function (res) {
                    alert("User " + res.data.username + " created!");
                    $location.url("/");
                }, function (err) {
                    alert("Error: " + err.statusText);
                });
        };
    }
    
    function LoginController($location, UserService) {
        var vm = this;
        vm.login = function (user) {
            if (!user.password) return;
            UserService
                .findCredential(user)
                .then(function (res) {
                    alert("User " + res.data.username + " login!");
                    $location.url("/");
                }, function (err) {
                    alert("Error: " + err.statusText);
                });
        };
    }
})();