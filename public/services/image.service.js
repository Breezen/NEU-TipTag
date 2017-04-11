(function () {
    angular
        .module("TipTag")
        .factory("ImageService", ImageService);
    
    function ImageService($http) {
        var api = {
            create: create,
            findImagesByTask: findImagesByTask
        };
        return api;

        function create(image) {
            return $http.post("/api/image", image);
        }
        
        function findImagesByTask(tid) {
            return $http.get("/api/images/" + tid);
        }
    }
})();