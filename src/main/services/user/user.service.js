angular
    .module('main')
    .factory('UserService', UserService);

function UserService($log, $q, $resource) {
    var resource = $resource('http://localhost:9001/users');
    return {
        validateUser: validateUser
    };

    function validateUser(user) {
        if(user.userName === "test" && user.userPassword === "test")
        {
            return true;
        }
        return false;
        /*
        $log.info('Running validateUser');
        var future = $q.defer();
        resource.get({userName:user.userName}).$promise.then(function (result) {
            future.resolve(result);
        }).catch(function (error) {
            future.reject(error);
        });
        return future.promise;
        */
    }
}
