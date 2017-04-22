angular
    .module('main')
    .factory('ItemService', ItemService);

function ItemService($log, $q, $resource) {
    var resource = $resource('http://localhost:9002/items/:id', {
        id: '@id'
    },
        {
            update: {
                method: 'PUT'
            }
        });
    return {
        getItems: getItems,
        getItem: getItem,
        deleteItem: deleteItem,
        editItem: editItem
    };

    function getItems() {
        $log.info('Running getItems');
        var future = $q.defer();
        resource.query().$promise.then(function (result) {
            future.resolve(result);
        }).catch(function (error) {
            future.reject(error);
        });
        return future.promise;
    }

    function getItem(itemId) {
        $log.info('Running getItem');
        var future = $q.defer();
        resource.get({ id: itemId }).$promise.then(function (result) {
            future.resolve(result);
        }).catch(function (error) {
            future.reject(error);
        });
        return future.promise;
    }

    function deleteItem(item) {
        $log.info('Running deleteItem');
        var future = $q.defer();
        resource.delete({ id: item.id }).$promise.then(function (result) {
            future.resolve(result);
        }).catch(function (error) {
            future.reject(error);
        });
        return future.promise;
    }

    function editItem(item) {
        $log.info('Running editItem');
        var future = $q.defer();
        resource.update({ id: item.id }, item).$promise.then(function (result) {
            future.resolve(result);
        }).catch(function (error) {
            future.reject(error);
        });
        return future.promise;
    }
}
