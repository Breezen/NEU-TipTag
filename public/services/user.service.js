(function () {
    angular
        .module("TipTag")
        .factory("UserService", UserService);
    
    function UserService($http) {
        var api = {
            register: register,
            login: login,
            logout: logout,
            loggedin: loggedin,
            findUsers: findUsers,
            findUserById: findUserById,
            create: create,
            update: update,
            delete: deleteUser,
            addBalance: addBalance
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
        
        function findUsers() {
            return $http.get("/api/users");
        }

        function findUserById(uid) {
            return $http.get("/api/user/" + uid);
        }

        function create(user) {
            return $http.post("/api/user", user);
        }

        function update(user) {
            return $http.put("/api/user", user);
        }

        function deleteUser(user) {
            return $http.delete("/api/user/" + user._id);
        }
        
        function addBalance(uid, deltaBalance) {
            return $http.post("/api/user/balance", {uid: uid, delta: deltaBalance});
        }
    }
})();