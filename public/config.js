(function () {
    angular
        .module("TipTag")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home.view.html",
                controller: "HomepageController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/user/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .otherwise({redirectTo: "/"});
    }
})();