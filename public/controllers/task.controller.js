(function () {
    angular
        .module("TipTag")
        .controller("TaskListController", TaskListController)
        .controller("NewTaskController", NewTaskController)
        .controller("MyTasksController", MyTasksController)
        .controller("TaskDetailController", TaskDetailController);
    
    function TaskListController($rootScope, $location, UserService, TaskService, ImageService) {
        var vm = this;

        function init() {
            vm.tab = 1;
            TaskService
                .findAllTasks()
                .then(function (res) {
                    vm.tasks = res.data;
                }, function (err) {
                    alert("Error: " + err.statusText);
                });
            // TaskService
            //     .getUnsplashCurated()
            //     .getUnsplashRandom()
            //     .then(function (res) {
            //         vm.unsplash = [res.data];
            //     }, function (err) {
            //         alert("Error: " + err.statusText);
            //     });
        }
        init();

        // pending
        // vm.tagUnplashImage = function (image) {
        //     var toSave = {};
        //     toSave.tag = image.newTag;
        //     ImageService
        //         .create(image)
        //         .then(function (res) {
        //             alert("Image updated!");
        //             $route.reload();
        //         }, function (err) {
        //             alert("Error: " + err.statusText);
        //         });
        // };
    }
    
    function NewTaskController($rootScope, $location, TaskService) {
        var vm = this;

        vm.create = function (task) {
            task.tipper = $rootScope.currentUser._id;
            TaskService
                .create(task)
                .then(function (res) {
                    alert("Task " + task.name + " created!");
                    $location.url("/task/" + res.data._id);
                }, function (err) {
                    alert("Error: " + err.statusText);
                });
        };
    }
    
    function MyTasksController($rootScope, $location, UserService, TaskService) {
        var vm = this;

        function init() {
            if ($rootScope.currentUser) {
                TaskService
                    .findTasksByTipper($rootScope.currentUser._id)
                    .then(function (res) {
                        vm.mytasks = res.data;
                    }, function (err) {
                        alert("Error: " + err.statusText);
                    });
            } else {
                UserService
                    .loggedin()
                    .then(function (res) {
                        if (res.data) {
                            $rootScope.currentUser = res.data;
                            TaskService
                                .findTasksByTipper($rootScope.currentUser._id)
                                .then(function (res) {
                                    vm.mytasks = res.data;
                                }, function (err) {
                                    alert("Error: " + err.statusText);
                                });
                        } else $rootScope.currentUser = null;
                    });
            }
        }
        init();
    }

    function TaskDetailController($rootScope, $location, $route, $routeParams, UserService, TaskService, ImageService) {
        var vm = this;
        vm.tid = $routeParams.tid;

        function init() {
            TaskService
                .findTaskById(vm.tid)
                .then(function (res) {
                    vm.task = res.data;
                }, function (err) {
                    alert("Error: " + err.statusText);
                });
            ImageService
                .findImagesByTask(vm.tid)
                .then(function (res) {
                    vm.images = res.data;
                }, function (err) {
                    alert("Error: " + err.statusText);
                });
        }
        init();

        vm.updateTask = function (task) {
            TaskService
                .update(task)
                .then(function (res) {
                    alert("Task updated!");
                    $route.reload();
                }, function (err) {
                    alert("Error: " + err.statusText);
                });
        };
        
        vm.addImage = function (image) {
            image.task = vm.tid;
            ImageService
                .create(image)
                .then(function (res) {
                    alert("Image created!");
                    $route.reload();
                }, function (err) {
                    alert("Error: " + err.statusText);
                });
        };
        
        vm.tagImage = function (image) {
            image.tag = image.newTag;
            if ($rootScope.currentUser) {
                image.tagger = $rootScope.currentUser._id;
                UserService
                    .addBalance(image.tagger, vm.task.price)
                    .then(function (res) {
                        // show money earned.
                    }, function (err) {
                        alert("Error: " + err.statusText);
                    });
            }
            UserService
                .addBalance(vm.task.tipper, -vm.task.price)
                .then(function (res) {
                    alert("Balance deducted!");
                }, function (err) {
                    alert("Error: " + err.statusText);
                });
            ImageService
                .update(image)
                .then(function (res) {
                    alert("Image updated!");
                    $route.reload();
                }, function (err) {
                    alert("Error: " + err.statusText);
                });
        };

        vm.deleteImage = function (image) {
            ImageService
                .delete(image)
                .then(function (res) {
                    alert("Image deleted!");
                    $route.reload();
                }, function (err) {
                    alert("Error: " + err.statusText);
                });
        }
    }
})();