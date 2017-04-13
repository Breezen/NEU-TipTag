(function () {
    angular
        .module("TipTag")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home.view.html",
                controller: "HomeController",
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
            .when("/admin", {
                templateUrl: "views/user/admin.view.html",
                controller: "AdminController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: "views/user/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/tasks", {
                templateUrl: "views/task/list.view.html",
                controller: "TaskListController",
                controllerAs: "model"
            })
            .when("/newtask", {
                templateUrl: "views/task/new.view.html",
                controller: "NewTaskController",
                controllerAs: "model"
            })
            .when("/mytasks", {
                templateUrl: "views/task/my.view.html",
                controller: "MyTasksController",
                controllerAs: "model"
            })
            .when("/task/:tid", {
                templateUrl: "views/task/detail.view.html",
                controller: "TaskDetailController",
                controllerAs: "model"
            })
            .otherwise({redirectTo: "/"});
    }
})();