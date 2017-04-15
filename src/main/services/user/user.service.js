angular
    .module('main')
    .factory('UserService', UserService);

function UserService($log, $q, $resource) {
    var resource = $resource('http://localhost:9001/users');
    return {
        validateUser: validateUser
    };

    function validateUser(user) {
        $log.info('Running validateUser');
        var future = $q.defer();
        resource.query({'userName': user.userName}, {'userPassword': user.userPassword}).$promise.then(function (result) {
            console.log(result);
            future.resolve(result);
        }).catch(function (error) {
            future.reject(error);
        });
        return future.promise;
    }
}
