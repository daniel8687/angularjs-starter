function AppHomeController(ItemService, $scope, $window, $uibModal) {
    console.log('Running home controller');
    var vm = this;

    /* CARGAR PRIMERA VEZ */
    var promise = ItemService.getItems();
    promise.then(function (result) {
        console.log('result', result);
        vm.items = result;
    }).catch(function (error) {
        console.log('Error found:', error);
        vm.error = 'Cannot find items';
    }).finally(function () {
        console.log('getItems is finished');
    });

    /* FILTRAR PRO PRIMERA VEZ */
    $scope.search = { tipo: 'computadora' };

    /* BORRAR ITEM */
    $scope.removerRow = function (item) {
        if ($window.confirm("Esta seguro que desea eliminar el Item Id: " + item.id + "?")) {
            promise = ItemService.deleteItem(item);
            promise.then(function (result) {
                console.log('delete item =', result);

                /* REFRESCAR */
                promise = ItemService.getItems();
                promise.then(function (result) {
                    console.log('result', result);
                    vm.items = result;
                }).catch(function (error) {
                    console.log('Error found:', error);
                    vm.error = 'Cannot find items';
                }).finally(function () {
                    console.log('getItems is finished');
                });
            });
        } else {
            //NO 
        }
    }

    /* EDITAR ITEM */
    $scope.animationsEnabled = true;
    $scope.modalOpen = false;

    $scope.editarRow = function (item) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'editItem.html',
            controller: 'AppEditItemController',
            size: '',
            resolve: {
                items: function () {
                    return item;
                }
            }
        });

        modalInstance.opened.then(function () {
            $scope.modalOpen = true;
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.modalOpen = false;
        }, function () {
            $scope.modalOpen = false;
        });
    };

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };
}

function AppEditItemController($scope, $uibModalInstance, items) {
    console.log('Running editItem controller');
    $scope.currentModal = $uibModalInstance;
    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}

var component = {
    templateUrl: 'main/home/home.html',
    controller: AppHomeController
};

angular
    .module('main')
    .component('appHome', component)
    .controller('AppEditItemController', AppEditItemController);