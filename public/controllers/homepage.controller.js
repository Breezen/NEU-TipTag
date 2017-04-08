(function () {
    angular
        .module("TipTag")
        .controller("HomepageController", HomepageController);
    
    function HomepageController($location) {
        var vm = this;
        vm.login = function () {
            $location.url("/login");
        }
    }
})();