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
                item: function () {
                    return item;
                }
            }
        });

        modalInstance.opened.then(function () {
            console.log('modalInstance.opened');
            $scope.modalOpen = true;
        });

        modalInstance.result.then(function (item) {
            console.log('modalInstance.result');
            $scope.modalOpen = false;           
        }, function () {
            console.log('modalInstance.result01');
            $scope.modalOpen = false;
        });

        modalInstance.closed.then(function () {
            console.log('$uibModal.closed');
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
    };

    $scope.toggleAnimation = function () {
        console.log('$scope.toggleAnimation');
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };
}

function AppEditItemController(ItemService, $scope, $uibModalInstance, item) {
    console.log('Running EditItem controller');
    $scope.currentModal = $uibModalInstance;
    $scope.item = item;
    $scope.itemToEdit = {};
    $scope.itemNewt = {};

    $scope.edit = function () {
        $scope.itemNewt.id = $scope.item.id;
        if ($scope.itemToEdit.marca === undefined) {
            $scope.itemNewt.marca = $scope.item.marca;
        }
        else {
            $scope.itemNewt.marca = $scope.itemToEdit.marca;
        }
        if ($scope.itemToEdit.modelo === undefined) {
            $scope.itemNewt.modelo = $scope.item.modelo;
        }
        else {
            $scope.itemNewt.modelo = $scope.itemToEdit.modelo;
        }
        if ($scope.itemToEdit.precio === undefined) {
            $scope.itemNewt.precio = $scope.item.precio;
        }
        else {
            $scope.itemNewt.precio = $scope.itemToEdit.precio;
        }
        $scope.itemNewt.tipo = $scope.item.tipo;
        console.log($scope.itemToEdit);
        console.log($scope.item);

        var promise = ItemService.editItem($scope.itemNewt);
        promise.then(function (result) {
            console.log('Edit Item', result);
        });

        $uibModalInstance.close($scope.item);
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