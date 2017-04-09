(function () {
    angular
        .module("TipTag")
        .controller("HomeController", HomeController);
    
    function HomeController($location) {
        var vm = this;
        vm.login = function () {
            $location.url("/login");
        }
    }
})();