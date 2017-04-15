angular
    .module('main')
    .factory('ItemService', ItemService);

function ItemService($log, $q, $resource) {
    
    return {
        getItems: getItems,
        deleteItem: deleteItem
    };

    function getItems() {
        var resource = $resource('http://localhost:9002/items');
        $log.info('Running getItems');
        var future = $q.defer();
        resource.query().$promise.then(function (result) {
            future.resolve(result);
        }).catch(function (error) {
            future.reject(error);
        });
        return future.promise;
    }

    function deleteItem(item) {
        var resource = $resource('http://localhost:9002/items/:id', { id: item.id });
        $log.info('Running deleteItem');
        var future = $q.defer();
        resource.remove(item).$promise.then(function (result) {
            future.resolve(result);
        }).catch(function (error) {
            future.reject(error);
        });
        return future.promise;
        /*
        resource.delete();*/
    }
}
