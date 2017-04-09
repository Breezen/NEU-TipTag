(function () {
    angular
        .module("TipTag")
        .factory("UserService", userService);
    
    function userService($http) {
        var api = {
            register: register,
            login: login,
            logout: logout,
            loggedin: loggedin
        };
        return api;

        function register(user) {
            return $http.post("/api/register", user);
        }

        function login(user) {
            return $http.post("/api/login", user);
        }

        function logout() {
            return $http.post("/api/logout");
        }

        function loggedin() {
            return $http.get("/api/loggedin");
        }
    }
})();