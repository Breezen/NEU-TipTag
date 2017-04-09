(function () {
    angular
        .module("TipTag")
        .factory("UserService", userService);
    
    function userService($http) {
        var api = {
            createUser: createUser,
            findCredential: findCredential
        };
        return api;

        function createUser(user) {
            return $http.post("/api/user", user);
        }

        function findCredential(user) {
            return $http.get("/api/user?username=" + user.username + "&password=" + user.password);
        }
    }
})();