function AppHomeController( $stateParams, $uibModal, $window, ItemService) {
    console.log('Running home controller');
    var vm = this;

    /* ORDENAR POR CABECERA */
    vm.orderByField = 'id';
    vm.reverseSort = false;

    /* FILTRAR PRO PRIMERA VEZ */
    vm.search = { tipo: $stateParams.itemType };

    /* CARGAR PRIMERA VEZ */
    activate();

    function activate() {
        loadItems();
    }

    function loadItems() {
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
    }

    /* BORRAR ITEM */
    vm.removerRow = function (item) {
        if ($window.confirm("Esta seguro que desea eliminar el Item Id: " + item.id + "?")) {
            promise = ItemService.deleteItem(item);
            promise.then(function (result) {
                console.log('delete item =', result);

                /* REFRESCAR */
                loadItems();
            });
        } else {
            //NO 
        }
    }

    /* EDITAR ITEM */
    vm.animationsEnabled = true;
    vm.modalOpen = false;

    vm.editarRow = function (item) {
        var modalInstance = $uibModal.open({
            animation: vm.animationsEnabled,
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
            vm.modalOpen = true;
        });

        modalInstance.result.then(function (item) {
            console.log('modalInstance.result');
            vm.modalOpen = false;
        }, function () {
            console.log('modalInstance.result01');
            vm.modalOpen = false;
        });

        modalInstance.closed.then(function () {
            console.log('$uibModal.closed');
            /* REFRESCAR */
            loadItems();
        });
    };

    vm.toggleAnimation = function () {
        console.log('vm.toggleAnimation');
        vm.animationsEnabled = !vm.animationsEnabled;
    };
}

function AppEditItemController($scope, $uibModalInstance, item, ItemService) {
    console.log('Running EditItem controller');

    loadItem(item.id);
    $scope.currentModal = $uibModalInstance;
    $scope.itemToEdit = {};
    $scope.itemNew = {};

    function loadItem(itemId) {
        var promise = ItemService.getItem(itemId);
        promise.then(function (result) {
            console.log('result loadItem', result);
            $scope.item = result;
        }).catch(function (error) {
            console.log('Error found loadItem:', error);
        }).finally(function () {
            console.log('getItem is finished');
        });
    }

    $scope.edit = function () {
        $scope.itemNew.id = $scope.item.id;
        if ($scope.itemToEdit.marca === undefined) {
            $scope.itemNew.marca = $scope.item.marca;
        }
        else {
            $scope.itemNew.marca = $scope.itemToEdit.marca;
        }
        if ($scope.itemToEdit.modelo === undefined) {
            $scope.itemNew.modelo = $scope.item.modelo;
        }
        else {
            $scope.itemNew.modelo = $scope.itemToEdit.modelo;
        }
        if ($scope.itemToEdit.precio === undefined) {
            $scope.itemNew.precio = $scope.item.precio;
        }
        else {
            $scope.itemNew.precio = $scope.itemToEdit.precio;
        }
        $scope.itemNew.tipo = $scope.item.tipo;
        console.log($scope.itemToEdit);
        console.log($scope.item);

        var promise = ItemService.editItem($scope.itemNew);
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