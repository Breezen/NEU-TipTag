(function () {
    angular
        .module("TipTag")
        .factory("ImageService", ImageService);
    
    function ImageService($http) {
        var api = {
            create: create,
            update: update,
            delete: deleteImage,
            findImagesByTask: findImagesByTask
        };
        return api;

        function findImagesByTask(tid) {
            return $http.get("/api/images/" + tid);
        }

        function create(image) {
            return $http.post("/api/image", image);
        }

        function update(image) {
            return $http.put("/api/image", image);
        }

        function deleteImage(image) {
            return $http.delete("/api/image/" + image._id);
        }
    }
})();