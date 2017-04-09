(function () {
    angular
        .module("TipTag")
        .factory("UserService", userService);
    
    function userService($http) {
        var api = {
            createUser: createUser
        };
        return api;

        function createUser(user) {
            return $http.post("/api/user", user);
        }
    }
})();